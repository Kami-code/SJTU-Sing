package com.example.audio.dao;

import com.example.audio.entity.User;

import java.util.List;

public interface UserDao {
    User getUserByName(String username);
    List<User> getAll();

}
