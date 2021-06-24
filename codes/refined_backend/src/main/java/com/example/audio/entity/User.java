package com.example.audio.entity;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sun.org.apache.regexp.internal.RE;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Table(name="user")
@Entity
public class User {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;
    private String name;
    private String password;
    private String gender;
    private String birthday;
    private String nickname;
    private String description;

    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Record> recordList = new ArrayList<>();;

    public User() {

    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getNickname() {
        return nickname;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getPassword() {
        return password;
    }
    public Long getId() {
        return id;
    }
    public String getBirthday() {
        return birthday;
    }
    public String getGender() {
        return gender;
    }
    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }
    public List<Record> getRecordList() {
        return recordList;
    }
    public void setRecordList(List<Record> recordList) {
        this.recordList = recordList;
    }
}

