package com.example.audio.baseUpload;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@RestController
public class baseUpload {
    private static Logger getAudio = LoggerFactory.getLogger(baseUpload.class);
    @RequestMapping(value = "/baseupload",method = RequestMethod.POST)
    public void postbase()throws Exception{
        getAudio.info("*** POST Entered"+"\n");
        String str= encodeBase64File("./audioData/music.mp3");
        getAudio.info("*** encode finished"+"\n");
        decoderBase64File(str,"./newmusic.mp3");
        getAudio.info("*** decode finished"+"\n");
    }
//    public String postbase(@RequestParam String base)throws IOException{
//        getAudio.info("*** POST Entered"+"\n");
////        String orig = "hello world!";
////        String desc = Base64.getEncoder().encodeToString(base.getBytes(StandardCharsets.UTF_8));
//        String desc=new String(Base64.getDecoder().decode(base),StandardCharsets.UTF_8);
//        getAudio.info("*** after encode:"+desc+"\n");
//        FileOutputStream downloadFile = new FileOutputStream("./audioData/base.png");
//        getAudio.info("*** create the file"+"\n");
//        byte[] bytes = desc.getBytes();
////        bytes=desc.getBytes();
//        downloadFile.write(bytes);
//        getAudio.info("*** write to the file"+"\n");
//        downloadFile.flush();
//        downloadFile.close();
//        getAudio.info("*** close the file"+"\n");
//        return "true";
//    }



//    @RequestMapping(value = "/baseupload", method = RequestMethod.POST)
//    public String postVideo(
//            @RequestParam("base") String base
//    ) throws IOException{
//        getAudio.info("*** POST Entered"+"\n");
//        MultipartFile multi=BASE64DecodedMultipartFile.base64ToMultipart(base);
////        String filename=multi.getOriginalFilename();
//        getAudio.info("*** create multifile");
//        if(multi==null){
//            getAudio.error("*** fail to create file");
//            return "false";
//        }else if(multi.isEmpty()){
//            getAudio.error("*** empty file");
//        }
//
//        InputStream in = multi.getInputStream();
//        writeToLocal("./audioData/"+"basetext.txt", in);
//        getAudio.info("***　File Written"+"basetext.txt"+"\n");
//
//        return "True";
//    }
//
//    private static void writeToLocal(String destination, InputStream input)
//            throws IOException {
//        int index;
//        byte[] bytes = new byte[1024];
//        FileOutputStream downloadFile = new FileOutputStream(destination);
//        while ((index = input.read(bytes)) != -1) {
//            downloadFile.write(bytes, 0, index);
//            downloadFile.flush();
//        }
//        downloadFile.close();
//        input.close();
//    }


public static String encodeBase64File(String path) throws Exception {
    File file = new File(path);;
    FileInputStream inputFile = new FileInputStream(file);
    byte[] buffer = new byte[(int) file.length()];
    inputFile.read(buffer);
    inputFile.close();
    return new BASE64Encoder().encode(buffer);
}

    public static void decoderBase64File(String base64Code, String targetPath)
            throws Exception {
        byte[] buffer = new BASE64Decoder().decodeBuffer(base64Code);
        FileOutputStream out = new FileOutputStream(targetPath);
        out.write(buffer);
        out.close();

    }

}


