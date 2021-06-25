package com.example.audio.repository;
import com.example.audio.entity.Record;

import com.example.audio.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {
    public Record getRecordById(Long n);
    public List<Record> getRecordsByUser(User user);
    @Override
    public List<Record> findAll();
    @Query(value = "select record from Record record order by RAND()")
    public List<Record> findRandamRecords();
}
