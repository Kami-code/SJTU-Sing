package com.example.audio.serviceimpl;
//
//import com.example.audio.service.UserService;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//class UserServiceImplTest {
//
//    @Autowired
//    UserService userSer;
//
//    @Test
//    void countUser() {
//        int count=userSer.countUser();
//        Assertions.assertEquals(1,count,"wrong");
//    }
//}


import com.example.audio.service.UserService;
import javafx.application.Application;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;

//
//@SpringBootTest
//@RunWith(SpringRunner.class)
//public class UserServiceImplTest {
//
//    @Autowired
//    private UserService userSerivce;
//
//    @Autowired
//    JdbcTemplate jdbcTemplate;
//
//    @Test
//    public void test() throws Exception {
//        int exit=userSerivce.countUser();
//        System.out.println("result!");
//        System.out.println(exit);
//    }
//
//}
