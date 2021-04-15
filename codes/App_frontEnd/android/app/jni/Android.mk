
# LOCAL_PATH := C:/Users/Lenovo/git/software-engineering-project/codes/App_frontEnd/android/app/jni/AECM
LOCAL_PATH := $(call my-dir)
include $(CLEAR_VARS)
LOCAL_MODULE:= aecm
LOCAL_SRC_FILES := \
$(LOCAL_PATH)/AECM/aecm.cpp\
$(LOCAL_PATH)/AECM/aecm/aecm_core.cc \
$(LOCAL_PATH)/AECM/aecm/aecm_core_c.cc \
$(LOCAL_PATH)/AECM/aecm/complex_fft.c \
$(LOCAL_PATH)/AECM/aecm/delay_estimator.cc \
$(LOCAL_PATH)/AECM/aecm/delay_estimator_wrapper.cc \
$(LOCAL_PATH)/AECM/aecm/echo_control_mobile.cc \
$(LOCAL_PATH)/AECM/aecm/real_fft.c \
$(LOCAL_PATH)/AECM/aecm/ring_buffer.c \
$(LOCAL_PATH)/AECM/aecm/signal_processing_library.cc \

LOCAL_C_INCLUDES += $(LOCAL_PATH)\
    $(LOCAL_PATH)/AECM/aecm/

include $(BUILD_SHARED_LIBRARY)


include $(CLEAR_VARS)
LOCAL_MODULE:= rnnoise
LOCAL_SRC_FILES := \
$(LOCAL_PATH)/RNNoise/RNNoise.cpp\
$(LOCAL_PATH)/RNNoise/src/celt_lpc.c \
$(LOCAL_PATH)/RNNoise/src/denoise.c \
$(LOCAL_PATH)/RNNoise/src/kiss_fft.c \
$(LOCAL_PATH)/RNNoise/src/pitch.c \
$(LOCAL_PATH)/RNNoise/src/rnn.c \
$(LOCAL_PATH)/RNNoise/src/rnn_data.c \
$(LOCAL_PATH)/RNNoise/src/rnn_reader.c \

LOCAL_C_INCLUDES += $(LOCAL_PATH)\
    $(LOCAL_PATH)/RNNoise/src/

include $(BUILD_SHARED_LIBRARY)

include $(CLEAR_VARS)
LOCAL_MODULE:= sox
LOCAL_SRC_FILES := $(LOCAL_PATH)/Sox/sox.cpp\
    $(LOCAL_PATH)/Sox/src/adpcm.c\
    $(LOCAL_PATH)/Sox/src/adpcms.c\
    $(LOCAL_PATH)/Sox/src/aifc-fmt.c\
    $(LOCAL_PATH)/Sox/src/aiff.c\
    $(LOCAL_PATH)/Sox/src/aiff-fmt.c\
    $(LOCAL_PATH)/Sox/src/au.c\
    $(LOCAL_PATH)/Sox/src/avr.c\
    $(LOCAL_PATH)/Sox/src/bend.c\
    $(LOCAL_PATH)/Sox/src/biquad.c\
    $(LOCAL_PATH)/Sox/src/biquads.c\
    $(LOCAL_PATH)/Sox/src/cdr.c\
    $(LOCAL_PATH)/Sox/src/chorus.c\
    $(LOCAL_PATH)/Sox/src/compand.c\
    $(LOCAL_PATH)/Sox/src/compandt.c\
    $(LOCAL_PATH)/Sox/src/contrast.c\
    $(LOCAL_PATH)/Sox/src/cvsd-fmt.c\
    $(LOCAL_PATH)/Sox/src/cvsd.c\
    $(LOCAL_PATH)/Sox/src/dat.c\
    $(LOCAL_PATH)/Sox/src/dcshift.c\
    $(LOCAL_PATH)/Sox/src/delay.c\
    $(LOCAL_PATH)/Sox/src/dft_filter.c\
    $(LOCAL_PATH)/Sox/src/dither.c\
    $(LOCAL_PATH)/Sox/src/divide.c\
    $(LOCAL_PATH)/Sox/src/downsample.c\
    $(LOCAL_PATH)/Sox/src/dvms-fmt.c\
    $(LOCAL_PATH)/Sox/src/earwax.c\
    $(LOCAL_PATH)/Sox/src/echo.c\
    $(LOCAL_PATH)/Sox/src/echos.c\
    $(LOCAL_PATH)/Sox/src/effects_i_dsp.c\
    $(LOCAL_PATH)/Sox/src/effects_i.c\
    $(LOCAL_PATH)/Sox/src/effects.c\
    $(LOCAL_PATH)/Sox/src/f4-fmt.c\
    $(LOCAL_PATH)/Sox/src/f8-fmt.c\
    $(LOCAL_PATH)/Sox/src/fade.c\
    $(LOCAL_PATH)/Sox/src/fft4g.c\
    $(LOCAL_PATH)/Sox/src/fir.c\
    $(LOCAL_PATH)/Sox/src/firfit.c\
    $(LOCAL_PATH)/Sox/src/flanger.c\
    $(LOCAL_PATH)/Sox/src/formats_i.c\
    $(LOCAL_PATH)/Sox/src/formats.c\
    $(LOCAL_PATH)/Sox/src/g72x.c\
    $(LOCAL_PATH)/Sox/src/g711.c\
    $(LOCAL_PATH)/Sox/src/g721.c\
    $(LOCAL_PATH)/Sox/src/g723_24.c\
    $(LOCAL_PATH)/Sox/src/g723_40.c\
    $(LOCAL_PATH)/Sox/src/gain.c\
    $(LOCAL_PATH)/Sox/src/getopt.c\
    $(LOCAL_PATH)/Sox/src/gsrt.c\
    $(LOCAL_PATH)/Sox/src/hcom.c\
    $(LOCAL_PATH)/Sox/src/hilbert.c\
    $(LOCAL_PATH)/Sox/src/htk.c\
    $(LOCAL_PATH)/Sox/src/id3.c\
    $(LOCAL_PATH)/Sox/src/ima_rw.c\
    $(LOCAL_PATH)/Sox/src/ima-fmt.c\
    $(LOCAL_PATH)/Sox/src/input.c\
    $(LOCAL_PATH)/Sox/src/la-fmt.c\
    $(LOCAL_PATH)/Sox/src/ladspa.c\
    $(LOCAL_PATH)/Sox/src/libsox_i.c\
    $(LOCAL_PATH)/Sox/src/loudness.c\
    $(LOCAL_PATH)/Sox/src/lu-fmt.c\
    $(LOCAL_PATH)/Sox/src/maud.c\
    $(LOCAL_PATH)/Sox/src/mcompand.c\
    $(LOCAL_PATH)/Sox/src/mp3.c\
    $(LOCAL_PATH)/Sox/src/noiseprof.c\
    $(LOCAL_PATH)/Sox/src/noisered.c\
    $(LOCAL_PATH)/Sox/src/nulfile.c\
    $(LOCAL_PATH)/Sox/src/output.c\
    $(LOCAL_PATH)/Sox/src/overdrive.c\
    $(LOCAL_PATH)/Sox/src/pad.c\
    $(LOCAL_PATH)/Sox/src/phaser.c\
    $(LOCAL_PATH)/Sox/src/prc.c\
    $(LOCAL_PATH)/Sox/src/rate.c\
    $(LOCAL_PATH)/Sox/src/raw-fmt.c\
    $(LOCAL_PATH)/Sox/src/raw.c\
    $(LOCAL_PATH)/Sox/src/remix.c\
    $(LOCAL_PATH)/Sox/src/repeat.c\
    $(LOCAL_PATH)/Sox/src/reverb.c\
    $(LOCAL_PATH)/Sox/src/reverse.c\
    $(LOCAL_PATH)/Sox/src/s1-fmt.c\
    $(LOCAL_PATH)/Sox/src/s2-fmt.c\
    $(LOCAL_PATH)/Sox/src/s3-fmt.c\
    $(LOCAL_PATH)/Sox/src/s4-fmt.c\
    $(LOCAL_PATH)/Sox/src/sf.c\
    $(LOCAL_PATH)/Sox/src/silence.c\
    $(LOCAL_PATH)/Sox/src/sinc.c\
    $(LOCAL_PATH)/Sox/src/skeleff.c\
    $(LOCAL_PATH)/Sox/src/skelform.c\
    $(LOCAL_PATH)/Sox/src/smp.c\
    $(LOCAL_PATH)/Sox/src/libsox.c\
    $(LOCAL_PATH)/Sox/src/sounder.c\
    $(LOCAL_PATH)/Sox/src/soundtool.c\
    $(LOCAL_PATH)/Sox/src/sox-fmt.c\
    $(LOCAL_PATH)/Sox/src/sox.c\
    $(LOCAL_PATH)/Sox/src/speed.c\
    $(LOCAL_PATH)/Sox/src/speexdsp.c\
    $(LOCAL_PATH)/Sox/src/sphere.c\
    $(LOCAL_PATH)/Sox/src/splice.c\
    $(LOCAL_PATH)/Sox/src/stat.c\
    $(LOCAL_PATH)/Sox/src/stats.c\
    $(LOCAL_PATH)/Sox/src/stretch.c\
    $(LOCAL_PATH)/Sox/src/swap.c\
    $(LOCAL_PATH)/Sox/src/synth.c\
    $(LOCAL_PATH)/Sox/src/tempo.c\
    $(LOCAL_PATH)/Sox/src/tremolo.c\
    $(LOCAL_PATH)/Sox/src/trim.c\
    $(LOCAL_PATH)/Sox/src/tx16w.c\
    $(LOCAL_PATH)/Sox/src/u1-fmt.c\
    $(LOCAL_PATH)/Sox/src/u2-fmt.c\
    $(LOCAL_PATH)/Sox/src/u3-fmt.c\
    $(LOCAL_PATH)/Sox/src/u4-fmt.c\
    $(LOCAL_PATH)/Sox/src/ul-fmt.c\
    $(LOCAL_PATH)/Sox/src/upsample.c\
    $(LOCAL_PATH)/Sox/src/util.c\
    $(LOCAL_PATH)/Sox/src/vad.c\
    $(LOCAL_PATH)/Sox/src/voc.c\
    $(LOCAL_PATH)/Sox/src/vol.c\
    $(LOCAL_PATH)/Sox/src/vox-fmt.c\
    $(LOCAL_PATH)/Sox/src/vox.c\
    $(LOCAL_PATH)/Sox/src/wav.c\
    $(LOCAL_PATH)/Sox/src/wve.c\
    $(LOCAL_PATH)/Sox/src/xa.c\
    $(LOCAL_PATH)/Sox/src/xmalloc.c\

    # $(LOCAL_PATH)/Sox/src/alsa.c\
        # $(LOCAL_PATH)/Sox/src/ao.c\
            # $(LOCAL_PATH)/Sox/src/coreaudio.c\
                # $(LOCAL_PATH)/Sox/src/flac.c\
                    # $(LOCAL_PATH)/Sox/src/gsm.c\
                        # $(LOCAL_PATH)/Sox/src/lpc10.c\
                            # $(LOCAL_PATH)/Sox/src/opus.c\
                                $(LOCAL_PATH)/Sox/src/oss.c\
    $(LOCAL_PATH)/Sox/src/pulseaudio.c\
    $(LOCAL_PATH)/Sox/src/sndfile.c\
    $(LOCAL_PATH)/Sox/src/sndio.c\
    $(LOCAL_PATH)/Sox/src/spectrogram.c\
    $(LOCAL_PATH)/Sox/src/sunaudio.c\
    $(LOCAL_PATH)/Sox/src/vorbis.c\
    $(LOCAL_PATH)/Sox/src/waveaudio.c\
    $(LOCAL_PATH)/Sox/src/win32/glob.c\
        $(LOCAL_PATH)/Sox/src/amr-nb.c\
    $(LOCAL_PATH)/Sox/src/amr-wb.c\
    $(LOCAL_PATH)/Sox/src/caf.c\
    $(LOCAL_PATH)/Sox/src/fap.c\
    $(LOCAL_PATH)/Sox/src/mat4.c\
    $(LOCAL_PATH)/Sox/src/mat5.c\
    $(LOCAL_PATH)/Sox/src/paf.c\
    $(LOCAL_PATH)/Sox/src/pvf.c\
    $(LOCAL_PATH)/Sox/src/sd2.c\
    $(LOCAL_PATH)/Sox/src/w64.c\
    $(LOCAL_PATH)/Sox/src/xi.c\




LOCAL_C_INCLUDES += $(LOCAL_PATH)/Sox/\
    $(LOCAL_PATH)/Sox/src/\
    $(LOCAL_PATH)/Sox/android/armv7a/include/\

LOCAL_LDLIBS := -L$(SYSROOT)/usr/lib -llog



# LOCAL_LDLIBS := $(LOCAL_PATH)/Sox/android/armv7a/lib/libsox.so \
# $(LOCAL_PATH)/Sox/android/armv8a/lib/libsox.so \
# $(LOCAL_PATH)/Sox/android/x86/lib/libsox.so \
# $(LOCAL_PATH)/Sox/android/x86-64/lib/libsox.so \

# include $(PREBUILT_SHARED_LIBRARY)
include $(BUILD_SHARED_LIBRARY)