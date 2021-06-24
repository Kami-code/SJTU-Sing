package com.example.audio.login;

import com.alibaba.fastjson.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

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
                jdbcTemplate.execute("insert into user(name,password) values(\""+name+"\",\""+password+"\");");
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

    @RequestMapping(value = "/uploadinfo",method = RequestMethod.POST)
    public int uploadInfo(@RequestParam("username") String username,@RequestParam("gender") String gender,@RequestParam("nickname") String nickname,@RequestParam("description") String description){
        int exit = jdbcTemplate.queryForObject("select count(*) from user where name = \""+username+"\";", int.class);
        if(exit>0){
            jdbcTemplate.execute("update user set nickname=\""+nickname+"\",description=\""+description+"\" where name=\""+username+"\";");
            login.info("***userinfo added:username="+username+" nickname="+nickname+" description="+description+"\n");
            return 1;
        }else{
            login.info("***no such username: "+username+"\n");
            return 0;
        }
    }

    @RequestMapping(value = "/downloadinfo")
    public JSONObject downloadInfo(@RequestParam("username") String username){
        JSONObject jsonObject = new JSONObject();
        int exit = jdbcTemplate.queryForObject("select count(*) from user where name = \""+username+"\";", int.class);
        if(exit==0){
            login.info("***downloadinfo no such username: "+username+"\n");
            return jsonObject;
        }

        int gender=jdbcTemplate.queryForObject("select gender from user where name=\""+username+"\";",int.class);
        String birthday=jdbcTemplate.queryForObject("select birthday from user where name=\""+username+"\";",String.class);
        String nickname=jdbcTemplate.queryForObject("select nickname from user where name=\""+username+"\";",String.class);
        String description=jdbcTemplate.queryForObject("select description from user where name=\""+username+"\";",String.class);
        jsonObject.put("username",username);
        jsonObject.put("gender",gender);
        jsonObject.put("birthday",birthday);
        jsonObject.put("nickname",nickname);
        jsonObject.put("description",description);
        return jsonObject;
    }

    @RequestMapping(value = "/production",method = RequestMethod.POST)
    public List<Integer> userInfo(@RequestParam("username") String username){
        List<Integer> songlist=jdbcTemplate.query("select songid from song where username=\"" + username + "\";", new RowMapper<Integer>() {
            @Override
            public Integer mapRow(ResultSet resultSet, int i) throws SQLException {
                return resultSet.getInt(1);
            }
        });
        return songlist;
//        int exit = jdbcTemplate.queryForObject("select count(*) from song where username = \""+username+"\";", int.class);
//        if(exit>0){
//            Integer songlist=jdbcTemplate.queryForObject("select songid from song where username=\""+username+"\";", int.class);
////            jdbcTemplate.execute("update user set nickname=\""+nickname+"\",description=\""+description+"\" where name=\""+username+"\";");
//            login.info("***userinfo download:username="+username+"\n");
//            return songlist;
//        }else{
//            login.info("***no such username: "+username+"\n");
//            return null;
//        }
//        return 1;
    }

}
