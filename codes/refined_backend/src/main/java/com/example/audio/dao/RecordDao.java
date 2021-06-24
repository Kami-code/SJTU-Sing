package com.example.audio.dao;

import com.example.audio.entity.Record;
import com.example.audio.entity.User;

import java.util.List;

public interface RecordDao {
    Record save(Record record);
    List<Record> getRecordsByUser(User user);
    Record getRecordById(Long id);
    List<Record> getRandomRemarks();
}
