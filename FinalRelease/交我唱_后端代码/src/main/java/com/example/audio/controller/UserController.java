package com.example.audio.controller;

import com.example.audio.entity.User;
import com.example.audio.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class UserController {
    @Autowired
    UserService userService;
    /**
     * 用户登录
     */
    @RequestMapping(value = "/user/login",method = RequestMethod.POST)
    @ResponseBody public User userLogin(@RequestParam String name, @RequestParam String password) throws Exception {
        User user = userService.LogIn(name, password);
        return user;
    }

    @RequestMapping(value = "/user/all",method = RequestMethod.GET)
    @ResponseBody public List<User> getAll() {
        List<User> userList = userService.getAll();
        return userList;
    }


    @RequestMapping(value = "/user/{str}", method = RequestMethod.GET)
    @ResponseBody
    public User getRecords(@PathVariable("str") String username) {
        return userService.getUserByUsername(username);
    }
}
