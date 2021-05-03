package com.kgeapp;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.kgeapp.sox.jni.sox;
import com.facebook.react.bridge.ReadableMap;

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
    public int init(String inFile, String outFile) {
        sox_object = new sox(inFile,outFile);
        if(sox_object.init(sox_object.getInfile(),sox_object.getOutfile())==1){return 1;}
        System.out.println("call Java");
        return 0;
    }

    @ReactMethod
    public int add_effect(String effect, ReadableMap args) {
        switch(effect){
            case "vol" :
                int volume = args.getInt("volume");
                sox_object.addVolEffect(volume);
                break; 
            case "equalizer" :
                int frequency = args.getInt("frequency");
                double bandWidth = args.getDouble("bandWidth");
                int gain = args.getInt("gain");
                sox_object.addEqualizerEffect(frequency,bandWidth,gain);
                break; 
            case "reverb" :
                boolean wetOnly = args.getBoolean("wetOnly");
                int reverbrance = args.getInt("reverbrance");
                int hfDamping = args.getInt("hfDamping");
                int roomScale = args.getInt("roomScale");
                int stereoDepth = args.getInt("stereoDepth");
                int preDelay = args.getInt("preDelay");
                int wetGain = args.getInt("wetGain");
                sox_object.addReverbEffect(wetOnly,reverbrance,hfDamping,roomScale,stereoDepth,preDelay,wetGain);
                break; 
            case "compand" :
                sox_object.addCompandEffect();
                break; 
            case "highPass" :
                int frequency2 = args.getInt("frequency");
                double bandWidth2 = args.getDouble("bandWidth");
                sox_object.addHighPassEffect(frequency2,bandWidth2);
                break; 
            case "lowPass" :
                int frequency3 = args.getInt("frequency");
                double bandWidth3 = args.getDouble("bandWidth");
                sox_object.addLowPassEffect(frequency3,bandWidth3);
                break; 
            case "echo" :
                if(sox_object.addEchoEffect()==1){return 1;}
                break; 
            case "chorus" :
                sox_object.addChorusEffect();
                break; 
            
            default : 
                return 1;
        }
        return 0;
    }
    @ReactMethod
    public int flow(){
        if(sox_object.flowEffects()==1){return 1;}
        return 0;
    } 
}