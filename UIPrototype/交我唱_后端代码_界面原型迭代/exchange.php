<?php
    header('content-type:text/html;charset="utf-8"');
    header("Access-Control-Allow-Origin: *");
    error_reporting(0);

    //结果反馈
    $result=0;
    /*
    0: 初始值
    1：登录成功
    2：注册成功
    3：账户或密码错误
    4：用户名已存在
    5：连接数据库失败
    6：选择数据库失败
    7：注册账号失败
    */

    $account=$_GET['account'];
    $password=$_GET['password'];
    $mode=$_GET['mode'];
    //mode值 0为登录请求 1为注册请求


    //打开文件，并写入访问记录
    $logfile = fopen("./exchange.txt", "a") or die("Unable to open file!");
    $txt = "\nip地址为".$_SERVER['REMOTE_ADDR']."，主机时间为".date("Y-m-d H:i:s")." 访问服务器\n";
    fwrite($logfile, $txt);
    $txt = "account:".$account."  password:".$password."  mode:".$mode."\n";
    fwrite($logfile, $txt);
    //fclose($logfile);
    
    
    //连接数据库
    $link=mysqli_connect('127.0.0.1:3306','root','pwd');
    if(!$link){
        echo "database connect_failed";
        fwrite($logfile, "database connect_failed");
        $result=5;
        exit;
    }

    $sql = "use account";
    if ($link->query($sql) === TRUE) {
        //echo "choose_database";
    } else {
        echo "Error choosing database: " . $link->error;
        fwrite($logfile, "Error choosing database: " . $link->error);
        $result=6;
    }


//注册操作
if($mode==1){
    //查看用户是否已经存在
    $sql = $link->query("select name from user where name ='{$account}'");
    $row = mysqli_fetch_assoc($sql);
    if ($row > 0) { //判断是否已存在
        echo "该用户名已存在，请重新输入";
        fwrite($logfile, "注册失败：用户名已存在\n");
        $result=4;
    } else {
        //如果不存在，则添加一条
        $sql = "insert into user value('".$account."','".$password."');";
        //$sql = "insert into user value('Tom','123');";
        if ($link->query($sql) === TRUE) {
            echo "注册成功";
            fwrite($logfile, "注册成功\n");
            $result=2;
        } else {
            echo "Error creating account: " . $link->error;
            fwrite($logfile, "Error creating account: " . $link->error);
            $result=7;
        }
    }
}


//登录操作
if($mode==0){
    $sql = $link->query("select name from user where name ='{$account}' and password = '{$password}'");
    $row = mysqli_fetch_assoc($sql);
    if ($row > 0) {
        echo "登录成功";
        fwrite($logfile, "登录成功\n");
        $result=1;
    } else {
        echo "用户名或密码错误";
        fwrite($logfile, "注册失败：用户名或密码错误\n");
        $result=3;
    }
}

    fwrite($logfile,"结果类型：".$result."\n");
    fclose($logfile);
    $arr1=array('response'=>$result);
    echo json_encode($arr1);

?>