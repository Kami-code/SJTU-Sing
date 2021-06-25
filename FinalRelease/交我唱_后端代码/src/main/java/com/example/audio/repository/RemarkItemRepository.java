package com.example.audio.repository;

import com.example.audio.entity.Record;
import com.example.audio.entity.Remark_item;
import com.example.audio.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RemarkItemRepository extends CrudRepository<Remark_item, Long> {
    public Remark_item getRecordById(Long n);
    public List<Remark_item> getRecordsByRecord(Record record);
    @Override
    public List<Remark_item> findAll();
}
