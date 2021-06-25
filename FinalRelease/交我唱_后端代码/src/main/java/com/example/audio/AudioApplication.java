package com.example.audio;

import com.example.audio.repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;


//@EnableAutoConfiguration // 作用: 开启自动配置 初始化spring环境 springmvc环境
@EnableJpaRepositories(basePackageClasses = UserRepository.class)
@EnableWebMvc
//@ComponentScan // 作用: 用来扫描相关注解 扫描范围 当前入口类所在的包及子包(com.bookstore及其子包)
@SpringBootApplication
public class AudioApplication {

    public static void main(String[] args) {
        SpringApplication.run(AudioApplication.class, args);
    }

}
