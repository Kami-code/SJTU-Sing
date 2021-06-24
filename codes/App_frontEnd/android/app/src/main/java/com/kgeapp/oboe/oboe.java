package com.kgeapp.oboe;



public class oboe {
    public short[] data;



    // Native methods
    static native boolean create();
    static native boolean isAAudioRecommended();
    static native boolean setAPI(int apiType);
    static native boolean setEffectOn(boolean isEffectOn);
    static native void setRecordingDeviceId(int deviceId);
    static native void setPlaybackDeviceId(int deviceId);
    static native void delete();
    static native void getData();


}