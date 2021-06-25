package com.example.audio.login;

import com.alibaba.fastjson.JSONObject;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@RunWith(SpringRunner.class)
class LoginControllerTest {
    @Autowired
    LoginController login;

    @Test
    void userLogin() {
        int result;
        result = login.userLogin("12345","1",2);
        assertEquals(5,result,"注销出错");
        result = login.userLogin("12345","1",2);
        assertEquals(6,result,"注销出错");
        result = login.userLogin("12345","1",0);
        assertEquals(2,result,"注册出错");
        result = login.userLogin("2333abc","2333abc",0);
        assertEquals(4,result,"注册出错");
        result = login.userLogin("2333abc","2333abc",1);
        assertEquals(1,result,"登录出错");
        result = login.userLogin("2333abc","2333abcd",1);
        assertEquals(3,result,"登录出错");
        result = login.userLogin("2333abcd","2333abc",1);
        assertEquals(3,result,"登录出错");
        result = login.userLogin("1","1",-1);
        assertEquals(7,result,"模式出错");
    }

    @Test
    void uploadInfo() {
        int result;
        result = login.uploadInfo("2333abc","1","nick","2000/1/1","user for test");
        assertEquals(1,result,"上传用户信息出错");
        result = login.uploadInfo("2333abcde","1","nick","2000/1/1","user for test");
        assertEquals(0,result,"上传用户信息出错");
    }

    @Test
    void downloadInfo() {
        JSONObject userinfo1 = login.downloadInfo("tim");
        assertEquals("tim",userinfo1.getString("username"),"获取用户信息出错");
        assertEquals("1",userinfo1.getString("gender"),"获取用户信息出错");
        assertEquals("nick",userinfo1.getString("nickname"),"获取用户信息出错");

        JSONObject userinfo2 = login.downloadInfo("qiguai");
        JSONObject empty = new JSONObject();
        assertEquals(empty,userinfo2,"获取用户信息出错");
    }

}
