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

    public int addVolEffect(int volume){
	    return nativeAddVolEffect(volume);
	}

    public int addFlangerEffect(){
	    return nativeAddFlangerEffect();
	}

    public int addEqualizerEffect(int frequency, double bandWidth, int gain){
	    return nativeAddEqualizerEffect( frequency, bandWidth, gain);
	}

    public int addHighPassEffect(int frequency, double bandWidth){
	    return nativeAddHighPassEffect( frequency, bandWidth);
	}

    public int addLowPassEffect(int frequency, double bandWidth){
	    return nativeAddLowPassEffect( frequency, bandWidth);
	}

    public int addCompandEffect(){
	    return nativeAddCompandEffect();
	}

    public int addChorusEffect(){
	    return nativeAddChorusEffects();
	}

    public int addEchoEffect(int delay){
	    return nativeAddEchoEffects(delay);
	}

    public int addReverbEffect(boolean wetOnly, int reverbrance, int hfDamping, int roomScale, int stereoDepth, int preDelay, int wetGain){
	    return nativeAddReverbEffect(wetOnly, reverbrance, hfDamping, roomScale, stereoDepth, preDelay, wetGain);
	}

    public int flowEffects(){
	    return nativeFlowEffects();
	}


    protected static native int nativeInit(String in, String out);

    protected static native int nativeAddVolEffect(int volume);

    protected static native int nativeAddFlangerEffect();

    protected static native int nativeAddEqualizerEffect(int frequency, double bandWidth, double gain);

    protected static native int nativeAddHighPassEffect(int frequency, double bandWidth);

    protected static native int nativeAddLowPassEffect( int frequency, double bandWidth);

    protected static native int nativeAddCompandEffect();

    protected static native int nativeAddReverbEffect(boolean wetOnly, int reverbrance, int hfDamping, int roomScale, int stereoDepth, int preDelay, int wetGain);

    protected static native int nativeAddChorusEffects();

    protected static native int nativeAddEchoEffects(int delay);
    
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



