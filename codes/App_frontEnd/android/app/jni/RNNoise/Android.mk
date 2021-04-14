LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)

LOCAL_MODULE:= rnnoise

LOCAL_SRC_FILES := \
$(LOCAL_PATH)/RNNoise.cpp\
$(LOCAL_PATH)/src/celt_lpc.c \
$(LOCAL_PATH)/src/denoise.c \
$(LOCAL_PATH)/src/kiss_fft.c \
$(LOCAL_PATH)/src/pitch.c \
$(LOCAL_PATH)/src/rnn.c \
$(LOCAL_PATH)/src/rnn_data.c \
$(LOCAL_PATH)/src/rnn_reader.c \

LOCAL_C_INCLUDES += $(LOCAL_PATH)\
    $(LOCAL_PATH)/src/

include $(BUILD_SHARED_LIBRARY)