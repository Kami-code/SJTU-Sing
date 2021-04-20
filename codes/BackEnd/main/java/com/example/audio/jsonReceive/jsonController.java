package com.example.audio.jsonReceive;

import com.alibaba.fastjson.JSONObject;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;


@RestController
public class jsonController {
    private static Logger logger = LoggerFactory.getLogger(jsonController.class);
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public String getUser(@RequestBody ) {
        /*@RequestBody JSONObject o
          @RequestParameter("name") String name,@RequestParameter("sex") String sex //非json字符串接收方式 eg:get方式;post:form-data or application/x-www-form-urlencoded
          @RequestBody UserIn user //定义一个实体类接收*/
//        String name = (String) o.getName();
//        String id = (String) o.getId();
//        logger.info("login:"+name+id+"\n");
//
//        return name + ";" + id;
    }

//    public static class User {
//        private String name;
//        private String id;
//
//        public void setName(String name) {
//            this.name = name;
//        }
//
//        public void setId(String id) {
//            this.id = id;
//        }
//
//        public String getName() {
//            return name;
//        }
//
//        public String getId() {
//            return id;
//        }
//
//        public User(String name, String id) {
//            this.name = name;
//            this.id = id;
//        }
//
//        public User() {
//        }
//    }

    }

//    @ResponseBody
//    @RequestMapping(value = "/json", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
//    public String getByJSON(@RequestBody JSONObject jsonParam) {
//        // 直接将json信息打印出来
//        System.out.println(jsonParam.toJSONString());
//
//        // 将获取的json数据封装一层，然后在给返回
//        JSONObject result = new JSONObject();
//        result.put("msg", "ok");
//        result.put("method", "json");
//        result.put("data", jsonParam);
////        return "did it";
//        return result.toJSONString();

