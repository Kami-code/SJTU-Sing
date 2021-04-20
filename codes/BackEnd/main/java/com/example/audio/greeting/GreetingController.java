package com.example.audio.greeting;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.concurrent.atomic.AtomicLong;

import com.example.audio.jsonReceive.jsonController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
public class GreetingController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    private static Logger getUser = LoggerFactory.getLogger(jsonController.class);
    @RequestMapping(value = "/greeting",method = RequestMethod.POST)
    public Greeting greeting(@RequestParam(value = "name", defaultValue = "defaultname") String name,@RequestParam(value = "id", defaultValue = "defaultid") String id) {

        getUser.info("*** login "+"name:"+name+" id:"+id+"\n");

        return new Greeting(counter.incrementAndGet(), String.format(template, name));
    }

}

//写入确实可用
//        String cx="write!";
//        FileOutputStream fos = null;
//        try {
//            fos = new FileOutputStream("./json.txt");
//            fos.write(name.getBytes());//注意字符串编码
//            fos.write(id.getBytes());
//        } catch (IOException e) {
//            e.printStackTrace();
//        } finally {
//            if (fos != null) {
//                try {
//                    fos.close();
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//            }
//        }
