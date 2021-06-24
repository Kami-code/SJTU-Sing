package com.example.audio.daoimpl;

import com.example.audio.dao.RecordDao;
import com.example.audio.entity.Record;
import com.example.audio.entity.User;
import com.example.audio.repository.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RecordDaoImpl implements RecordDao {
    @Autowired
    private RecordRepository recordRepository;

    @Override
    public Record save(Record record) {
        return recordRepository.save(record);
    }

    @Override
    public List<Record> getRecordsByUser(User user) {
        return recordRepository.getRecordsByUser(user);
    }

    @Override
    public Record getRecordById(Long id) {
        return recordRepository.getRecordById(id);
    }

    @Override
    public List<Record> getRandomRemarks() {
        List<Record> recordList = recordRepository.findRandamRecords();
        if (recordList.size() <= 10) {
            return recordList;
        }
        else {
            return recordList.subList(0, 10);
        }
    }

}
