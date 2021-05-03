package com.kgeapp.sox.jni;
import java.util.concurrent.atomic.AtomicBoolean;


public class sox {
    private final AtomicBoolean disposed = new AtomicBoolean(false);


    private String infile ;

    private String outfile ;

    public sox(String infile, String outfile){
        this.infile = infile;
        this.outfile = outfile;
    }


    public int init(String in, String out){
	    return nativeInit(in, out);
	}

    public void addVolEffect(int volume){
	    nativeAddVolEffect(volume);
	}

    public int addFlangerEffect(){
	    return nativeAddFlangerEffect();
	}

    public void addEqualizerEffect(int frequency, double bandWidth, int gain){
	    nativeAddEqualizerEffect( frequency, bandWidth, gain);
	}

    public void addHighPassEffect(int frequency, double bandWidth){
	    nativeAddHighPassEffect( frequency, bandWidth);
	}

    public void addLowPassEffect(int frequency, double bandWidth){
	    nativeAddLowPassEffect( frequency, bandWidth);
	}

    public void addCompandEffect(){
	    nativeAddCompandEffect();
	}

    public void addChorusEffect(){
	    nativeAddChorusEffects();
	}

    public int addEchoEffect(){
	    return nativeAddEchoEffects();
	}

    public void addReverbEffect(boolean wetOnly, int reverbrance, int hfDamping, int roomScale, int stereoDepth, int preDelay, int wetGain){
	    nativeAddReverbEffect(wetOnly, reverbrance, hfDamping, roomScale, stereoDepth, preDelay, wetGain);
	}

    public int flowEffects(){
	    return nativeFlowEffects();
	}


    protected static native int nativeInit(String in, String out);

    protected static native void nativeAddVolEffect(int volume);

    protected static native int nativeAddFlangerEffect();

    protected static native void nativeAddEqualizerEffect(int frequency, double bandWidth, double gain);

    protected static native void nativeAddHighPassEffect(int frequency, double bandWidth);

    protected static native void nativeAddLowPassEffect( int frequency, double bandWidth);

    protected static native void nativeAddCompandEffect();

    protected static native void nativeAddReverbEffect(boolean wetOnly, int reverbrance, int hfDamping, int roomScale, int stereoDepth, int preDelay, int wetGain);

    protected static native void nativeAddChorusEffects();

    protected static native int nativeAddEchoEffects();
    
    protected static native int nativeFlowEffects();


    public String getInfile() {
        return infile;
    }

    public void setInfile(String infile) {
        this.infile = infile;
    }

    public String getOutfile() {
        return outfile;
    }

    public void setOutfile(String outfile) {
        this.outfile = outfile;
    }

}



