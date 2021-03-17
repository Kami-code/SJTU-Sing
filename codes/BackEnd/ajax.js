            // success 数据下载成功
            // error 数据下载失败
            function $ajax({method="get",url,data,success,error}){
                //1.创建对象
                var xhr=null;
                try{
                    xhr=new XMLHttpRequest();
                }catch(error){
                    xhr=new ActiveXObject("Microsoft.XMLHTTP");
                }
    
                //判断如果数据存在
                if(data){
                    data=querystring(data);
                }
    
                if(method=="get" && data){
                    url += "?" + data;
                }
    
                //2.调用open
                xhr.open(method,url,true);
    
                //3.调用send
                if(method == "get"){
                    xhr.send();
                }else{
                    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
                    xhr.send(data);
                }
    
                //4.等待数据响应
                xhr.onreadystatechange=function(){
                    if(xhr.readyState==4){
                        if(xhr.status==200){
                            //回调函数
                           if(success){success(xhr.responseText);}
                        }else{
                            if(error){error("Error:"+xhr.status);}
                        }
                    }
                }
            }
    
    
            function querystring(obj){
                var str="";
                for(var attr in obj){
                    str += attr + "=" + obj[attr] + "&";
                }
                return str.substring(0,str.length - 1);
            }
    
    
            window.onload=function(){
                var ogetBtn=document.getElementById("getBtn");
                var opostBtn=document.getElementById("postBtn");
    
                //1.get请求
                ogetBtn.onclick=function(){
                    $ajax({
                        url:"1.get.php",
                        data:{
                            username:"xxx",
                            age:19,
                            password:123
                        },
                        success:function(result){
                            alert("GET得数据:"+result);
                        },
                        error:function(msg){
                            alert(msg);
                        }
                    })
                }
    
                //2.post请求
                opostBtn.onclick=function(){
                    //data:"username=yyy&age=20&password=abc"
                    $ajax({
                        method:"post",
                        url:"1.post.php",
                        data:{
                            username:"yyy",
                            age:20,
                            password:123
                        },
                        success:function(result){
                            alert("POST得数据:"+result);
                            //这里直接处理下载到的数据
                        },
                        error:function(msg){
                            alert(msg);
                        }
                    })
                }
            }