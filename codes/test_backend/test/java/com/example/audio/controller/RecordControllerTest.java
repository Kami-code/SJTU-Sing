package com.example.audio.controller;

import org.apache.http.entity.ContentType;
import org.junit.jupiter.api.Test;
import com.example.audio.entity.Record;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@RunWith(SpringRunner.class)
class RecordControllerTest {

    @Autowired
    RecordController recordcon;

    @Test
    void upload() {

        try {
            String filePath = "D:/Data/kAPP/1839262209.wav";
            File file = new File(filePath);
            FileInputStream fileInputStream = new FileInputStream(file);
            MultipartFile multipartFile = new MockMultipartFile("copy"+file.getName(),file.getName(), ContentType.APPLICATION_OCTET_STREAM.toString(),fileInputStream);
            try {
                Record record= recordcon.upload(multipartFile,Long.valueOf(1839262209),"tom", BigDecimal.valueOf(0));
                assertNotNull(record);

            } catch (Exception e) {
                e.printStackTrace();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    @Test
    void download() {
        long id=45;
        try {
            ResponseEntity<InputStreamResource> stream=recordcon.download(id);
            assertNotNull(stream);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Test
    void getInfo() {
        long id=44;
        long id2=10;
        try {
            Record record=recordcon.getInfo(id);
            assertEquals(44,record.getId(),"作品序号出错");
            assertEquals("18100000000",record.getUsername(),"作品作者出错");
            assertEquals(16,record.getSongid(),"作品歌曲id出错");
//            assertEquals(47,record.getLikes(),"作品点赞数出错");
            assertEquals("2021-06-24 15:53:34.0",record.getTime().toString(),"作品时间出错");
            assertEquals("0.00",record.getScore().toString(),"作品评分出错");
            assertEquals(11,record.getUser().getId(),"作品作者id出错");
            assertEquals("/home/waaa/jwc/audioData/user/44.mp3",record.getUrl(),"作品url出错");

            Record record2=recordcon.getInfo(id2);
            assertNull(record2);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Test
    void addLike() {
        long id=44;
        long id2=10;
        try {
            Record record=recordcon.addLike(id);
            assertEquals(44,record.getId(),"点赞出错");

            Record record2=recordcon.addLike(id2);
            assertNull(record2);

        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    @Test
    void addRemark() {
        long id=46;
        long id2=1;
        try {
            Record record=recordcon.addRemark(id,"tom","goodone");
            assertEquals(46,record.getRemark_items().get(0).getRecord().getId(),"评论出错");

            Record record2=recordcon.addRemark(id2,"tom","see");
            assertNull(record2);

        } catch (IOException e) {
            e.printStackTrace();
        }


    }

    @Test
    void testAddRemark() {
        long id=46;
        try {
            Record record=recordcon.addRemark(id,"niceone");
            assertEquals(46,record.getRemark_items().get(0).getRecord().getId(),"评论出错");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Test
    void getRandomRemarks() {
        try {
            assertNotNull(recordcon.getRandomRemarks().get(0).getId());
            assertEquals(10,recordcon.getRandomRemarks().size());

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}