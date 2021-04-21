package com.example.audio.dataBase;

import com.example.audio.greeting.Greeting;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class dataBase {

    @Resource
    JdbcTemplate jdbcTemplate;

    private static Logger getDB = LoggerFactory.getLogger(dataBase.class);
    @RequestMapping(value = "/DB",method = RequestMethod.POST)
    public String DB() {
        Long aLong = jdbcTemplate.queryForObject("select count(*) from user", Long.class);
//        log.info("记录总数：{}",aLong);
        getDB.info("记录总数："+(aLong.toString()));
        return aLong.toString();
    }
}
