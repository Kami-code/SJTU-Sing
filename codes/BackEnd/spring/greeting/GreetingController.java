package com.example.audio.greeting;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/greeting")
    public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {

        //写入确实可用
//        String cx="write!";
//        FileOutputStream fos = null;
//        try {
//            fos = new FileOutputStream("./json.txt");
//            fos.write(cx.getBytes());//注意字符串编码
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

        return new Greeting(counter.incrementAndGet(), String.format(template, name));
    }

//    @GetMapping("/greeting")
//    public String greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
//        return "111";
//    }
}

