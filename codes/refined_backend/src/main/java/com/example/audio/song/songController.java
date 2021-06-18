package com.example.audio.song;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.audio.login.LoginController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@CrossOrigin
@RestController
public class songController {
    final Logger songlog = LoggerFactory.getLogger(LoginController.class);
    @Resource
    JdbcTemplate jdbcTemplate;

    @RequestMapping(value = "/production")
    public JSONArray production(@RequestParam("username") String username){
        JSONArray songs_response_array = new JSONArray();
        List<Integer> songlist=jdbcTemplate.query("select productid from song where username=\"" + username + "\";", new RowMapper<Integer>() {
            @Override
            public Integer mapRow(ResultSet resultSet, int i) throws SQLException {
                return resultSet.getInt(1);
            }
        });
        int length=songlist.size();
        for(int i=0;i<length;i++){
            songs_response_array.add(songInfo(songlist.get(i)));
        }
        return songs_response_array;
    }


    public JSONObject songInfo(int productid){
        JSONObject jsonObject = new JSONObject();
        int exist = jdbcTemplate.queryForObject("select count(*) from song where productid = \""+productid+"\";", int.class);
        if(exist==0){
            songlog.info("***downloadinfo no such productid: "+productid+"\n");
            return jsonObject;
        }
//
        String username=jdbcTemplate.queryForObject("select username from song where productid=\""+productid+"\";",String.class);
        int songid=jdbcTemplate.queryForObject("select songid from song where productid=\""+productid+"\";",int.class);
        int likes=jdbcTemplate.queryForObject("select likes from song where productid=\""+productid+"\";",int.class);
        String time=jdbcTemplate.queryForObject("select time from song where productid=\""+productid+"\";",String.class);
        int number=jdbcTemplate.queryForObject("select number from song where productid=\""+productid+"\";",int.class);

        String songname=jdbcTemplate.queryForObject("select name from search where id=\""+songid+"\";",String.class);
        String picture=jdbcTemplate.queryForObject("select picture from search where id=\""+songid+"\";",String.class);
        String singer=jdbcTemplate.queryForObject("select singer from search where id=\""+songid+"\";",String.class);
        String album=jdbcTemplate.queryForObject("select album from search where id=\""+songid+"\";",String.class);

        jsonObject.put("productid",productid);
        jsonObject.put("username",username);
        jsonObject.put("songid",songid);
        jsonObject.put("likes",likes);
        jsonObject.put("time",time);
        jsonObject.put("number",number);

        jsonObject.put("songname",songname);
        jsonObject.put("picture",picture);
        jsonObject.put("singer",singer);
        jsonObject.put("album",album);

        return jsonObject;
    }

}
