package com.example.audio.audioupload;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

@CrossOrigin
@RestController
public class AudioUpload {
    final Logger upload = LoggerFactory.getLogger(AudioUpload.class);
    @Resource
    JdbcTemplate jdbcTemplate;
    /**
     * 上传音频
     * @param videoData 上传的音频文件
     * @return String 是否成功信息
     */

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public String postVideo(@RequestParam("file") MultipartFile videoData,@RequestParam("songid") int songid,@RequestParam("username") String username) throws IOException {
        upload.info("### /upload"+"\n");
        String fileName="/home/waaa/jwc/audioData/user/"+songid+"_"+username+".wav";

        InputStream in = videoData.getInputStream();
        writeToLocal(fileName, in);
        upload.info("*** 作品用户名:"+username+"\n");
        upload.info("*** File Written: "+fileName+"\n");

        return "True";
    }

    @RequestMapping(value = "/uploadproduct", method = RequestMethod.POST)
    public String postProduct(@RequestParam("file") MultipartFile videoData,@RequestParam("songid") int songid,@RequestParam("username") String username) throws IOException {
        upload.info("### /uploadproduct"+"\n");
//        String fileName=videoData.getOriginalFilename();
        int exit = jdbcTemplate.queryForObject("select count(*) from song where username = \""+username+"\"and songid=\""+songid+"\";", int.class);

        exit++;
        String fileName="/home/waaa/jwc/audioData/user/"+songid+"_"+username+"_"+exit+".mp3";

        upload.info("***上传作品");
        InputStream in = videoData.getInputStream();
        writeToLocal(fileName, in);
        upload.info("*** 作品用户名:"+username+"\n");
        upload.info("*** File Written: "+fileName+"\n");

        jdbcTemplate.execute("insert into song(username,songid,number) values(\""+username+"\",\""+songid+"\",\""+exit+"\");");
        return "True";
    }

    /**
     * 将InputStream写入本地文件
     * @param destination 写入本地目录
     * @param input    输入流
     */
    private static void writeToLocal(String destination, InputStream input) throws IOException {
        int index;
        byte[] bytes = new byte[1024];
        FileOutputStream downloadFile = new FileOutputStream(destination);
        while ((index = input.read(bytes)) != -1) {
            downloadFile.write(bytes, 0, index);
            downloadFile.flush();
        }
        downloadFile.close();
        input.close();
    }

}


