package com.example.audio.login;

import com.example.audio.greeting.Greeting;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicLong;

@RestController
public class login {
    private static Logger login = LoggerFactory.getLogger(login.class);
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public String greeting(@RequestParam(value = "name", defaultValue = "defaultname") String name, @RequestParam(value = "id", defaultValue = "defaultid") String id) {

        login.info("*** login "+"name:"+name+" id:"+id+"\n");

        return name+id;
    }
}
