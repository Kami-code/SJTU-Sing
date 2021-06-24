package com.example.audio.service;

import com.example.audio.entity.User;

import java.util.List;

public interface UserService {
    int countUser();
    User LogIn(String username, String password) throws Exception;
    List<User> getAll();
    User getUserByUsername(String username);

}
