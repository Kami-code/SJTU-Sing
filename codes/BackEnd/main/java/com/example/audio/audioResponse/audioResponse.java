package com.example.audio.audioResponse;

import com.example.audio.jsonReceive.jsonController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;

@RestController
public class audioResponse {

    private static Logger download = LoggerFactory.getLogger(jsonController.class);
    @RequestMapping(value = "/download", method = RequestMethod.POST)
    public ResponseEntity<InputStreamResource> downloadFile() throws IOException {
        String filePath = "./audioData/noise_mp3.mp3";
        FileSystemResource file = new FileSystemResource(filePath);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", file.getFilename()));
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");

        download.info("*** finish download");

        return ResponseEntity.ok().headers(headers)
                .contentLength(file.contentLength())
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(new InputStreamResource(file.getInputStream()));
    }


//    public String downloadFile2( HttpServletResponse response) throws IOException {
//        // 获取指定目录下的文件
//        String fileName = "D:\\gitrep\\springboot\\testFile\\" + "api-ms-win-core-console-l1-1-0.dll";
//        File file = new File(fileName);
//        // 如果文件名存在，则进行下载
//        if (file.exists()) {
//            // 配置文件下载
//            response.setHeader("content-type", "application/octet-stream");
//            response.setContentType("application/octet-stream");
//            // 下载文件能正常显示中文
//            response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));
//
//            // 实现文件下载
//            byte[] buffer = new byte[1024];
//            FileInputStream fis = null;
//            BufferedInputStream bis = null;
//            try {
//                fis = new FileInputStream(file);
//                bis = new BufferedInputStream(fis);
//                OutputStream os = response.getOutputStream();
//                int i = bis.read(buffer);
//                while (i != -1) {
//                    os.write(buffer, 0, i);
//                    i = bis.read(buffer);
//                }
//                System.out.println("Download the song successfully!");
//            }
//            catch (Exception e) {
//                System.out.println("Download the song failed!");
//            } finally {
//                if (bis != null) {
//                    try {
//                        bis.close();
//                    } catch (IOException e) {
//                        e.printStackTrace();
//                    }
//                }
//                if (fis != null) {
//                    try {
//                        fis.close();
//                    } catch (IOException e) {
//                        e.printStackTrace();
//                    }
//                }
//            }
//        }
//        return null;
//    }

}

