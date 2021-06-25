package com.example.audio.controller;

import com.example.audio.entity.User;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@RunWith(SpringRunner.class)
class UserControllerTest {

    @Autowired
    UserController usercon;

    @Test
    void userLogin() {
        try {
            User userlogin=usercon.userLogin("tom","2333");
            assertEquals("tom",userlogin.getName(),"userlogin出错");
            assertEquals("2333",userlogin.getPassword(),"userlogin出错");
            assertEquals("0",userlogin.getGender(),"userlogin出错");
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @Test
    void getAll() {
        List<User> listuser=usercon.getAll();
        assertEquals("tim",listuser.get(0).getName(),"getall出错");
        assertEquals("nick",listuser.get(0).getNickname(),"getall出错");
    }

    @Test
    void getRecords() {
        User user=usercon.getRecords("2333abc");
        assertEquals("user for test",user.getDescription(),"getRecords出错");
        assertEquals("2000/1/1",user.getBirthday(),"getRecords出错");
    }

}