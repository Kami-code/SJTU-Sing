//
// Created by Lenovo on 2021/3/29.
//
#include <com_kgeapp_rnnoise_RNNoise.h>
/*
char* Jstring2CStr(JNIEnv* env, jstring jstr)
{
     char* rtn = NULL;
     jclass clsstring = env->FindClass("java/lang/String");
     jstring strencode = env->NewStringUTF("GB2312");
     jmethodID mid = env->GetMethodID(clsstring, "getBytes", "(Ljava/lang/String;)[B");
     jbyteArray barr = (jbyteArray)env->CallObjectMethod(jstr,mid,strencode); // String .getByte("GB2312");
     jsize alen = env->GetArrayLength(barr);
     jbyte* ba = env->GetByteArrayElements(barr,JNI_FALSE);
     if(alen > 0)
     {
      rtn = (char*)malloc(alen+1);         //"\0"
      memcpy(rtn,ba,alen);
      rtn[alen]=0;
     }
     env->ReleaseByteArrayElements(barr,ba,0);  //
     return rtn;
}
*/
JNIEXPORT void JNICALL Java_com_kgeapp_rnnoise_RNNoise_cancelNoise(JNIEnv * env, jobject obj, jstring in, jstring out){
    jclass CLASS = env->GetObjectClass(obj);
    //jfieldID jid_in = env->GetFieldID(CLASS, "infile","Ljava/lang/String");
    //jfieldID jid_out = env->GetFieldID(CLASS, "outfile","Ljava/lang/String");
    //char* infile = Jstring2CStr(env, env->GetObjectField(obj, jid_in));
    //char* outfile =  Jstring2CStr(env,env->GetObjectField(obj, jid_out));

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
