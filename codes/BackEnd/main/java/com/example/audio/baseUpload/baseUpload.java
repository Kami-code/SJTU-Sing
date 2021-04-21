package com.example.audio.baseUpload;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

@RestController
public class baseUpload {
    private static Logger getAudio = LoggerFactory.getLogger(baseUpload.class);
    @RequestMapping(value = "/baseupload", method = RequestMethod.POST)
    public String postVideo(
            @RequestParam("base") String base
    ) throws IOException{
        getAudio.info("*** POST Entered"+"\n");
        MultipartFile multi=BASE64DecodedMultipartFile.base64ToMultipart(base);
//        String filename=multi.getOriginalFilename();
        if(multi==null){
            getAudio.error("*** fail to create file");
            return "false";
        }else if(multi.isEmpty()){
            getAudio.error("*** empty file");
        }

        InputStream in = multi.getInputStream();
        writeToLocal("./audioData/"+"basefile.mp3", in);
        getAudio.info("***　File Written"+"basefile.mpe"+"\n");

        return "True";
    }

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


