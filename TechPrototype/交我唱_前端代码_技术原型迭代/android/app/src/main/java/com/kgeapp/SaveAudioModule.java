package com.kgeapp;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableType;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.DataOutputStream;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.io.IOException;
import java.lang.String;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import android.util.Base64;
import com.kgeapp.rnnoise.RNNoise;

public class SaveAudioModule extends ReactContextBaseJavaModule {
    static{
        System.loadLibrary("rnnoise");
    }
    public SaveAudioModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "SaveAudio";
    }

    @ReactMethod
    public void save(String path, String base64audio, Promise promise){
         Thread saveThread = new Thread(new Runnable() {
            public void run() {
                try {
                    int len = path.length();
                    String format = path.substring(len-3, len);
                    boolean isWav;
                    if(format.equals("wav")){
                        isWav = true;
                    }else if(format.equals("pcm")){
                        isWav = false;
                    }else{
                        promise.resolve("Invalid format");
                        return;
                    }
                    byte[] audio = Base64.decode(base64audio, Base64.NO_WRAP);
                    // short[] newaudio = new short[audio.size()];
                    // for(int i=0; i<audio.size();i++){
                    //     newaudio[i] = (short) (audio.getInt(i) & 0xFFFF);
                    // }
                    String in = "";
                    String out = "";
                    RNNoise suppressor = new RNNoise(in,out);
                    audio = suppressor.flowRNNoise(audio);
                    boolean result = SaveFile(path, audio,isWav);
                    if(result){promise.resolve("Save failed");}
                    else{promise.resolve("Save success");}
                    promise.resolve("Save success");
                } catch (Exception ex) {
                    promise.reject("ERR_UNEXPECTED_EXCEPTION", ex);
                 }
            }
        });

        saveThread.start();
    }


    private boolean SaveFile(String path, byte[] data, boolean isWav) throws Exception{

        FileOutputStream output = null;
        boolean ret = true;
        try {
            output = new FileOutputStream(path);
            // WAVE header
            // see http://ccrma.stanford.edu/courses/422/projects/WaveFormat/
            if(isWav){
                addWavHeader(output,data.length,36 + data.length);
            }

            output.write(data);

        } catch (Exception err) {
            return ret;
        } finally {
            if (output != null) {
                output.close();
                ret = false;
            }
            return ret;
        }
    }

    private void addWavHeader(FileOutputStream out, long totalAudioLen, long totalDataLen)
            throws Exception {

        long sampleRate = 48000;
        int channels = 1;
        int bitsPerSample = 16;
        long byteRate =  sampleRate * channels * bitsPerSample / 8;
        int blockAlign = channels * bitsPerSample / 8;

        byte[] header = new byte[44];

        header[0] = 'R';                                    // RIFF chunk
        header[1] = 'I';
        header[2] = 'F';
        header[3] = 'F';
        header[4] = (byte) (totalDataLen & 0xff);           // how big is the rest of this file
        header[5] = (byte) ((totalDataLen >> 8) & 0xff);
        header[6] = (byte) ((totalDataLen >> 16) & 0xff);
        header[7] = (byte) ((totalDataLen >> 24) & 0xff);
        header[8] = 'W';                                    // WAVE chunk
        header[9] = 'A';
        header[10] = 'V';
        header[11] = 'E';
        header[12] = 'f';                                   // 'fmt ' chunk
        header[13] = 'm';
        header[14] = 't';
        header[15] = ' ';
        header[16] = 16;                                    // 4 bytes: size of 'fmt ' chunk
        header[17] = 0;
        header[18] = 0;
        header[19] = 0;
        header[20] = 1;                                     // format = 1 for PCM
        header[21] = 0;
        header[22] = (byte) channels;                       // mono or stereo
        header[23] = 0;
        header[24] = (byte) (sampleRate & 0xff);            // samples per second
        header[25] = (byte) ((sampleRate >> 8) & 0xff);
        header[26] = (byte) ((sampleRate >> 16) & 0xff);
        header[27] = (byte) ((sampleRate >> 24) & 0xff);
        header[28] = (byte) (byteRate & 0xff);              // bytes per second
        header[29] = (byte) ((byteRate >> 8) & 0xff);
        header[30] = (byte) ((byteRate >> 16) & 0xff);
        header[31] = (byte) ((byteRate >> 24) & 0xff);
        header[32] = (byte) blockAlign;                     // bytes in one sample, for all channels
        header[33] = 0;
        header[34] = (byte) bitsPerSample;                  // bits in a sample
        header[35] = 0;
        header[36] = 'd';                                   // beginning of the data chunk
        header[37] = 'a';
        header[38] = 't';
        header[39] = 'a';
        header[40] = (byte) (totalAudioLen & 0xff);         // how big is this data chunk
        header[41] = (byte) ((totalAudioLen >> 8) & 0xff);
        header[42] = (byte) ((totalAudioLen >> 16) & 0xff);
        header[43] = (byte) ((totalAudioLen >> 24) & 0xff);

        out.write(header, 0, 44);
    }
}
