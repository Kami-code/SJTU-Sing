package com.example.audio.repository;

import com.example.audio.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    public User getUserById(Long n);
    public User getUserByName(String n);
    @Override
    public List<User> findAll();
}
