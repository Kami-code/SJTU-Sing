package com.example.audio.audioReceive;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

@RestController
public class audioreceive {
    private static final Logger getAudio = LoggerFactory.getLogger(audioreceive.class);
    @RequestMapping(value = "/video", method = RequestMethod.POST)
    public String postVideo(
            @RequestParam("file") MultipartFile videoData
    ) throws IOException {
        getAudio.info("*** POST Entered"+"\n");
        String filename=videoData.getOriginalFilename();

        InputStream in = videoData.getInputStream();
        writeToLocal("./audioData/"+filename, in);
        getAudio.info("***　File Written"+filename+"\n");


//        if(!videoData.isEmpty()){
//            String filename=videoData.getOriginalFilename();
//            videoData.transferTo(new File("audioData/"+filename));
//            getAudio.info("***　File Written"+filename+"\n");
//        }

        return "True";
    }

    /**
     * 将InputStream写入本地文件
     * @param destination 写入本地目录
     * @param input    输入流
     * @throws IOException
     */
    private static void writeToLocal(String destination, InputStream input)
            throws IOException {
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


