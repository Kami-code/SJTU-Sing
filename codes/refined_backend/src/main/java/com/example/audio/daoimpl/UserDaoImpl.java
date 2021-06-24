package com.example.audio.daoimpl;

import com.example.audio.repository.UserRepository;
import com.example.audio.dao.UserDao;
import com.example.audio.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User getUserByName(String name) {
        System.out.println("name = " + name);
        User user = userRepository.getUserByName(name);
        return user;
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }


}
