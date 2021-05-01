### ApiController

#### /search/<string 要搜索的关键词>	get

**返回**：搜得歌曲列表

**格式**：JSONArray

<img src="spring接口.assets/image-20210428113546285.png" alt="image-20210428113546285" style="zoom: 67%;" />

内含：String 歌手 ，String 歌名 ，int 歌曲id ，String 图片url 





#### /songs/<int 歌曲id>	get

**返回**：歌曲具体信息

**格式**：JSONObject

![image-20210428114226403](spring接口.assets/image-20210428114226403.png)

内含：String 歌曲url ，String 歌词 ，int 歌曲id 	

id跟请求的id相同





#### /flask/<String 歌曲id>	get

**返回**：是否成功 String

**功能**：得到消除人声后的伴奏

注：会在服务器端music文件夹里找源文件，生成文件在flask文件夹里





#### /score/<String 歌曲id>	get

**返回**：是否成功 String

**功能**：打分





### loginController

#### /login	post

**请求**：String name , String password , int mode

**功能**：登录和注册

mode=0 是注册请求，1是登录请求

**返回**：
1：登录成功
2：注册成功
3：账户或密码错误
4：用户名已存在
5：模式错误

**存储**：会放在数据库account的表user里





#### /download	post

**请求**：String filename

**功能**：从服务器下载文件

注：目前的目标目录在audioData下





#### /upload	post

**请求**：MultipartFile videoData

**功能**：上传文件到服务器

注：放在audioData文件夹下

用户歌曲命名：歌曲id+"user.wav"

参考歌曲命名：歌曲id+"ref.wav"



