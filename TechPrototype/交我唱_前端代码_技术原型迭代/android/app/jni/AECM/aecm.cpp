#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

#define DR_WAV_IMPLEMENTATION

#include "dr_wav.h"
#include "timing.h"

#ifndef nullptr
#define nullptr 0
#endif

#ifndef MIN
#define  MIN(A, B)        ((A) < (B) ? (A) : (B))
#endif

#include "aecm/echo_control_mobile.h"
#include "com_kgeapp_aecm_jni_AECM.h"

int16_t *wavRead_int16(char *filename, uint32_t *sampleRate, uint64_t *totalSampleCount) {
    unsigned int channels;
    int16_t *buffer = drwav_open_file_and_read_pcm_frames_s16(filename, &channels, sampleRate, totalSampleCount, NULL);
    if (buffer == nullptr) {
        printf("读取wav文件失败.");
    }
    //仅仅处理单通道音频
    if (channels != 1) {
        drwav_free(buffer, NULL);
        buffer = nullptr;
        *sampleRate = 0;
        *totalSampleCount = 0;
    }
    return buffer;
}

int wavWrite_int16(char *filename, int16_t *buffer, size_t sampleRate, size_t totalSampleCount) {
    drwav wav;
    drwav_data_format format = {};
    format.container = drwav_container_riff;     // <-- drwav_container_riff = normal WAV files, drwav_container_w64 = Sony Wave64.
    format.format = DR_WAVE_FORMAT_PCM;          // <-- Any of the DR_WAVE_FORMAT_* codes.
    format.channels = 1;
    format.sampleRate = sampleRate;
    format.bitsPerSample = 16;
    drwav_init_file_write(&wav, filename, &format, NULL);
    drwav_uint64 framesWritten = drwav_write_pcm_frames(&wav, totalSampleCount, buffer);
    drwav_uninit(&wav);
    if (framesWritten != totalSampleCount) {
        return 1;
    }
    return 0;
}

int aecProcess(int16_t *far_frame, int16_t *near_frame, uint32_t sampleRate, size_t samplesCount, int16_t nMode,
               int16_t msInSndCardBuf) {
    if (near_frame == nullptr) return 11;
    if (far_frame == nullptr) return 12;
    if (samplesCount == 0) return 13;
    AecmConfig config;
    config.cngMode = AecmTrue;
    config.echoMode = nMode;// 0, 1, 2, 3 (default), 4
    size_t samples = MIN(160, sampleRate / 100);
    if (samples == 0)
        return 14;
    const int maxSamples = 160;
    int16_t *near_input = near_frame;
    int16_t *far_input = far_frame;
    size_t nCount = (samplesCount / samples);
    void *aecmInst = WebRtcAecm_Create();
    if (aecmInst == NULL) return 15;
    int status = WebRtcAecm_Init(aecmInst, sampleRate);//8000 or 16000 Sample rate
    if (status != 0) {
        printf("WebRtcAecm_Init fail\n");
        WebRtcAecm_Free(aecmInst);
        return 16;
    }
    status = WebRtcAecm_set_config(aecmInst, config);
    if (status != 0) {
        printf("WebRtcAecm_set_config fail\n");
        WebRtcAecm_Free(aecmInst);
        return 17;
    }

    int16_t out_buffer[maxSamples];
    for (size_t i = 0; i < nCount; i++) {
        if (WebRtcAecm_BufferFarend(aecmInst, far_input, samples) != 0) {
            printf("WebRtcAecm_BufferFarend() failed.");
            WebRtcAecm_Free(aecmInst);
            return 18;
        }
        int nRet = WebRtcAecm_Process(aecmInst, near_input, NULL, out_buffer, samples, msInSndCardBuf);

        if (nRet != 0) {
            printf("failed in WebRtcAecm_Process\n");
            WebRtcAecm_Free(aecmInst);
            return 19;
        }
        memcpy(near_input, out_buffer, samples * sizeof(int16_t));
        near_input += samples;
        far_input += samples;
    }
    WebRtcAecm_Free(aecmInst);
    return 0;
}

int AECM(char *near_file, char *far_file, char *out_file) {
    //音频采样率
    uint32_t sampleRate = 0;
    uint64_t inSampleCount = 0;
    uint32_t ref_sampleRate = 0;
    uint64_t ref_inSampleCount = 0;
    int16_t *near_frame = wavRead_int16(near_file, &sampleRate, &inSampleCount);
    int16_t *far_frame = wavRead_int16(far_file, &ref_sampleRate, &ref_inSampleCount);
    if ((near_frame == nullptr || far_frame == nullptr)) {
        if (near_frame) free(near_frame);
        if (far_frame) free(far_frame);
        return 1;
    }
    //如果加载成功
    int16_t echoMode = 3;// 0, 1, 2, 3 (default), 4
    int16_t msInSndCardBuf = 40;
    double startTime = now();
    int return_num = 0;
    if((return_num=aecProcess(far_frame, near_frame, sampleRate, inSampleCount, echoMode, msInSndCardBuf))>0){
        return return_num;
    };
    double elapsed_time = calcElapsed(startTime, now());
    printf("time interval: %d ms\n ", (int) (elapsed_time * 1000));
    wavWrite_int16(out_file, near_frame, sampleRate, inSampleCount);
    free(near_frame);
    free(far_frame);
    return 0;
}

JNIEXPORT jint JNICALL Java_com_kgeapp_aecm_jni_AECM_runAECM(JNIEnv * env, jobject obj, jstring nearFile, jstring farFile, jstring outFile){
    jclass CLASS = env->GetObjectClass(obj);
    //return 0;
    const char *NearFile = env->GetStringUTFChars(nearFile, JNI_FALSE);
    const char *FarFile = env->GetStringUTFChars(farFile, JNI_FALSE);
    const char *OutFile = env->GetStringUTFChars(outFile, JNI_FALSE);

    char *near_file = new char[strlen(NearFile)+1];
    char *far_file = new char[strlen(FarFile)+1];
    char *out_file = new char[strlen(OutFile)+1];

    strcpy(near_file, NearFile);
    strcpy(far_file, FarFile);
    strcpy(out_file, OutFile);

    printf("WebRTC Acoustic Echo Canceller for Mobile\n");

    
    return AECM(near_file, far_file, out_file);
};







