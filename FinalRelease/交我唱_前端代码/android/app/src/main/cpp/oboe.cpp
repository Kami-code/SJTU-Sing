#include <jni.h>
#include <oboe/Oboe.h>
#include "HelloOboeEngine.h"
#include "logging_macros.h"

extern "C" {

/**
 * Creates the audio engine
 *
 * @return a pointer to the audio engine. This should be passed to other methods
 */
JNIEXPORT jlong JNICALL
Java_com_google_oboe_samples_hellooboe_PlaybackEngine_native_1createEngine(
        JNIEnv *env,
        jclass /*unused*/) {

    // We use std::nothrow so `new` returns a nullptr if the engine creation fails
    HelloOboeEngine *engine = new(std::nothrow) HelloOboeEngine();
    if (engine == nullptr) {
        LOGE("Could not instantiate HelloOboeEngine");
        return 0;
    }
    return reinterpret_cast<jlong>(engine);
}

JNIEXPORT jint JNICALL
Java_com_google_oboe_samples_hellooboe_PlaybackEngine_native_1startEngine(
        JNIEnv *env,
        jclass,
        jlong engineHandle) {

    HelloOboeEngine *engine = reinterpret_cast<HelloOboeEngine *>(engineHandle);
    return static_cast<jint>(engine->start());
}

JNIEXPORT jint JNICALL
Java_com_google_oboe_samples_hellooboe_PlaybackEngine_native_1stopEngine(
        JNIEnv *env,
        jclass,
        jlong engineHandle) {

    HelloOboeEngine *engine = reinterpret_cast<HelloOboeEngine *>(engineHandle);
    return static_cast<jint>(engine->stop());
}

JNIEXPORT void JNICALL
Java_com_google_oboe_samples_hellooboe_PlaybackEngine_native_1deleteEngine(
        JNIEnv *env,
        jclass,
        jlong engineHandle) {

    HelloOboeEngine *engine = reinterpret_cast<HelloOboeEngine *>(engineHandle);
    engine->stop();
    delete engine;
}

JNIEXPORT void JNICALL
Java_com_google_oboe_samples_hellooboe_PlaybackEngine_native_1setToneOn(
        JNIEnv *env,
        jclass,
        jlong engineHandle,
        jboolean isToneOn) {

    HelloOboeEngine *engine = reinterpret_cast<HelloOboeEngine *>(engineHandle);
    if (engine == nullptr) {
        LOGE("Engine handle is invalid, call createHandle() to create a new one");
        return;
    }
    engine->tap(isToneOn);
}

JNIEXPORT void JNICALL
Java_com_google_oboe_samples_hellooboe_PlaybackEngine_native_1setAudioApi(
        JNIEnv *env,
        jclass type,
        jlong engineHandle,
        jint audioApi) {

    HelloOboeEngine *engine = reinterpret_cast<HelloOboeEngine*>(engineHandle);
    if (engine == nullptr) {
        LOGE("Engine handle is invalid, call createHandle() to create a new one");
        return;
    }

    oboe::AudioApi api = static_cast<oboe::AudioApi>(audioApi);
    engine->setAudioApi(api);
}

JNIEXPORT void JNICALL
Java_com_google_oboe_samples_hellooboe_PlaybackEngine_native_1setAudioDeviceId(
        JNIEnv *env,
        jclass,
        jlong engineHandle,
        jint deviceId) {

    HelloOboeEngine *engine = reinterpret_cast<HelloOboeEngine*>(engineHandle);
    if (engine == nullptr) {
        LOGE("Engine handle is invalid, call createHandle() to create a new one");
        return;
    }
    engine->setDeviceId(deviceId);
}

JNIEXPORT void JNICALL
Java_com_google_oboe_samples_hellooboe_PlaybackEngine_native_1setChannelCount(
        JNIEnv *env,
        jclass type,
        jlong engineHandle,
        jint channelCount) {

    HelloOboeEngine *engine = reinterpret_cast<HelloOboeEngine*>(engineHandle);
    if (engine == nullptr) {
        LOGE("Engine handle is invalid, call createHandle() to create a new one");
        return;
    }
    engine->setChannelCount(channelCount);
}

JNIEXPORT void JNICALL
Java_com_google_oboe_samples_hellooboe_PlaybackEngine_native_1setBufferSizeInBursts(
        JNIEnv *env,
        jclass,
        jlong engineHandle,
        jint bufferSizeInBursts) {

    HelloOboeEngine *engine = reinterpret_cast<HelloOboeEngine*>(engineHandle);
    if (engine == nullptr) {
        LOGE("Engine handle is invalid, call createHandle() to create a new one");
        return;
    }
    engine->setBufferSizeInBursts(bufferSizeInBursts);
}


JNIEXPORT jdouble JNICALL
Java_com_google_oboe_samples_hellooboe_PlaybackEngine_native_1getCurrentOutputLatencyMillis(
        JNIEnv *env,
        jclass,
        jlong engineHandle) {

    HelloOboeEngine *engine = reinterpret_cast<HelloOboeEngine*>(engineHandle);
    if (engine == nullptr) {
        LOGE("Engine is null, you must call createEngine before calling this method");
        return static_cast<jdouble>(-1.0);
    }
    return static_cast<jdouble>(engine->getCurrentOutputLatencyMillis());
}

JNIEXPORT jboolean JNICALL
Java_com_google_oboe_samples_hellooboe_PlaybackEngine_native_1isLatencyDetectionSupported(
        JNIEnv *env,
        jclass type,
        jlong engineHandle) {

    HelloOboeEngine *engine = reinterpret_cast<HelloOboeEngine*>(engineHandle);
    if (engine == nullptr) {
        LOGE("Engine is null, you must call createEngine before calling this method");
        return JNI_FALSE;
    }
    return (engine->isLatencyDetectionSupported() ? JNI_TRUE : JNI_FALSE);
}

JNIEXPORT void JNICALL
Java_com_google_oboe_samples_hellooboe_PlaybackEngine_native_1setDefaultStreamValues(
        JNIEnv *env,
        jclass type,
        jint sampleRate,
        jint framesPerBurst) {
    oboe::DefaultStreamValues::SampleRate = (int32_t) sampleRate;
    oboe::DefaultStreamValues::FramesPerBurst = (int32_t) framesPerBurst;
}
} // extern "C"

    oboe::DataCallbackResult onAudioReady(oboe::AudioStream *oboeStream, void *audioData, int32_t numFrames) override {
        float *floatData = (float *) audioData;
        for (int i = 0; i < numFrames; ++i) {
            float sampleValue = kAmplitude * sinf(mPhase);
            for (int j = 0; j < kChannelCount; j++) {
                floatData[i * kChannelCount + j] = sampleValue;
            }
            mPhase += mPhaseIncrement;
            if (mPhase >= kTwoPi) mPhase -= kTwoPi;
        }
        return oboe::DataCallbackResult::Continue;
    }

private:
    std::mutex         mLock;
    std::shared_ptr<oboe::AudioStream> mStream;

    // Stream params
    static int constexpr kChannelCount = 2;
    static int constexpr kSampleRate = 48000;
    // Wave params, these could be instance variables in order to modify at runtime
    static float constexpr kAmplitude = 0.5f;
    static float constexpr kFrequency = 440;
    static float constexpr kPI = M_PI;
    static float constexpr kTwoPi = kPI * 2;
    static double constexpr mPhaseIncrement = kFrequency * kTwoPi / (double) kSampleRate;
    // Keeps track of where the wave is
    float mPhase = 0.0;
};