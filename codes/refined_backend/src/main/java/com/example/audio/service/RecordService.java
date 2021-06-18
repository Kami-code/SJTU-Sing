package com.example.audio.service;

import com.example.audio.entity.Record;
import com.example.audio.entity.User;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

public interface RecordService {
    Record save(MultipartFile videoData, Long songid, String username, BigDecimal score) throws Exception;
    List<Record> getRecordsByUser(String username);
    Record getRecordById(Long id);
    Record addLikeById(Long id);
    Record addRemarkById(Long id, String remark_name, String remark);
    List<Record> getRandomRemarks();
}
