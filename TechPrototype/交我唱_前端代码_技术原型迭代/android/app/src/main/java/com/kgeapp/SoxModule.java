package com.kgeapp;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.kgeapp.sox.jni.sox;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Promise;

//import java.util.Map;
//import java.util.HashMap;

public class SoxModule extends ReactContextBaseJavaModule {
    static{
        System.loadLibrary("sox");
    }

    private static ReactApplicationContext reactContext;

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    private sox sox_object ; 

    public SoxModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "Sox";
    }

    

    @ReactMethod
    public void init(String inFile, String outFile, Promise promise) {
       
        sox_object = new sox(inFile,outFile);
        int result = sox_object.init(sox_object.getInfile(),sox_object.getOutfile());
        if(result==1){promise.resolve("sox init fail");return;}
        promise.resolve("sox init success");
  
    }
    

    @ReactMethod
    public void add_effect(String effect, ReadableMap args, Promise promise) {
        int result = 0;
        switch(effect){
            case "vol" :
                int volume = args.getInt("volume");              
                result = sox_object.addVolEffect(volume);
                break; 
            case "equalizer" :
                int frequency = args.getInt("frequency");
                double bandWidth = args.getDouble("bandWidth");
                int gain = args.getInt("gain");
                result = sox_object.addEqualizerEffect(frequency,bandWidth,gain);
                break; 
            case "reverb" :
                boolean wetOnly = args.getBoolean("wetOnly");
                int reverbrance = args.getInt("reverbrance");
                int hfDamping = args.getInt("hfDamping");
                int roomScale = args.getInt("roomScale");
                int stereoDepth = args.getInt("stereoDepth");
                int preDelay = args.getInt("preDelay");
                int wetGain = args.getInt("wetGain");
                result = sox_object.addReverbEffect(wetOnly,reverbrance,hfDamping,roomScale,stereoDepth,preDelay,wetGain);
                break; 
            case "compand" :
                sox_object.addCompandEffect();
                break; 
            case "highPass" :
                int frequency2 = args.getInt("frequency");
                double bandWidth2 = args.getDouble("bandWidth");
                result = sox_object.addHighPassEffect(frequency2,bandWidth2);
                break; 
            case "lowPass" :
                int frequency3 = args.getInt("frequency");
                double bandWidth3 = args.getDouble("bandWidth");
                
                result = sox_object.addLowPassEffect(frequency3,bandWidth3);
                break; 
            case "echo" :
                int delay = args.getInt("delay");
                result = sox_object.addEchoEffect(delay);
                break; 
            case "chorus" :
                result = sox_object.addChorusEffect();
                break; 
            
            default : 
                result = 1;
        }
        if(result == 1){
            promise.resolve("effect add "+effect+" fail");
        }else{
            promise.resolve("effect add " + effect+ " success");
        }
        return;
    }

    @ReactMethod
    public void flow(Promise promise){
        int result = sox_object.flowEffects();
        if(result==1){
            promise.resolve("add  fail");
            return;
            }
        promise.resolve("sox flow success");
        return;
    } 
}