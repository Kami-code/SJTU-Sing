package com.example.audio.audiodownload;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;


@RestController
public class AudioDownload {

    final Logger download = LoggerFactory.getLogger(AudioDownload.class);

    /**
     * 下载音频
     * @param song_id 下载歌曲对应的id
     * @return ResponseEntity<InputStreamResource> 返回文件流
     */
    @RequestMapping(value = "/download/{str}", method = RequestMethod.GET)
    public ResponseEntity<InputStreamResource> downloadFile(@PathVariable("str") String song_id)throws IOException{
        download.info("***download begin!!!\n");

        String filePath = "/home/waaa/jwc/audioData/flask/"+song_id+".mp3";
        download.info(filePath);
        FileSystemResource file = new FileSystemResource(filePath);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", file.getFilename()));
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");

        download.info("*** finish download "+filePath);

        return ResponseEntity.ok().headers(headers)
                .contentLength(file.contentLength())
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(new InputStreamResource(file.getInputStream()));
    }

    @RequestMapping(value = "/downloadproduct", method = RequestMethod.GET)
    public ResponseEntity<InputStreamResource> downloadProduct(@RequestParam("username") String username,@RequestParam("songid") String songid,@RequestParam("number") int number)throws IOException{
        download.info("***download product begin!!!\n");

        String filePath = "/home/waaa/jwc/audioData/user/"+songid+"_"+username+"_"+number+".wav";
        download.info(filePath);
        FileSystemResource file = new FileSystemResource(filePath);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", file.getFilename()));
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");

        download.info("*** finish download "+filePath);

        return ResponseEntity.ok().headers(headers)
                .contentLength(file.contentLength())
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(new InputStreamResource(file.getInputStream()));
    }

//    @RequestMapping(value = "/downloaduser")
//    public ResponseEntity<InputStreamResource> downloadUser(@RequestParam("songid") int songid@PathVariable("str") String song_id)throws IOException{
//        download.info("***download begin!!!\n");
//
//        String filePath = "./audioData/flask/"+song_id+".mp3";
//        download.info(filePath);
//        FileSystemResource file = new FileSystemResource(filePath);
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
//        headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", file.getFilename()));
//        headers.add("Pragma", "no-cache");
//        headers.add("Expires", "0");
//
//        download.info("*** finish download "+filePath);
//
//        return ResponseEntity.ok().headers(headers)
//                .contentLength(file.contentLength())
//                .contentType(MediaType.parseMediaType("application/octet-stream"))
//                .body(new InputStreamResource(file.getInputStream()));
//    }

}

