LOCAL_PATH := $(call my-dir)/AECM
# LOCAL_PATH := C:/Users/Lenovo/git/software-engineering-project/codes/App_frontEnd/android/app/jni/AECM

include $(CLEAR_VARS)

LOCAL_MODULE:= aecm

LOCAL_SRC_FILES := \
$(LOCAL_PATH)/aecm.cpp\
$(LOCAL_PATH)/aecm/aecm_core.cc \
$(LOCAL_PATH)/aecm/aecm_core_c.cc \
$(LOCAL_PATH)/aecm/aecm_core_mips.cc \
$(LOCAL_PATH)/aecm/aecm_core_neon.cc \
$(LOCAL_PATH)/aecm/complex_fft.c \
$(LOCAL_PATH)/aecm/delay_estimator.cc \
$(LOCAL_PATH)/aecm/delay_estimator_wrapper.cc \
$(LOCAL_PATH)/aecm/echo_control_mobile.cc \
$(LOCAL_PATH)/aecm/real_fft.c \
$(LOCAL_PATH)/aecm/ring_buffer.c \
$(LOCAL_PATH)/aecm/signal_processing_library.cc \

LOCAL_C_INCLUDES += $(LOCAL_PATH)\
    $(LOCAL_PATH)/aecm/

include $(BUILD_SHARED_LIBRARY)