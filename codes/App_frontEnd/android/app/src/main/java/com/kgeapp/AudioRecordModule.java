package com.kgeapp;

import android.media.AudioFormat;
import android.media.AudioRecord;
import android.media.AudioTrack;
import android.media.AudioManager;
import android.media.MediaRecorder.AudioSource;
import android.util.Base64;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;

public class AudioRecordModule extends ReactContextBaseJavaModule {

    private final String TAG = "RNAudioRecord";
    private final ReactApplicationContext reactContext;
    private DeviceEventManagerModule.RCTDeviceEventEmitter eventEmitter;

    private int sampleRateInHz;
    private int channelConfig;
    private int audioFormat;
    private int audioSource;

    private AudioTrack audioTrack;
    private AudioRecord recorder;
    private int bufferSize;
    private boolean isRecording;

    private String tmpFile;
    private String outFile;
    private Promise stopRecordingPromise;


    public AudioRecordModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "AudioRecord";
    }

    private void createStreamModeAudioTrack() {

    }

    @ReactMethod
    public void init(ReadableMap options) {
        sampleRateInHz = 48000;
        if (options.hasKey("sampleRate")) {
            sampleRateInHz = options.getInt("sampleRate");
        }

        channelConfig = AudioFormat.CHANNEL_IN_STEREO;
        if (options.hasKey("channels")) {
            if (options.getInt("channels") == 1) {
                channelConfig = AudioFormat.CHANNEL_IN_MONO;
            }
        }

        audioFormat = AudioFormat.ENCODING_PCM_16BIT;
        if (options.hasKey("bitsPerSample")) {
            if (options.getInt("bitsPerSample") == 8) {
                audioFormat = AudioFormat.ENCODING_PCM_8BIT;
            }
        }

        audioSource = AudioSource.VOICE_RECOGNITION;
        if (options.hasKey("audioSource")) {
            audioSource = options.getInt("audioSource");
        }

        String documentDirectoryPath = getReactApplicationContext().getFilesDir().getAbsolutePath();
        outFile = documentDirectoryPath + "/" + "audio.wav";
        tmpFile = documentDirectoryPath + "/" + "temp.pcm";
        if (options.hasKey("wavFile")) {
            String fileName = options.getString("wavFile");
            outFile = documentDirectoryPath + "/" + fileName;
        }

        isRecording = false;
        eventEmitter = reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);

        bufferSize = AudioRecord.getMinBufferSize(sampleRateInHz, channelConfig, audioFormat);
        int recordingBufferSize = bufferSize * 3;
        recorder = new AudioRecord(audioSource, sampleRateInHz, channelConfig, audioFormat, recordingBufferSize);
        if (audioTrack == null) {
            audioTrack = new AudioTrack(AudioManager.STREAM_MUSIC,
                    sampleRateInHz, channelConfig, audioFormat, recordingBufferSize, AudioTrack.MODE_STREAM);
        }
    }

    @ReactMethod
    public void start() {
        isRecording = true;
        recorder.startRecording();
        Log.d(TAG, "started recording");

        Thread recordingThread = new Thread(new Runnable() {
            public void run() {
                try {
                    int bytesRead;
                    int count = 0;
                    String base64Data;
                    byte[] buffer = new byte[bufferSize];
                    //FileOutputStream os = new FileOutputStream(tmpFile);

                    while (isRecording) {
                        bytesRead = recorder.read(buffer, 0, buffer.length);

                        // skip first 2 buffers to eliminate "click sound"
                        if (bytesRead > 0) {
                            //audioTrack.play();
                            //audioTrack.write(buffer, 0, bytesRead);
                            base64Data = Base64.encodeToString(buffer, Base64.NO_WRAP);
                            eventEmitter.emit("data", base64Data);
                            //os.write(buffer, 0, bytesRead);

                        }
                    }

                    recorder.stop();
                    // if (audioTrack != null) {
                    //     if (audioTrack.getState() == AudioRecord.STATE_INITIALIZED) {//初始化成功
                    //         audioTrack.stop();//停止播放
                    //     }
                    //     if (audioTrack != null) {
                    //         audioTrack.release();//释放audioTrack资源
                    //     }
                    // }
                    stopRecordingPromise.resolve(outFile);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });

        recordingThread.start();
    }

    @ReactMethod
    public void stop(Promise promise) {
        isRecording = false;
        stopRecordingPromise = promise;
    }

}