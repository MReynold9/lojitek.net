import requests
import sys
import json
from datetime import datetime
import base64

class LojiTekAPITester:
    def __init__(self, base_url="https://gaming-hub-203.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.token = None
        self.admin_id = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details
        })

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        
        if self.token:
            test_headers['Authorization'] = f'Bearer {self.token}'
        
        if headers:
            test_headers.update(headers)

        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=test_headers, timeout=30)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=test_headers, timeout=30)
            elif method == 'DELETE':
                response = requests.delete(url, headers=test_headers, timeout=30)

            success = response.status_code == expected_status
            
            if success:
                self.log_test(name, True)
                try:
                    return True, response.json()
                except:
                    return True, response.text
            else:
                error_msg = f"Expected {expected_status}, got {response.status_code}"
                try:
                    error_detail = response.json()
                    error_msg += f" - {error_detail}"
                except:
                    error_msg += f" - {response.text}"
                
                self.log_test(name, False, error_msg)
                return False, {}

        except Exception as e:
            self.log_test(name, False, f"Request failed: {str(e)}")
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_register_admin(self):
        """Test admin registration"""
        # Create a sample base64 image (1x1 pixel PNG)
        sample_image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
        
        timestamp = datetime.now().strftime("%H%M%S")
        admin_data = {
            "email": f"test_admin_{timestamp}@lojitek.com",
            "password": "TestPass123!",
            "full_name": "Test Admin Konplè",
            "id_number": f"ID{timestamp}",
            "phone": "+509-1234-5678",
            "address": "123 Test Street, Port-au-Prince, Haiti",
            "photo_base64": sample_image,
            "accepted_terms": True
        }
        
        success, response = self.run_test(
            "Admin Registration",
            "POST",
            "auth/register",
            200,
            data=admin_data
        )
        
        if success and 'token' in response:
            self.token = response['token']
            self.admin_id = response['admin']['id']
            self.test_email = admin_data['email']
            self.test_password = admin_data['password']
            print(f"   Registered admin: {response['admin']['full_name']}")
            return True
        return False

    def test_duplicate_email_registration(self):
        """Test duplicate email registration should fail"""
        if not hasattr(self, 'test_email'):
            self.log_test("Duplicate Email Registration", False, "No test email available")
            return False
            
        admin_data = {
            "email": self.test_email,  # Use same email
            "password": "AnotherPass123!",
            "full_name": "Another Admin",
            "id_number": "DIFFERENT123",
            "phone": "+509-8765-4321",
            "address": "456 Different Street",
            "accepted_terms": True
        }
        
        success, response = self.run_test(
            "Duplicate Email Registration",
            "POST",
            "auth/register",
            400,  # Should fail with 400
            data=admin_data
        )
        return success

    def test_duplicate_id_registration(self):
        """Test duplicate ID number registration should fail"""
        if not hasattr(self, 'test_email'):
            self.log_test("Duplicate ID Registration", False, "No test data available")
            return False
            
        timestamp = datetime.now().strftime("%H%M%S")
        admin_data = {
            "email": f"different_admin_{timestamp}@lojitek.com",
            "password": "AnotherPass123!",
            "full_name": "Different Admin",
            "id_number": f"ID{timestamp}",  # Use same ID as first registration
            "phone": "+509-8765-4321",
            "address": "456 Different Street",
            "accepted_terms": True
        }
        
        success, response = self.run_test(
            "Duplicate ID Registration",
            "POST",
            "auth/register",
            400,  # Should fail with 400
            data=admin_data
        )
        return success

    def test_login_admin(self):
        """Test admin login"""
        if not hasattr(self, 'test_email'):
            self.log_test("Admin Login", False, "No test credentials available")
            return False
            
        login_data = {
            "email": self.test_email,
            "password": self.test_password
        }
        
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "auth/login",
            200,
            data=login_data
        )
        
        if success and 'token' in response:
            # Update token for subsequent tests
            self.token = response['token']
            print(f"   Logged in admin: {response['admin']['full_name']}")
            return True
        return False

    def test_invalid_login(self):
        """Test login with invalid credentials"""
        login_data = {
            "email": "invalid@example.com",
            "password": "wrongpassword"
        }
        
        success, response = self.run_test(
            "Invalid Login",
            "POST",
            "auth/login",
            401,  # Should fail with 401
            data=login_data
        )
        return success

    def test_get_current_admin(self):
        """Test getting current admin info"""
        if not self.token:
            self.log_test("Get Current Admin", False, "No auth token available")
            return False
            
        success, response = self.run_test(
            "Get Current Admin",
            "GET",
            "auth/me",
            200
        )
        
        if success:
            print(f"   Current admin: {response.get('full_name', 'Unknown')}")
        return success

    def test_get_admin_stats(self):
        """Test getting admin statistics"""
        if not self.token:
            self.log_test("Get Admin Stats", False, "No auth token available")
            return False
            
        success, response = self.run_test(
            "Get Admin Stats",
            "GET",
            "admin/stats",
            200
        )
        
        if success:
            print(f"   Total admins: {response.get('total_admins', 'Unknown')}")
            print(f"   Admin name: {response.get('admin_name', 'Unknown')}")
        return success

    def test_unauthorized_access(self):
        """Test accessing protected endpoint without token"""
        # Temporarily remove token
        original_token = self.token
        self.token = None
        
        success, response = self.run_test(
            "Unauthorized Access",
            "GET",
            "auth/me",
            401  # Should fail with 401
        )
        
        # Restore token
        self.token = original_token
        return success

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Lojitek API Tests...")
        print(f"   Base URL: {self.base_url}")
        print(f"   API URL: {self.api_url}")
        
        # Test sequence
        tests = [
            self.test_api_root,
            self.test_register_admin,
            self.test_duplicate_email_registration,
            self.test_duplicate_id_registration,
            self.test_login_admin,
            self.test_invalid_login,
            self.test_get_current_admin,
            self.test_get_admin_stats,
            self.test_unauthorized_access
        ]
        
        for test in tests:
            try:
                test()
            except Exception as e:
                self.log_test(test.__name__, False, f"Test execution error: {str(e)}")
        
        # Print summary
        print(f"\n📊 Test Summary:")
        print(f"   Tests run: {self.tests_run}")
        print(f"   Tests passed: {self.tests_passed}")
        print(f"   Tests failed: {self.tests_run - self.tests_passed}")
        print(f"   Success rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        return self.tests_passed == self.tests_run

def main():
    tester = LojiTekAPITester()
    success = tester.run_all_tests()
    
    # Save detailed results
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump({
            'timestamp': datetime.now().isoformat(),
            'total_tests': tester.tests_run,
            'passed_tests': tester.tests_passed,
            'success_rate': (tester.tests_passed/tester.tests_run)*100 if tester.tests_run > 0 else 0,
            'results': tester.test_results
        }, f, indent=2)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())