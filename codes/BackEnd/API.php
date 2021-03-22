<?php
function curl_file_get_contents($durl){
    // header传送格式
    $headers = array(
        "token:1111111111111",
        "over_time:22222222222",
        "authority:music.163.com",
        "cookie: NMTID=00OX2rCfne4PKkRnk5cvzhBKfR5JucAAAF4F26wgQ; JSESSIONID-WYYY=agF7YyMw%5Cs2eJhHhfMKYfS8zH%2F6VBthuFwSWR2B4A9ZUfIlnKquNsKqQkDqDpUOJt5OEr4QwxFFhPAdZYkyVMvg1EDZfsT%2B824eFwczwxiyOMkDsdnBWes73hskqiwD%2B7zlv%2BnUxU1yFqn2FHkN8iZRa38JAKQjWz96Gg7O1%5CckUlsMD%3A1615995253197; _iuqxldmzr_=32; _ntes_nnid=3995e663162b7d2d7e2838ef17bacd52,1615993453238; _ntes_nuid=3995e663162b7d2d7e2838ef17bacd52; WM_TID=TT5c9DvhWulBQBUEFVd70FA8361bvvua; WM_NI=2rognhdYqaY721XRjnW2SIvOeOmq3hgbFAdlo5cuCXuYmEsy1KIMzrB%2BjiUkAD3UMTmWasWXGh6cAjvyqxPZskJ6CfzOkJmtDpBCXqvDtd67FDNqeWYFSplTFy4b8tvocHU%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6eeafb25d93aba994e465a7b88fb6c15a939b9abbae3c918f9a8bf03ff38ffb87f22af0fea7c3b92af2aea188ed64a887bf82dc3df2ef98b3e96695ee9daaf545a791a392b264a5be8aa2e768adebad96c254b787a3a6f273f39587aef97a82f5a68ad861839cfdb6d060af89af94d65485b8fa84c462b6a7bf99d352b1b586d7c26eba91a5abf08088b08ea4db7bb69cbc85b53d869c8292e85d9b9a9d91ef6086a7fc83bb80b6b1ada9d837e2a3",
        "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 Edg/89.0.774.54"
    );
    // 初始化
    $curl = curl_init();
    // 设置url路径
    curl_setopt($curl, CURLOPT_URL, $durl);
    // 将 curl_exec()获取的信息以文件流的形式返回，而不是直接输出。
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true) ;
    // 在启用 CURLOPT_RETURNTRANSFER 时候将获取数据返回
    curl_setopt($curl, CURLOPT_BINARYTRANSFER, true) ;
    // 添加头信息
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    // CURLINFO_HEADER_OUT选项可以拿到请求头信息
    curl_setopt($curl, CURLINFO_HEADER_OUT, true);
    // 不验证SSL
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
    // 执行
    $data = curl_exec($curl);
    // 打印请求头信息
//        echo curl_getinfo($curl, CURLINFO_HEADER_OUT);
    // 关闭连接
    curl_close($curl);
    // 返回数据
    return $data;
}


function getUrl($id){
    $request='https://api.imjad.cn/cloudmusic/?type=song&id='.$id;
    $response = json_decode(curl_file_get_contents($request),true);
    $data = $response['data'];
    return $data[0]['url'];
}

function getLyric($path,$id){
    $request='https://api.imjad.cn/cloudmusic/?type=lyric&id='.$id;
    $response = json_decode(curl_file_get_contents($request),true);
    $lrc = $response['lrc'];
    file_put_contents($path , $lrc);
    //return $data[0]['url'];
    //print_r( $data);
}

function getInfo($id){
    $request='https://api.imjad.cn/cloudmusic/?type=detail&id='.$id;
    $response = json_decode(curl_file_get_contents($request),true);

    //return $data[0]['url'];
    print_r( $response['songs'][0]);
}
const danqu =1;
const zhuanji =10;
const geshou =100;
const gedan =1000;
const yonghu =1002;
const mv =1004;
const geci =1006;
const zhubodiantai=1009;
function search($name, $type){
    $request='http://music.163.com/api/search/pc/?type='.$type.'&s='.urlencode($name);
    $response = json_decode(curl_file_get_contents($request),true);
    print_r( $response);
    $songs = $response['result']['songs'];
    //return $data[0]['url'];
    print_r( $songs);
    return $songs[0]['id'];
}

function downloadMp3($path,$id){
    $songUrl = getUrl($id);
    $mp3 = curl_file_get_contents($songUrl);
    file_put_contents($path , $mp3);
    unset($mp3);
}

//downloadMp3("test3.mp3",28012031);
//getInfo(28012031);
search('nothing',danqu);

function getSong($path,$name){
    $id = search($name,danqu);
    downloadMp3($path,$id);
}
getSong('test4.mp3','理想三旬');


?>
