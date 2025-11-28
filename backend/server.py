from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Form, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.exceptions import HTTPException as FastAPIHTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import bcrypt
import jwt
import base64
from io import BytesIO

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT settings
SECRET_KEY = os.environ.get('JWT_SECRET', 'lojitek-secret-key-2025')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

# Create the main app
app = FastAPI()
api_router = APIRouter(prefix="/api")
security = HTTPBearer(auto_error=False)

# Models
class Admin(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    full_name: str
    id_number: str
    phone: str
    address: str
    photo_base64: Optional[str] = None
    accepted_terms: bool
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class AdminRegister(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    id_number: str
    phone: str
    address: str
    photo_base64: Optional[str] = None
    accepted_terms: bool

class AdminLogin(BaseModel):
    email: EmailStr
    password: str

class PasswordReset(BaseModel):
    email: EmailStr
    id_number: str
    new_password: str

class AdminResponse(BaseModel):
    id: str
    email: str
    full_name: str
    id_number: str
    phone: str
    address: str
    photo_base64: Optional[str] = None
    created_at: datetime

class LoginResponse(BaseModel):
    token: str
    admin: AdminResponse

# Helper functions
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_token(admin_id: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    data = {"sub": admin_id, "exp": expire}
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if credentials is None:
        raise HTTPException(status_code=401, detail="Authorization header required")
    
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        admin_id = payload.get("sub")
        if not admin_id:
            raise HTTPException(status_code=401, detail="Token envalid")
        
        admin = await db.admins.find_one({"id": admin_id}, {"_id": 0, "password": 0})
        if not admin:
            raise HTTPException(status_code=401, detail="Admin pa jwenn")
        
        # Convert ISO string to datetime
        if isinstance(admin['created_at'], str):
            admin['created_at'] = datetime.fromisoformat(admin['created_at'])
        
        return AdminResponse(**admin)
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token ekspire")
    except Exception as e:
        raise HTTPException(status_code=401, detail="Token envalid")

# Routes
@api_router.get("/")
async def root():
    return {"message": "Lojitek API"}

@api_router.post("/auth/register", response_model=LoginResponse)
async def register(admin_data: AdminRegister):
    # Check if email already exists
    existing = await db.admins.find_one({"email": admin_data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Imèl sa deja anrejistre")
    
    # Check if ID number already exists
    existing_id = await db.admins.find_one({"id_number": admin_data.id_number})
    if existing_id:
        raise HTTPException(status_code=400, detail="Nimewo idantite sa deja anrejistre")
    
    # Hash password
    hashed_password = hash_password(admin_data.password)
    
    # Create admin object
    admin_dict = admin_data.model_dump(exclude={'password'})
    admin_obj = Admin(**admin_dict)
    
    # Save to database
    doc = admin_obj.model_dump()
    doc['password'] = hashed_password
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.admins.insert_one(doc)
    
    # Create token
    token = create_token(admin_obj.id)
    
    # Return response
    admin_response = AdminResponse(**admin_obj.model_dump())
    return LoginResponse(token=token, admin=admin_response)

@api_router.post("/auth/login", response_model=LoginResponse)
async def login(credentials: AdminLogin):
    # Find admin by email
    admin = await db.admins.find_one({"email": credentials.email})
    if not admin:
        raise HTTPException(status_code=401, detail="Imèl oswa modpas envalid")
    
    # Verify password
    if not verify_password(credentials.password, admin['password']):
        raise HTTPException(status_code=401, detail="Imèl oswa modpas envalid")
    
    # Convert ISO string to datetime
    if isinstance(admin['created_at'], str):
        admin['created_at'] = datetime.fromisoformat(admin['created_at'])
    
    # Create token
    token = create_token(admin['id'])
    
    # Remove password from response
    admin.pop('password')
    admin.pop('_id', None)
    
    admin_response = AdminResponse(**admin)
    return LoginResponse(token=token, admin=admin_response)

@api_router.get("/auth/me", response_model=AdminResponse)
async def get_me(current_admin: AdminResponse = Depends(get_current_admin)):
    return current_admin

@api_router.post("/auth/reset-password")
async def reset_password(reset_data: PasswordReset):
    # Find admin by email and ID number
    admin = await db.admins.find_one({
        "email": reset_data.email,
        "id_number": reset_data.id_number
    })
    
    if not admin:
        raise HTTPException(status_code=404, detail="Imèl oswa nimewo idantite envalid")
    
    # Hash new password
    new_hashed_password = hash_password(reset_data.new_password)
    
    # Update password
    await db.admins.update_one(
        {"email": reset_data.email},
        {"$set": {"password": new_hashed_password}}
    )
    
    return {"message": "Modpas chanje ak siksè"}

@api_router.get("/admin/stats")
async def get_admin_stats(current_admin: AdminResponse = Depends(get_current_admin)):
    # Return some basic stats for the admin dashboard
    return {
        "total_admins": await db.admins.count_documents({}),
        "admin_name": current_admin.full_name
    }

# Include router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()