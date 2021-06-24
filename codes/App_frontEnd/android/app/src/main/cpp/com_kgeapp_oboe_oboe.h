/* DO NOT EDIT THIS FILE - it is machine generated */
#include <jni.h>
/* Header for class com_kgeapp_oboe_oboe */

#ifndef _Included_com_kgeapp_oboe_oboe
#define _Included_com_kgeapp_oboe_oboe
#ifdef __cplusplus
extern "C" {
#endif
/*
 * Class:     com_kgeapp_oboe_oboe
 * Method:    create
 * Signature: ()Z
 */
JNIEXPORT jboolean JNICALL Java_com_kgeapp_oboe_oboe_create
  (JNIEnv *, jclass);

/*
 * Class:     com_kgeapp_oboe_oboe
 * Method:    isAAudioRecommended
 * Signature: ()Z
 */
JNIEXPORT jboolean JNICALL Java_com_kgeapp_oboe_oboe_isAAudioRecommended
  (JNIEnv *, jclass);

/*
 * Class:     com_kgeapp_oboe_oboe
 * Method:    setAPI
 * Signature: (I)Z
 */
JNIEXPORT jboolean JNICALL Java_com_kgeapp_oboe_oboe_setAPI
  (JNIEnv *, jclass, jint);

/*
 * Class:     com_kgeapp_oboe_oboe
 * Method:    setEffectOn
 * Signature: (Z)Z
 */
JNIEXPORT jboolean JNICALL Java_com_kgeapp_oboe_oboe_setEffectOn
  (JNIEnv *, jclass, jboolean);

/*
 * Class:     com_kgeapp_oboe_oboe
 * Method:    setRecordingDeviceId
 * Signature: (I)V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_oboe_oboe_setRecordingDeviceId
  (JNIEnv *, jclass, jint);

/*
 * Class:     com_kgeapp_oboe_oboe
 * Method:    setPlaybackDeviceId
 * Signature: (I)V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_oboe_oboe_setPlaybackDeviceId
  (JNIEnv *, jclass, jint);

/*
 * Class:     com_kgeapp_oboe_oboe
 * Method:    delete
 * Signature: ()V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_oboe_oboe_delete
  (JNIEnv *, jclass);

/*
 * Class:     com_kgeapp_oboe_oboe
 * Method:    getData
 * Signature: ()V
 */
JNIEXPORT void JNICALL Java_com_kgeapp_oboe_oboe_getData
  (JNIEnv *, jclass);

#ifdef __cplusplus
}
#endif
#endif