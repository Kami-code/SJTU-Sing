package com.kgeapp;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule; 
import com.kgeapp.aecm.jni.AECM;

//import java.util.Map;
//import java.util.HashMap;

public class AecmModule extends ReactContextBaseJavaModule {
    static{
        System.loadLibrary("aecm");
    } 

    private static ReactApplicationContext reactContext;

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public AecmModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "AECM";
    }

    @ReactMethod
    public void aec(String nearFile, String farFile, String outFile) {
        AECM aec_object = new AECM(nearFile,farFile,outFile);
        int result = aec_object.runAECM(aec_object.getNearFile(),aec_object.getFarFile(),aec_object.getOutFile());
        sendMsgToRn(nearFile);
        sendMsgToRn(farFile);
        sendMsgToRn(outFile);
        sendMsgToRn(Integer.toString(result));
    }

    public void sendMsgToRn(String msg){  
        //将消息msg发送给RN侧  
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("AndroidToRNMessage",msg);  
  
    }  
}