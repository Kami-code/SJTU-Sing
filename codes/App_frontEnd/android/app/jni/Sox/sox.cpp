#include <com_kgeapp_sox_jni_sox.h>

#include <stdlib.h>
#include <stdio.h>
#include <assert.h>
#include <string.h>
#include "sox.h"

static sox_format_t * in, * out;
static sox_effects_chain_t * chain;

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeInit
 * Signature: (JLjava/lang/String;Ljava/lang/String;)V
 */
JNIEXPORT jint JNICALL Java_com_kgeapp_sox_jni_sox_nativeInit
  (JNIEnv * env, jclass cla, jstring input, jstring output){
        const char *infile = env->GetStringUTFChars(input, JNI_FALSE);
        const char *outfile = env->GetStringUTFChars(output, JNI_FALSE);
        if(sox_init() != SOX_SUCCESS){return 1;}
        in = sox_open_read(infile, NULL, NULL, NULL);
        out = sox_open_write(outfile, &in->signal, NULL, NULL, NULL, NULL);
        chain = sox_create_effects_chain(&in->encoding, &out->encoding);
        sox_effect_t* e = sox_create_effect(sox_find_effect("input"));
        char* args[] ={ (char *)in};
        if(sox_effect_options(e, 1, args) != SOX_SUCCESS){return 1;}

        if(sox_add_effect(chain, e, &in->signal, &in->signal) != SOX_SUCCESS){return 1;}
        free(e);

        return 0;
  }
/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddEchoEffects
 * Signature: (J)V
 */


JNIEXPORT jint JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddEchoEffects
  (JNIEnv *env, jclass cla,jint Delay){

      sox_effect_t* e = sox_create_effect(sox_find_effect("echo"));
      char delay[10];
      sprintf(delay,"%d",Delay);
      char* gainIn = "0.8";
      char* gainOut = "0.88";
      char* decay = "0.2";
      char* args[] = {gainIn, gainOut, delay, decay} ;
      if(sox_effect_options(e, 4, args) != SOX_SUCCESS){return 1;}
      /* Add the effect to the end of the effects processing chain: */
      if(sox_add_effect(chain, e, &in->signal, &in->signal) != SOX_SUCCESS){return 1;}
      free(e);
      return 0;
  }

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddVolEffect
 * Signature: (JI)V
 */
JNIEXPORT jint JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddVolEffect
    (JNIEnv * env, jclass cla, jint Volume){
        sox_effect_t * e = sox_create_effect(sox_find_effect("vol"));
        char volume[10];
        sprintf(volume,"%ddB",Volume);
        //args[0] = "3dB";
        // char* args[] = {strcat(intStr,"dB")};
        char* args[] = {volume};
        if(sox_effect_options(e, 1, args) != SOX_SUCCESS){return 1;};
        /* Add the effect to the end of the effects processing chain: */
        if(sox_add_effect(chain, e, &in->signal, &in->signal) != SOX_SUCCESS){return 1;};
        free(e);
        return 0;
    }

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddFlangerEffect
 * Signature: (J)V
 */
JNIEXPORT jint JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddFlangerEffect
    (JNIEnv * env, jclass cla){
        sox_effect_t * e = sox_create_effect(sox_find_effect("flanger"));
        if(sox_effect_options(e, 0, NULL) != SOX_SUCCESS){return 1;}
        /* Add the effect to the end of the effects processing chain: */
        if(sox_add_effect(chain, e, &in->signal, &in->signal) != SOX_SUCCESS){return 1;}
        free(e);
        return 0;
    }

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddCompandEffect
 * Signature: (J)V
 */
JNIEXPORT jint JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddCompandEffect
    (JNIEnv * env, jclass cla){
        sox_effect_t * e = sox_create_effect(sox_find_effect("compand"));
        char* attackRelease = "0.3,1.0";
        char* functionTransTable = "6:-90,-90,-70,-55,-31,-31,-21,-21,0,-20";
        char* gain = "0";
        char* initialVolume = "-90";
        char* delay = "0.1";
        char* args[] = {attackRelease, functionTransTable, gain, initialVolume, delay} ;
        if(sox_effect_options(e, 5, args) != SOX_SUCCESS){return 1;};
        /* Add the effect to the end of the effects processing chain: */
        if(sox_add_effect(chain, e, &in->signal, &in->signal) != SOX_SUCCESS){return 1;};
        free(e);
        return 0;
    }

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddReverbEffect
 * Signature: (JZIIIIII)V
 */
JNIEXPORT jint JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddReverbEffect
    (JNIEnv * env, jclass cla, jboolean WetOnly, jint Reverbrance, jint HfDamping, jint RoomScale, jint StereoDepth, jint PreDelay, jint WetGain)
  {
      char* wetOnly;
      char reverbrance[5];
      char hfDamping[5];
      char roomScale[5];
      char stereoDepth[5];
      char preDelay[5];
      char wetGain[5];
      sprintf(reverbrance, "%d",Reverbrance);
      sprintf(hfDamping, "%d",HfDamping);
      sprintf(roomScale, "%d",RoomScale);
      sprintf(stereoDepth, "%d",StereoDepth);
      sprintf(preDelay, "%d",PreDelay);
      sprintf(wetGain, "%d",WetGain);
      sox_effect_t * e = sox_create_effect(sox_find_effect("reverb"));
      if(WetOnly){
        wetOnly = "-w";
        char* arg[] = {wetOnly, reverbrance, hfDamping, roomScale, stereoDepth, preDelay,wetGain} ;
        if(sox_effect_options(e, 7, arg) != SOX_SUCCESS){return 1;};
      }
      else{
        char* args[] = {reverbrance, hfDamping, roomScale, stereoDepth, preDelay,wetGain};
        if(sox_effect_options(e, 6, args) != SOX_SUCCESS){return 1;};
      }
      if(sox_add_effect(chain, e, &in->signal, &in->signal) != SOX_SUCCESS){return 1;};
      free(e);
      return 0;
  }

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddChorusEffects
 * Signature: (J)V
 */
JNIEXPORT jint JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddChorusEffects
  (JNIEnv *env, jclass cla)
  {
      sox_effect_t * e = sox_create_effect(sox_find_effect("chorus"));
      if(sox_effect_options(e, 0, NULL) == SOX_SUCCESS){return 1;};
      /* Add the effect to the end of the effects processing chain: */
      if(sox_add_effect(chain, e, &in->signal, &in->signal) != SOX_SUCCESS){return 1;};
      free(e);
      return 0;
  }
/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddEqualizerEffect
 * Signature: (JIDD)V
 */
JNIEXPORT jint JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddEqualizerEffect
  (JNIEnv *env, jclass cla, jint Frequency, jdouble BandWidth, jdouble Gain)
  {
      sox_effect_t * e = sox_create_effect(sox_find_effect("equalizer"));
      char frequency[10];
      char bandWidth[10];
      char gain[10];

      sprintf(frequency,"%d",Frequency);
      sprintf(bandWidth,"%.2lfq",BandWidth);
      sprintf(gain,"%.1lfdB",Gain);
      char* args[] = {frequency, bandWidth, gain};

      if(sox_effect_options(e, 3, args) == SOX_SUCCESS){return 1;};
      /* Add the effect to the end of the effects processing chain: */
      if(sox_add_effect(chain, e, &in->signal, &in->signal) != SOX_SUCCESS){return 1;};
      free(e);
      return 0;
  }

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddHighPassEffect
 * Signature: (JID)V
 */
JNIEXPORT jint JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddHighPassEffect
  (JNIEnv *env, jclass cla, jint Frequency, jdouble Width)
  {
      sox_effect_t * e = sox_create_effect(sox_find_effect("highpass"));
      char frequency[10];
      char width[10];

      sprintf(frequency,"%d",Frequency);
      sprintf(width,"%.2lfq",Width);
      char* args[] = {frequency, width};

      if(sox_effect_options(e, 2, args) == SOX_SUCCESS){return 1;};
      /* Add the effect to the end of the effects processing chain: */
      if(sox_add_effect(chain, e, &in->signal, &in->signal) != SOX_SUCCESS){return 1;};
      free(e);
      return 0;
  }

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddLowPassEffect
 * Signature: (JID)V
 */
JNIEXPORT jint JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddLowPassEffect
  (JNIEnv *env, jclass cla, jint Frequency, jdouble Width)
  {
      sox_effect_t * e = sox_create_effect(sox_find_effect("lowpass"));
      char frequency[10];
      char width[10];

      sprintf(frequency,"%d",Frequency);
      sprintf(width,"%.2lfq",Width);
      char* args[] = {frequency, width};

      if(sox_effect_options(e, 2, args) == SOX_SUCCESS){return 1;};
      /* Add the effect to the end of the effects processing chain: */
      if(sox_add_effect(chain, e, &in->signal, &in->signal) != SOX_SUCCESS){return 1;};
      free(e);
      return 0;
  }


/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeFlowEffects
 * Signature: (J)V
 */
JNIEXPORT jint JNICALL Java_com_kgeapp_sox_jni_sox_nativeFlowEffects
    (JNIEnv * env, jclass cla){
        char* args[1] ;
        args[0]=(char *)out;
        sox_effect_t * e = sox_create_effect(sox_find_effect("output"));
        if(sox_effect_options(e, 1, args) != SOX_SUCCESS){return 1;}
        if(sox_add_effect(chain, e, &in->signal, &in->signal) != SOX_SUCCESS){return 1;}



        free(e);
        sox_flow_effects(chain,NULL,NULL);

        sox_delete_effects_chain(chain);
        sox_close(out);
        sox_close(in);

        sox_quit();
        return 0;
    }

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeDestroy
 * Signature: (J)V
 */
