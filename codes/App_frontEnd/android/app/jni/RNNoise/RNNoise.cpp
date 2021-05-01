//
// Created by Lenovo on 2021/3/29.
//
#include "com_kgeapp_rnnoise_RNNoise.h"

JNIEXPORT void JNICALL Java_com_kgeapp_rnnoise_RNNoise_cancelNoise(JNIEnv * env, jobject obj, jstring in, jstring out){
    jclass CLASS = env->GetObjectClass(obj);

    const char *infile = env->GetStringUTFChars(in, JNI_FALSE);
    const char *outfile = env->GetStringUTFChars(out, JNI_FALSE);
    DenoiseState *st = rnnoise_create(NULL);
    float x[FRAME_SIZE];
    int first = 1;

    FILE *f1, *fout;
    f1 = fopen(infile, "rb");
    fout = fopen(outfile, "wb");

    if(!f1){
        printf("There is no such input file as %s", infile);
    }
    if(!fout){
            printf("There is no such output file as %s", infile);
        }
    while (1) {
        short tmp[FRAME_SIZE];
        fread(tmp, sizeof(short), FRAME_SIZE, f1);
        if (feof(f1)) break;
        for (int i=0;i<FRAME_SIZE;i++) x[i] = tmp[i];
        rnnoise_process_frame(st, x, x);
        for (int i=0;i<FRAME_SIZE;i++) tmp[i] = x[i];
        if (!first) fwrite(tmp, sizeof(short), FRAME_SIZE, fout);
        first = 0;
     }

    rnnoise_destroy(st);
    fclose(f1);
    fclose(fout);
    return ;

};

JNIEXPORT jbyteArray JNICALL Java_com_kgeapp_rnnoise_RNNoise_flowRNNoise(JNIEnv * env, jobject obj, jbyteArray audioIn){
    jclass CLASS = env->GetObjectClass(obj);

    jbyte * audio = (jbyte*)env->GetByteArrayElements(audioIn, 0);
    
    jsize  audioSize = env->GetArrayLength(audioIn);

    byte* bytearr = (byte*) audio;
    
    int len = (int)audioSize;
    DenoiseState *st = rnnoise_create(NULL);
    float x[FRAME_SIZE];
    int p = 0;//array pointer
    int q=0;
    int frame_num = len/FRAME_SIZE;
    int remain = len % FRAME_SIZE;

    for (int i = 0;i<frame_num;++i) {
        for (int j=0;j<FRAME_SIZE;j++) {
            x[j] = (short)((bytearr[p+1] << 8) + (bytearr[p] << 0));
            p = p + 2;
            }
        rnnoise_process_frame(st, x, x);
        for (int j=0;j<FRAME_SIZE;j++) {
            bytearr[q+1]=(byte)(((short)(x[j]) >> 8) & 0xff);
            bytearr[q]=(byte)(short(x[j]) & 0xff);
            q = q + 2;
            }
     }

    jbyte *res = (jbyte*)bytearr;
    jbyteArray result = env->NewByteArray(len);
    env->SetByteArrayRegion(result, 0, len, res);

    rnnoise_destroy(st);
    return result;

};