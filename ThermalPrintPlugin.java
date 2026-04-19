package net.lojitek.lotri;

  import android.content.Context;
  import android.content.Intent;
  import android.util.Log;
  import com.getcapacitor.JSObject;
  import com.getcapacitor.Plugin;
  import com.getcapacitor.PluginCall;
  import com.getcapacitor.PluginMethod;
  import com.getcapacitor.annotation.CapacitorPlugin;
  import java.io.OutputStream;
  import java.net.Socket;

  @CapacitorPlugin(name = "ThermalPrint")
  public class ThermalPrintPlugin extends Plugin {
      private static final String TAG = "ThermalPrint";
      private static final byte[] ESC_INIT  = {0x1B, 0x40};
      private static final byte[] ESC_FEED  = {0x0A};
      private static final byte[] ESC_CUT   = {0x1D, 0x56, 0x01};

      @PluginMethod
      public void print(PluginCall call) {
          String text = call.getString("text", "");
          if (text.isEmpty()) { call.reject("No text"); return; }

          if (trySunmi(text))      { call.resolve(new JSObject().put("method","sunmi"));   return; }
          if (tryIntent(text))     { call.resolve(new JSObject().put("method","intent"));  return; }
          if (trySocket(text))     { call.resolve(new JSObject().put("method","socket"));  return; }
          call.resolve(new JSObject().put("method","fallback"));
      }

      private boolean trySunmi(String text) {
          try {
              Intent i = new Intent();
              i.setPackage("woyou.aidlservice.jiuiv5");
              i.setAction("woyou.aidlservice.jiuiv5.IWoyouService");
              if (getContext().getPackageManager().resolveService(i, 0) == null) return false;
              Intent p = new Intent("com.sunmi.hcservice.PRINT_RAW");
              p.putExtra("data", buildEscPos(text));
              getContext().sendBroadcast(p);
              return true;
          } catch (Exception e) { return false; }
      }

      private boolean tryIntent(String text) {
          try {
              Intent i = new Intent("android.intent.action.PRINT");
              i.putExtra("data", text.getBytes("GBK"));
              i.putExtra("FORMAT", "TEXT");
              getContext().sendBroadcast(i);
              return true;
          } catch (Exception e) { return false; }
      }

      private boolean trySocket(String text) {
          try {
              Socket s = new Socket("127.0.0.1", 9100);
              s.setSoTimeout(2000);
              OutputStream o = s.getOutputStream();
              o.write(buildEscPos(text)); o.flush(); s.close();
              return true;
          } catch (Exception e) { return false; }
      }

      private byte[] buildEscPos(String text) throws Exception {
          java.io.ByteArrayOutputStream buf = new java.io.ByteArrayOutputStream();
          buf.write(ESC_INIT);
          for (String line : text.split("\n")) {
              buf.write(line.getBytes("GBK"));
              buf.write(ESC_FEED);
          }
          buf.write(ESC_FEED); buf.write(ESC_FEED); buf.write(ESC_CUT);
          return buf.toByteArray();
      }
  }
  