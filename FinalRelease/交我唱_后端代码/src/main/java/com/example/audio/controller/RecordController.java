package com.example.audio.controller;

import com.example.audio.entity.Record;
import com.example.audio.entity.User;
import com.example.audio.repository.RecordRepository;
import com.example.audio.response.UploadResponse;
import com.example.audio.service.RecordService;
import com.example.audio.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@CrossOrigin
@RestController
public class RecordController {
    @Autowired
    RecordService recordService;

    /**
     * 用户上传录音
     */
    @RequestMapping(value = "/record/upload",method = RequestMethod.POST)
    @ResponseBody
    public Record upload(@RequestParam("file") MultipartFile audioData, @RequestParam("songid") Long songid, @RequestParam("username") String username, @RequestParam("score")BigDecimal score) throws Exception {
        return recordService.save(audioData, songid, username, score);
    }

    /**
     * 用户下载录音
     */
    @RequestMapping(value = "/record/{record_id}/download", method = RequestMethod.GET)
    public ResponseEntity<InputStreamResource> download(@PathVariable("record_id") Long record_id)throws IOException {
//        String filePath = "/home/waaa/jwc/audioData/user/"+ record_id +".mp3";
        String filePath = "C:/User/imBC/Desktop/audioData/user/"+ record_id +".mp3";
        FileSystemResource file = new FileSystemResource(filePath);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", file.getFilename()));
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");
        return ResponseEntity.ok().headers(headers)
                .contentLength(file.contentLength())
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(new InputStreamResource(file.getInputStream()));
    }

    /**
     * 用户得到录音详细信息
     */
    @RequestMapping(value = "/record/{record_id}/info", method = RequestMethod.GET)
    public Record getInfo(@PathVariable("record_id") Long record_id)throws IOException {
        return recordService.getRecordById(record_id);
    }

    /**
     * 录音点赞
     */
    @RequestMapping(value = "/record/{record_id}/like", method = RequestMethod.GET)
    public Record addLike(@PathVariable("record_id") Long record_id)throws IOException {
        return recordService.addLikeById(record_id);
    }

    /**
     * 录音评论
     */
    @RequestMapping(value = "/record/{record_id}/remark", method = RequestMethod.POST)
    public Record addRemark(@PathVariable("record_id") Long record_id, @RequestParam("remarker_name") String remarker_name, @RequestParam("remark") String remark)throws IOException {
        return recordService.addRemarkById(record_id, remarker_name, remark);
    }

    /**
     * 录音评论(使用pathvariable+get，便于debug)
     */
    @RequestMapping(value = "/record/{record_id}/remark/{r}", method = RequestMethod.GET)
    public Record addRemark(@PathVariable("record_id") Long record_id, @PathVariable("r") String remark)throws IOException {
        return recordService.addRemarkById(record_id, "admin", remark);
    }

    @RequestMapping(value = "/record/random", method = RequestMethod.GET)
    public List<Record> getRandomRemarks()throws IOException {
        return recordService.getRandomRemarks();
    }

}
