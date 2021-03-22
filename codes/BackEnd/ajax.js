            function $ajax({method="get",url,data,success,error}){
                //1.创建对象
                var xhr=null;
                try{
                    xhr=new XMLHttpRequest();
                }catch(error){
                    xhr=new ActiveXObject("Microsoft.XMLHTTP");
                }
    
                //判断数据是否存在
                if(data){
                    data=querystring(data);
                }
    
                if(method=="get" && data){
                    url += "?" + data;
                }
    
                //2.调用open
                xhr.open(method,url,true);
    
                //3.调用send
                //兼容get和post两种提交方式
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


            //将对象转为字符串的函数
            function querystring(obj){
                var str="";
                for(var attr in obj){
                    str += attr + "=" + obj[attr] + "&";
                }
                return str.substring(0,str.length - 1);
            }