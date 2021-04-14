package com.example.audio.audioReceive;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

@RestController
public class audioreceive {
    @RequestMapping(value = "/video", method = RequestMethod.POST)
    public String postVideo(
            @RequestParam("file") MultipartFile videoData
    ) throws IOException {
        System.out.println("POST Entered");
        InputStream in = videoData.getInputStream();
        writeToLocal("E://my.mp3", in);
        System.out.println("File Written");

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


