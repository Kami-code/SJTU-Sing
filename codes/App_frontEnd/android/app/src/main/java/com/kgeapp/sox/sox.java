package com.kgeapp.sox.jni;
import java.util.concurrent.atomic.AtomicBoolean;


public class sox {
    private final AtomicBoolean disposed = new AtomicBoolean(false);

    protected long nativeObject;

    private String infile ;

    private String outfile ;

    public sox(String infile, String outfile){
        this.nativeObject = nativeCreate();
        this.infile = infile;
        this.outfile = outfile;
    }

    @Override
    protected void finalize() throws Throwable {
        try {
            this.destroy();
        } catch (Exception ex) {
            System.err.println("Error - exception thrown in finalizer of Calculator.\n" + ex.getMessage());
            ex.printStackTrace();
        } finally {
            super.finalize();
        }
    }

    private void destroy() {
        //避免多线程调用不安全释放问题
        if (this.disposed.compareAndSet(false, true)) {
            //TODO: 释放类相关资源
            if (this.nativeObject() != 0L) {
                nativeDestroy(this.nativeObject());
            }

            this.nativeObject = 0L;
        }
    }

    private long nativeObject(){
        return nativeObject;
    }



    public void init(String in, String out){
	    nativeInit(nativeObject, in, out);
	}

    public void addVolEffect(int volume){
	    nativeAddVolEffect(nativeObject, volume);
	}

    public void addFlangerEffect(){
	    nativeAddFlangerEffect(nativeObject);
	}

    public void addEqualizerEffect(int frequency, double bandWidth, int gain){
	    nativeAddEqualizerEffect(nativeObject, frequency, bandWidth, gain);
	}

    public void addHighPassEffect(int frequency, double bandWidth){
	    nativeAddHighPassEffect(nativeObject, frequency, bandWidth);
	}

    public void addLowPassEffect(int frequency, double bandWidth){
	    nativeAddLowPassEffect(nativeObject, frequency, bandWidth);
	}

    public void addCompandEffect(){
	    nativeAddCompandEffect(nativeObject);
	}

    public void addChorusEffect(){
	    nativeAddChorusEffects(nativeObject);
	}

    public void addEchoEffect(){
	    nativeAddEchoEffects(nativeObject);
	}

    public void addReverbEffect(boolean wetOnly, int reverbrance, int hfDamping, int roomScale, int stereoDepth, int preDelay, int wetGain){
	    nativeAddReverbEffect(nativeObject, wetOnly, reverbrance, hfDamping, roomScale, stereoDepth, preDelay, wetGain);
	}

    public void flowEffects(){
	    nativeFlowEffects(nativeObject);
	}

    private static native long nativeCreate();

    protected static native void nativeInit(long nativeObject, String in, String out);

    protected static native void nativeAddVolEffect(long nativeObject,int volume);

    protected static native void nativeAddFlangerEffect(long nativeObject);

    protected static native void nativeAddEqualizerEffect(long nativeObject, int frequency, double bandWidth, double gain);

    protected static native void nativeAddHighPassEffect(long nativeObject, int frequency, double bandWidth);

    protected static native void nativeAddLowPassEffect(long nativeObject, int frequency, double bandWidth);

    protected static native void nativeAddCompandEffect(long nativeObject);

    protected static native void nativeAddReverbEffect(long nativeObject,boolean wetOnly, int reverbrance, int hfDamping, int roomScale, int stereoDepth, int preDelay, int wetGain);

    protected static native void nativeAddChorusEffects(long nativeObject);

    protected static native void nativeAddEchoEffects(long nativeObject);
    
    protected static native void nativeFlowEffects(long nativeObject);

    protected static native void nativeDestroy(long nativeObject);

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



