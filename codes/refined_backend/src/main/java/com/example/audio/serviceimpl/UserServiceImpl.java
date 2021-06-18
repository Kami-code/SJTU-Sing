package com.example.audio.serviceimpl;

import com.example.audio.dao.UserDao;
import com.example.audio.entity.User;
import com.example.audio.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    private UserDao userDao;

    @Override
    public int countUser(){
        return jdbcTemplate.queryForObject("select count(*) from user;", int.class);
//        return 1;
    }

    @Override
    public User LogIn(String username, String password) throws Exception {
        User user = userDao.getUserByName(username);
        if (user == null) {
            throw new Exception("找不到用户！");
        }
        return user;
    }

    @Override
    public List<User> getAll() {
        List<User> result = userDao.getAll();
        System.out.println(result);
        return result;
    }

    @Override
    public User getUserByUsername(String username) {
        return userDao.getUserByName(username);
    }
}
