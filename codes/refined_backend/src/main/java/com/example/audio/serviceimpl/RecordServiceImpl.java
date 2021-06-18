package com.example.audio.serviceimpl;

import com.example.audio.dao.RecordDao;
import com.example.audio.dao.UserDao;
import com.example.audio.entity.Record;
import com.example.audio.entity.Remark_item;
import com.example.audio.entity.User;
import com.example.audio.service.RecordService;
import com.sun.org.apache.regexp.internal.RE;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.List;

@Service
public class RecordServiceImpl implements RecordService {

    @Autowired
    private RecordDao recordDao;
    @Autowired
    private UserDao userDao;

    @Override
    public Record save(MultipartFile videoData, Long songid, String username, BigDecimal score) throws Exception {
        User user = userDao.getUserByName(username);
        System.out.println(songid);
        System.out.println(username);
        System.out.println(score);
        if (user == null) {
            throw new Exception("没有找到用户!");
        }
        System.out.println("找到用户了");
        Record record = new Record(songid, username, score);
        record.setUser(user);
        System.out.println(record);
        Record record_saved = recordDao.save(record);
        System.out.println("id = "+ record_saved.getId());
//        String url= "/home/waaa/jwc/audioData/user/" + record_saved.getId() +".mp3";
        String url = "E:/123/" + record_saved.getId() + ".mp3";
        System.out.println(url);
        record_saved.setUrl(url);
        InputStream in = videoData.getInputStream();
        writeToLocal(url, in);
        return recordDao.save(record_saved);
    }

    @Override
    public List<Record> getRecordsByUser(String username) {
        return recordDao.getRecordsByUser(userDao.getUserByName(username));
    }

    @Override
    public Record getRecordById(Long id) {
        return recordDao.getRecordById(id);
    }

    @Override
    public Record addLikeById(Long id) {
        Record record = recordDao.getRecordById(id);
        if (record == null) {
            return null;
        }
        record.setLikes(record.getLikes() + 1);
        return recordDao.save(record);
    }

    @Override
    public Record addRemarkById(Long id, String remarker_name, String remark) {
        Record record = recordDao.getRecordById(id);
        if (record == null) {
            return null;
        }
        Remark_item remark_item = new Remark_item(remark, remarker_name, record);
        record.getRemark_items().add(remark_item);
        return recordDao.save(record);
    }

    @Override
    public List<Record> getRandomRemarks() {
        return recordDao.getRandomRemarks();
    }



    public static void writeToLocal(String destination, InputStream input) throws IOException {
        System.out.println("开始写到本地");
        int index;
        byte[] bytes = new byte[1024];
        FileOutputStream downloadFile = new FileOutputStream(destination);
        while ((index = input.read(bytes)) != -1) {

            downloadFile.write(bytes, 0, index);
            downloadFile.flush();
        }
        downloadFile.close();
        input.close();
        System.out.println("写到本地成功！");
    }

}
