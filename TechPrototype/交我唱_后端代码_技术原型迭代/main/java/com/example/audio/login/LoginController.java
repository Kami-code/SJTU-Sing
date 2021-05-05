package com.example.audio.login;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 *     mode=0是注册请求，1是登录请求
 *
 *     返回值：
 *     0: 初始值
 *     1：登录成功
 *     2：注册成功
 *     3：账户或密码错误
 *     4：用户名已存在
 *     5：模式错误
 */

@RestController
public class LoginController {
    final Logger login = LoggerFactory.getLogger(LoginController.class);
    @Resource
    JdbcTemplate jdbcTemplate;

    /**
     * 用户登录和注册
     * @param name 用户名
     * @param password 密码
     * @param mode 请求模式选择
     * @return int 返回操作结果
     */
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public int userLogin(@RequestParam String name, @RequestParam String password, @RequestParam int mode) {
        if (mode == 0) {
            int exit = jdbcTemplate.queryForObject("select count(*) from user where name = \""+name+"\";", int.class);
            if(exit>0){
                login.info("***account exit:"+exit+"\n");
                return 4;
            }else{
                jdbcTemplate.execute("insert into user values(\""+name+"\",\""+password+"\");");
                login.info("***regist!name:"+name+"\n");
                return 2;
            }
        }

        if (mode == 1) {
            int match = jdbcTemplate.queryForObject("select count(*) from user where name = \""+name+"\" and password = \""+password+"\";", int.class);
            if(match>0){
                login.info("***login successfully!\n");
                return 1;
            }else {
                return 3;
            }
        }

        login.info("***wrong mode!\n");
        return 5;
    }

}
