package com.example.audio.response;

import java.util.HashMap;
import java.util.Map;

import java.util.HashMap;
import java.util.Map;

public class UploadResponse {
    private Map<String, Object> info = null;

    public Map<String, Object> getInfo() {
        return info;
    }
    public void setInfo(Map<String, Object> info) {
        this.info = info;
    }

    public UploadResponse() {
        info = new HashMap<>();
    }

    public UploadResponse setSuccess(String name, Object userDto) {
        info.put("result", "success");
        info.put(name, userDto);
        return this;
    }

    public UploadResponse setFail(String message) {
        info.put("result", "fail");
        info.put("message", message);
        return this;
    }
}
