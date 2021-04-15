package com.example.audio.jsonReceive;

import com.alibaba.fastjson.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;


@RestController
public class jsonController {

//    @GetMapping(value = "/mapping")
//    public String testMap(){
//        return "mapping work!";
//    }

//    @RequestMapping(value = "/json", method = RequestMethod.GET, produces = "application/x-www-form-urlencoded")
//    public String getByJSON() {
//        String str="111";
//        return str;
//    }

    @RequestMapping(value = "/postUser", method = RequestMethod.POST)
    public String getUser(@RequestBody User o) {
        /*@RequestBody JSONObject o
          @RequestParameter("name") String name,@RequestParameter("sex") String sex //非json字符串接收方式 eg:get方式;post:form-data or application/x-www-form-urlencoded
          @RequestBody UserIn user //定义一个实体类接收*/
        String name = (String) o.getName();
        String id = (String) o.getId();

        //写入确实可用
//        String cx="write!";
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream("./json.txt");
            fos.write(name.getBytes());//注意字符串编码
            fos.write(id.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        return name + ";" + id;
    }

    public static class User {
        private String name;
        private String id;

        public void setName(String name) {
            this.name = name;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public String getId() {
            return id;
        }

        public User(String name, String id) {
            this.name = name;
            this.id = id;
        }

        public User() {
        }
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
    }



