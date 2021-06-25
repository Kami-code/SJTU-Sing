package com.example.audio.api;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@RunWith(SpringRunner.class)
class ApiControllerTest {
    @Autowired
    ApiController ApiCon;

    @Test
    void blurSearch() {
        try {
            JSONArray searchResult1=ApiCon.blurSearch("快乐星球");
            assertEquals(1839262209,searchResult1.getJSONObject(0).getInteger("id"),"搜歌id出错");
            assertEquals("马也_Crabbit",searchResult1.getJSONObject(0).getString("singer"),"搜歌歌手出错");
            assertEquals("什么是快乐星球",searchResult1.getJSONObject(0).getString("name"),"搜歌歌名出错");
//            assertEquals("http://p1.music.126.net/EV9eKxL9LnznX7TgF6xixA==/109951165912431598.jpg",searchResult.getJSONObject(0).getString("picture"),"搜歌图片出错");

            JSONArray searchResult2=ApiCon.blurSearch("xiaotiaowa");
            assertEquals(1501894113,searchResult2.getJSONObject(1).getInteger("id"),"搜歌id出错");
            assertEquals("浪子兮",searchResult2.getJSONObject(1).getString("singer"),"搜歌歌手出错");
            assertEquals("小跳蛙",searchResult2.getJSONObject(1).getString("name"),"搜歌歌名出错");

            JSONArray searchResult3=ApiCon.blurSearch("!");
            assertEquals(1382881367,searchResult3.getJSONObject(0).getInteger("id"),"搜歌id出错");
            assertEquals("Trippie Redd",searchResult3.getJSONObject(0).getString("singer"),"搜歌歌手出错");
            assertEquals("!",searchResult3.getJSONObject(0).getString("name"),"搜歌歌名出错");

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @Test
    void songGet() {
        try {
            JSONObject songInfo=ApiCon.songGet(371362);
            assertEquals("我们爱音乐(首唱会赠送版)",songInfo.getString("albumname"),"歌曲信息出错");
//            assertEquals("https://m7.music.126.net/20210625015127/cd6657ed580abf04740ee15ca58995e4/ymusic/66e8/2cff/ed6c/0c2d895e739b3f7b48a336a252b858b1.mp3",songInfo.getString("mp3"),"歌曲信息出错");
            assertEquals("青蛙",songInfo.getString("artist"),"歌曲信息出错");
            assertEquals("151.0",songInfo.getString("length"),"歌曲信息出错");
//            assertEquals("https://p2.music.126.net/9xK60ID8ozN56lrjZqpAVQ==/105553116282321.jpg",songInfo.getString("albumpic"),"歌曲信息出错");
            assertEquals("371362",songInfo.getString("id"),"歌曲信息出错");
            assertEquals("小跳蛙",songInfo.getString("songname"),"歌曲信息出错");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}