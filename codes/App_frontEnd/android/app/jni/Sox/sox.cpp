#include <com_kgeapp_sox_jni_sox.h>



JNIEXPORT jlong JNICALL Java_com_kgeapp_sox_jni_sox_nativeCreate
  (JNIEnv * env, jclass cla){
      Sox* object = new Sox;
      return (jlong)&object;
  }

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeInit
 * Signature: (JLjava/lang/String;Ljava/lang/String;)V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_sox_jni_sox_nativeInit
  (JNIEnv * env, jclass cla, jlong object, jstring input, jstring output){
        Sox* SoxObject = (Sox*)object;
        assert(sox_init() == SOX_SUCCESS);
        assert(SoxObject->in = sox_open_read(input, NULL, NULL, NULL));
        assert(SoxObject->out = sox_open_write(output, &(SoxObject->in)->signal, NULL, NULL, NULL, NULL));
        SoxObject->chain = sox_create_effects_chain(&(SoxObject->in)->encoding, &(SoxObject->out)->encoding);
        SoxObject->e = sox_create_effect(sox_find_effect("input"));
        char* args[] ={ (char *)SoxObject->in};
        assert(sox_effect_options(SoxObject->e, 1, args) == SOX_SUCCESS);

        assert(sox_add_effect(SoxObject->chain, SoxObject->e, &SoxObject->in->signal, &SoxObject->in->signal) == SOX_SUCCESS);
        free(SoxObject->e);
  }

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddVolEffect
 * Signature: (JI)V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddVolEffect
    (JNIEnv * env, jclass cla, jlong object, jint Volume){
        Sox* SoxObject = (Sox*)object;
        SoxObject->e = sox_create_effect(sox_find_effect("vol"));
        char volume[10];
        sprintf(volume,"%ddB",Volume);
        //SoxObject->args[0] = "3dB";
        // char* args[] = {strcat(intStr,"dB")};
        char* args[] = {volume};
        assert(sox_effect_options(SoxObject->e, 1, args) == SOX_SUCCESS);
        /* Add the effect to the end of the effects processing chain: */
        assert(sox_add_effect(SoxObject->chain, SoxObject->e, &SoxObject->in->signal, &SoxObject->in->signal) == SOX_SUCCESS);
        free(SoxObject->e);
    }

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddFlangerEffect
 * Signature: (J)V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddFlangerEffect
    (JNIEnv * env, jclass cla, jlong object){
        Sox* SoxObject = (Sox*)object;
        SoxObject->e = sox_create_effect(sox_find_effect("flanger"));
        assert(sox_effect_options(SoxObject->e, 0, NULL) == SOX_SUCCESS);
        /* Add the effect to the end of the effects processing chain: */
        assert(sox_add_effect(SoxObject->chain, SoxObject->e, &SoxObject->in->signal, &SoxObject->in->signal) == SOX_SUCCESS);
        free(SoxObject->e);
    }

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddCompandEffect
 * Signature: (J)V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddCompandEffect
    (JNIEnv * env, jclass cla, jlong object){
        Sox* SoxObject = (Sox*)object;
        SoxObject->e = sox_create_effect(sox_find_effect("compand"));
        char* attackRelease = "0.3,1.0";
        char* functionTransTable = "6:-90,-90,-70,-55,-31,-31,-21,-21,0,-20";
        char* gain = "0";
        char* initialVolume = "-90";
        char* delay = "0.1";
        char* args[] = {attackRelease, functionTransTable, gain, initialVolume, delay} ;
        assert(sox_effect_options(SoxObject->e, 5, args) == SOX_SUCCESS);
        /* Add the effect to the end of the effects processing chain: */
        assert(sox_add_effect(SoxObject->chain, SoxObject->e, &SoxObject->in->signal, &SoxObject->in->signal) == SOX_SUCCESS);
        free(SoxObject->e);
    }

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddReverbEffect
 * Signature: (JZIIIIII)V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddReverbEffect
    (JNIEnv * env, jclass cla, jlong object, jboolean WetOnly, jint Reverbrance, jint HfDamping, jint RoomScale, jint StereoDepth, jint PreDelay, jint WetGain)
  {
      Sox* SoxObject = (Sox*)object;
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
      if(WetOnly){
        wetOnly = "-w";
        char* arg[] = {wetOnly, reverbrance, hfDamping, roomScale, stereoDepth, preDelay,wetGain} ;
        assert(sox_effect_options(SoxObject->e, 7, arg) == SOX_SUCCESS);
      }
      else{
        char* args[] = {reverbrance, hfDamping, roomScale, stereoDepth, preDelay,wetGain};
        assert(sox_effect_options(SoxObject->e, 6, args) == SOX_SUCCESS);
      }
      assert(sox_add_effect(SoxObject->chain, SoxObject->e, &SoxObject->in->signal, &SoxObject->in->signal) == SOX_SUCCESS);
      free(SoxObject->e);
  }

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddChorusEffects
 * Signature: (J)V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddChorusEffects
  (JNIEnv *env, jclass cla, jlong object)
  {
      Sox* SoxObject = (Sox*)object;
      SoxObject->e = sox_create_effect(sox_find_effect("chorus"));
      assert(sox_effect_options(SoxObject->e, 0, NULL) == SOX_SUCCESS);
      /* Add the effect to the end of the effects processing chain: */
      assert(sox_add_effect(SoxObject->chain, SoxObject->e, &SoxObject->in->signal, &SoxObject->in->signal) == SOX_SUCCESS);
      free(SoxObject->e);
  }
/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddEqualizerEffect
 * Signature: (JIDD)V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddEqualizerEffect
  (JNIEnv *env, jclass cla, jlong object, jint Frequency, jdouble BandWidth, jdouble Gain)
  {
      Sox* SoxObject = (Sox*)object;
      SoxObject->e = sox_create_effect(sox_find_effect("equalizer"));
      char frequency[10];
      char bandWidth[10];
      char gain[10];

      sprintf(frequency,"%d",Frequency);
      sprintf(bandWidth,"%.2lfq",BandWidth);
      sprintf(gain,"%.1lfdB",Gain);
      char* args[] = {frequency, bandWidth, gain};

      assert(sox_effect_options(SoxObject->e, 3, args) == SOX_SUCCESS);
      /* Add the effect to the end of the effects processing chain: */
      assert(sox_add_effect(SoxObject->chain, SoxObject->e, &SoxObject->in->signal, &SoxObject->in->signal) == SOX_SUCCESS);
      free(SoxObject->e);
  }

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddHighPassEffect
 * Signature: (JID)V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddHighPassEffect
  (JNIEnv *env, jclass cla, jlong object, jint Frequency, jdouble Width)
  {
      Sox* SoxObject = (Sox*)object;
      SoxObject->e = sox_create_effect(sox_find_effect("highpass"));
      char frequency[10];
      char width[10];

      sprintf(frequency,"%d",Frequency);
      sprintf(width,"%.2lfq",Width);
      char* args[] = {frequency, width};

      assert(sox_effect_options(SoxObject->e, 2, args) == SOX_SUCCESS);
      /* Add the effect to the end of the effects processing chain: */
      assert(sox_add_effect(SoxObject->chain, SoxObject->e, &SoxObject->in->signal, &SoxObject->in->signal) == SOX_SUCCESS);
      free(SoxObject->e);
  }

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddLowPassEffect
 * Signature: (JID)V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddLowPassEffect
  (JNIEnv *env, jclass cla, jlong object, jint Frequency, jdouble Width)
  {
      Sox* SoxObject = (Sox*)object;
      SoxObject->e = sox_create_effect(sox_find_effect("lowpass"));
      char frequency[10];
      char width[10];

      sprintf(frequency,"%d",Frequency);
      sprintf(width,"%.2lfq",Width);
      char* args[] = {frequency, width};

      assert(sox_effect_options(SoxObject->e, 2, args) == SOX_SUCCESS);
      /* Add the effect to the end of the effects processing chain: */
      assert(sox_add_effect(SoxObject->chain, SoxObject->e, &SoxObject->in->signal, &SoxObject->in->signal) == SOX_SUCCESS);
      free(SoxObject->e);
  }
/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddEchoEffects
 * Signature: (J)V
 */


JNIEXPORT void JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddEchoEffects
  (JNIEnv *env, jclass cla, jlong object){
      Sox* SoxObject = (Sox*)object;
      SoxObject->e = sox_create_effect(sox_find_effect("echo"));
      assert(sox_effect_options(SoxObject->e, 0, NULL) == SOX_SUCCESS);
      /* Add the effect to the end of the effects processing chain: */
      assert(sox_add_effect(SoxObject->chain, SoxObject->e, &SoxObject->in->signal, &SoxObject->in->signal) == SOX_SUCCESS);
      free(SoxObject->e);
  }

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeFlowEffects
 * Signature: (J)V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_sox_jni_sox_nativeFlowEffects
    (JNIEnv * env, jclass cla, jlong object){
        Sox* SoxObject = (Sox*)object;
        sox_flow_effects(SoxObject->chain,NULL,NULL);
    }

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeDestroy
 * Signature: (J)V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_sox_jni_sox_nativeDestroy
    (JNIEnv * env, jclass cla, jlong object){
        Sox* SoxObject = (Sox*)object;
        sox_delete_effects_chain(SoxObject->chain);
        sox_close(SoxObject->out);
        sox_close(SoxObject->in);
        sox_quit();
    }