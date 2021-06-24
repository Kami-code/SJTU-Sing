package com.example.audio.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Table(name= "record")
@Entity
public class Record {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "productid")
    private Long id;
    private String username;
    private Long songid;
    private Long likes;
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date time;
    private String url;
    @Column(name = "score")
    private BigDecimal score;

    @JsonBackReference
    @ManyToOne(cascade=CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @JsonManagedReference
    @OneToMany(mappedBy = "record", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Remark_item> remark_items = new ArrayList<>();;

    public Record() {

    }

    public List<Remark_item> getRemark_items() {
        return remark_items;
    }
    public void setRemark_items(List<Remark_item> remark_items) {
        this.remark_items = remark_items;
    }
    public Record(Long songid, String username, BigDecimal score) {
        this.songid = songid;
        this.username = username;
        this.likes = 0L;
        this.score = score;
        this.url = "";
    }

    public BigDecimal getScore() {
        return score;
    }
    public void setScore(BigDecimal score) {
        this.score = score;
    }
    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
    }
    public void setTime(Date time) {
        this.time = time;
    }
    public void setSongid(Long songid) {
        this.songid = songid;
    }
    public void setLikes(Long likes) {
        this.likes = likes;
    }
    public Long getSongid() {
        return songid;
    }
    public Long getLikes() {
        return likes;
    }
    public Date getTime() {
        return time;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getUsername() {
        return username;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getId() {
        return id;
    }
//    @JsonBackReference
    public User getUser() {
        return user;
    }
//    @JsonBackReference
    public void setUser(User user) {
        this.user = user;
    }
}

