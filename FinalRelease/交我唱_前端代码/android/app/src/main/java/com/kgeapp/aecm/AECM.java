package com.kgeapp.aecm.jni;

public class AECM {
    private String nearFile ;
    private String farFile;
    private String outFile ;

    public AECM(String nearFile, String farFile, String outFile){
        this.nearFile = nearFile;
        this.farFile = farFile;
        this.outFile = outFile;
    }

    public String getNearFile() {
        return nearFile;
    }

    public void setNearFile(String nearFile) {
        this.nearFile = nearFile;
    }

    public String getFarFile() {
        return farFile;
    }

    public void setFarfile(String farFile) {
        this.farFile = farFile;
    }

    public String getOutFile() {
        return outFile;
    }

    public void setOutFile(String outFile) {
        this.outFile = outFile;
    }

    public native int runAECM(String nearFile, String farFile, String outFile);
}
