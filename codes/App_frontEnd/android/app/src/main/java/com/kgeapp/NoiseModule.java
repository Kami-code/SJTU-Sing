
package com.kgeapp;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.kgeapp.rnnoise.RNNoise;

//import java.util.Map;
//import java.util.HashMap;

public class NoiseModule extends ReactContextBaseJavaModule {
    static{
        System.loadLibrary("rnnoise");
    }

    private static ReactApplicationContext reactContext;

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public NoiseModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "NoiseExample";
    }

    @ReactMethod
    public void noise_suppress(String in, String out) {
        RNNoise suppressor = new RNNoise(in,out);
        suppressor.cancelNoise(suppressor.getInfile(),suppressor.getOutfile());
        System.out.println("call Java");
    }
}