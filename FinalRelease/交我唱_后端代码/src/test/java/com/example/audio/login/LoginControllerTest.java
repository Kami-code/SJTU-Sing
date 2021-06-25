package com.example.audio.login;

import com.alibaba.fastjson.JSONObject;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;

import java.io.PrintStream;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@RunWith(SpringRunner.class)
class LoginControllerTest {
    @Autowired
    LoginController login;


//    @BeforeEach
//    public void before() throws Exception {
//        contro=new LoginController();
//    }

    @Test
    void userLogin() {
        int result;
        result = login.userLogin("12345","1",2);
        Assertions.assertEquals(5,result,"注销出错");
        result = login.userLogin("12345","1",2);
        Assertions.assertEquals(6,result,"注销出错");
        result = login.userLogin("12345","1",0);
        Assertions.assertEquals(2,result,"注册出错");
        result = login.userLogin("2333abc","2333abc",0);
        Assertions.assertEquals(4,result,"注册出错");
        result = login.userLogin("2333abc","2333abc",1);
        Assertions.assertEquals(1,result,"登录出错");
        result = login.userLogin("2333abc","2333abcd",1);
        Assertions.assertEquals(3,result,"登录出错");
        result = login.userLogin("2333abcd","2333abc",1);
        Assertions.assertEquals(3,result,"登录出错");
        result = login.userLogin("1","1",-1);
        Assertions.assertEquals(7,result,"模式出错");
    }

    @Test
    void uploadInfo() {
        int result;
        result = login.uploadInfo("2333abc","1","nick","2000/1/1","user for test");
        Assertions.assertEquals(1,result,"上传用户信息出错");
        result = login.uploadInfo("2333abcde","1","nick","2000/1/1","user for test");
        Assertions.assertEquals(0,result,"上传用户信息出错");
    }

    @Test
    void downloadInfo() {
//        int result;
        JSONObject jsonObject = login.downloadInfo("2333abc");
        Assertions.assertNotNull(jsonObject);
        JSONObject userinfo = login.downloadInfo("qiguai");
        JSONObject empty = new JSONObject();
        assertEquals(empty,userinfo,"获取信息出错");
    }

    @Test
    void production() {

    }
}
