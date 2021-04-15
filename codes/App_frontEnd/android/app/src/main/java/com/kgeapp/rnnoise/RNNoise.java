package com.kgeapp.rnnoise;

public class RNNoise {
    private String infile ;
    private String outfile ;

    public RNNoise(String infile, String outfile){
        this.infile = infile;
        this.outfile = outfile;
    }

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

    public native void cancelNoise(String in, String out);
}
