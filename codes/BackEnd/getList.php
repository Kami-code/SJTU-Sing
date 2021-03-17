<?php
    header('content-type:text/html;charset="utf-8"');
    error_reporting(0);
    /*
        json_encode() 数据结构 => 字符串
        json_decode() 字符串 => 数据结构
    */
    // $arr1=array('leo','momo','zhangsen');
    $arr2=array('username'=>'leo','age'=>32);
    echo json_encode($arr2);
?>