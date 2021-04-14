package com.example.audio.jsonReceive;

import com.alibaba.fastjson.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.io.FileOutputStream;
import java.io.IOException;

@RestController
public class jsonController {
//    @ResponseBody
    @RequestMapping(value = "/json", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public String getByJSON(@RequestBody JSONObject jsonParam) {
        // 直接将json信息打印出来
        System.out.println(jsonParam.toJSONString());

        //将获取的转为字符串后写入文件
        String cx = jsonParam.toJSONString();
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream("./a.txt");
            fos.write(cx.getBytes());//注意字符串编码
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

        // 将获取的json数据封装一层，然后在给返回
        JSONObject result = new JSONObject();
        result.put("msg", "ok");
        result.put("method", "json");
        result.put("data", jsonParam);

        return result.toJSONString();
    }
}


