/* DO NOT EDIT THIS FILE - it is machine generated */
#include <jni.h>
/* Header for class com_kgeapp_sox_jni_sox */

#ifndef _Included_com_kgeapp_sox_jni_sox
#define _Included_com_kgeapp_sox_jni_sox
#ifdef __cplusplus
extern "C" {
#endif
/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeCreate
 * Signature: ()J
 */
JNIEXPORT jlong JNICALL Java_com_kgeapp_sox_jni_sox_nativeCreate
  (JNIEnv *, jclass);

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeInit
 * Signature: (JLjava/lang/String;Ljava/lang/String;)V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_sox_jni_sox_nativeInit
  (JNIEnv *, jclass, jlong, jstring, jstring);

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddVolEffect
 * Signature: (JI)V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddVolEffect
  (JNIEnv *, jclass, jlong, jint);

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddFlangerEffect
 * Signature: (J)V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddFlangerEffect
  (JNIEnv *, jclass, jlong);

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddEqualizerEffect
 * Signature: (JIDD)V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddEqualizerEffect
  (JNIEnv *, jclass, jlong, jint, jdouble, jdouble);

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddHighPassEffect
 * Signature: (JID)V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddHighPassEffect
  (JNIEnv *, jclass, jlong, jint, jdouble);

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddLowPassEffect
 * Signature: (JID)V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddLowPassEffect
  (JNIEnv *, jclass, jlong, jint, jdouble);

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddCompandEffect
 * Signature: (J)V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddCompandEffect
  (JNIEnv *, jclass, jlong);

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddReverbEffect
 * Signature: (JZIIIIII)V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddReverbEffect
  (JNIEnv *, jclass, jlong, jboolean, jint, jint, jint, jint, jint, jint);

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddChorusEffects
 * Signature: (J)V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddChorusEffects
  (JNIEnv *, jclass, jlong);

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeAddEchoEffects
 * Signature: (J)V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_sox_jni_sox_nativeAddEchoEffects
  (JNIEnv *, jclass, jlong);

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeFlowEffects
 * Signature: (J)V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_sox_jni_sox_nativeFlowEffects
  (JNIEnv *, jclass, jlong);

/*
 * Class:     com_kgeapp_sox_jni_sox
 * Method:    nativeDestroy
 * Signature: (J)V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_sox_jni_sox_nativeDestroy
  (JNIEnv *, jclass, jlong);

#ifdef __cplusplus
}
#endif
#endif