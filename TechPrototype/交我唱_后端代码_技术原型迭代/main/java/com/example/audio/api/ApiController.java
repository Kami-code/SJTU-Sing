package com.example.audio.api;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.jaudiotagger.audio.AudioFileIO;
import org.jaudiotagger.audio.mp3.MP3AudioHeader;
import org.jaudiotagger.audio.mp3.MP3File;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Resource;

@RestController
public class ApiController {
	final Logger api = LoggerFactory.getLogger(ApiController.class);

	@Resource
	JdbcTemplate jdbcTemplate;

	/**
	 * 歌曲搜索
	 * @param search_name 搜索的关键词
	 * @return JSONArray 搜得歌曲列表
	 */
	@RequestMapping(value = "/search/{str}", method = RequestMethod.GET)
	public @ResponseBody JSONArray blurSearch(@PathVariable("str") String search_name) throws Exception {
		JSONObject songs_object = search(search_name);
		JSONArray songs_responce_array = new JSONArray();
		int length = songs_object.getJSONObject("result").getJSONArray("songs").size();
		for (int i = 0; i < length; ++i) {
			JSONObject jsonObject = new JSONObject();
			int song_id = getSongId(songs_object, i);

			String song_picture_url = getPicture(songs_object, i);
			String song_name = getName(songs_object, i);
			String artist_name = getArtist(songs_object, i);

//			String sql="insert into search values(111,\"songname\",\"songpicture\",\""+artist_name+"\");";
// 			jdbcTemplate.execute(sql);
			jdbcTemplate.execute("insert into search values("+song_id+",\""+song_name+"\",\""+song_picture_url+"\" , \""+artist_name+"\");");

			jsonObject.put("name", song_name);
			jsonObject.put("singer", artist_name);
			jsonObject.put("id", song_id);
			jsonObject.put("picture", song_picture_url);
			songs_responce_array.add(jsonObject);
		}
		return songs_responce_array;
	}


	/**
	 * 获取歌曲
	 * @param song_id 请求歌曲对应的id
	 * @return JSONObject 歌曲的详细信息
	 */
	@RequestMapping(value = "/songs/{int}", method = RequestMethod.GET)
	public @ResponseBody JSONObject songGet(@PathVariable("int") int song_id) throws Exception {
		JSONObject jsonObject = new JSONObject();
		String mp3_path = getUrl(song_id);
		String lyric = getLyric(song_id);
		String filename=String.valueOf(song_id);
		URL fileUrl = new URL(mp3_path);
		InputStream in = fileUrl.openStream();
		String local_path="/root/audioData/music/"+filename+".mp3";
		writeToLocal(local_path, in);

		double music_length=getLength(local_path);

		jsonObject.put("mp3", mp3_path);
		jsonObject.put("id", song_id);
		jsonObject.put("lyric", lyric);
		jsonObject.put("length",music_length);
		return jsonObject;
	}


//	@Autowired
//	private SendFlask sendf;

	/**
	 * 人声消除，获取伴奏
	 * @param song_id 请求歌曲对应的id
	 * @return JSONObject 是否成功信息
	 */
	@RequestMapping(value = "/flask/{str}", method = RequestMethod.GET)
	public @ResponseBody String getAccompaniment(@PathVariable("str") String song_id) throws Exception {
		File file = new File("/root/audioData/music/"+song_id+".mp3");
		if(!file.exists()){return "no origin file!";}
		api.info("传给flask开始人声消除");
		List<NameValuePair> formList = new ArrayList<>();
		formList.add(new BasicNameValuePair("id", song_id));
//		sendf.sendflask("http://localhost:5000/audio", formList);
		return doFlask("http://localhost:5000/audio", formList);
	}


	/**
	 * 唱歌打分
	 * @param song_id 请求歌曲对应的id
	 * @param begin 打分开始时间
	 * @param end 打分结束时间
	 * @return JSONObject 是否成功信息
	 */
	@RequestMapping(value = "/score", method = RequestMethod.POST)
	public @ResponseBody String getScore(@RequestParam String song_id,@RequestParam float begin, @RequestParam float end) throws Exception {
		File fileRef = new File("/root/audioData/user/"+song_id+"user.wav");
		if(!fileRef.exists()){return "no reference audio!!!";}
		File fileUser = new File("/root/audioData/user/"+song_id+"user.wav");
		if(!fileUser.exists()){return "no user audio!!!";}

		api.info("***开始打分score");
		List<NameValuePair> formList = new ArrayList<>();
		formList.add(new BasicNameValuePair("sung_song_path", "/root/audioData/user/"+song_id+"user.wav"));//用户的歌位置
		formList.add(new BasicNameValuePair("reference_song_path", "/root/audioData/user/"+song_id+"ref.wav"));//参考的歌位置
		formList.add(new BasicNameValuePair("begintime",Float.toString(begin)));
		formList.add(new BasicNameValuePair("endtime",Float.toString(end)));
		System.out.println(begin);
		System.out.println(end);
		return doFlask("http://localhost:5050/score", formList);
	}


	private static void writeToLocal(String destination, InputStream input) throws IOException {
		int index;
		byte[] bytes = new byte[1024];
		FileOutputStream downloadFile = new FileOutputStream(destination);
		while ((index = input.read(bytes)) != -1) {
			downloadFile.write(bytes, 0, index);
			downloadFile.flush();
		}
		downloadFile.close();
		input.close();
	}


	public JSONObject doGet(String url) throws Exception {
		//第一步：创建一个HttpClient对象
		CloseableHttpClient httpClient = HttpClients.createDefault();
		//第二步：创建一个HttpGet对象，需要制定一个请求的url
		HttpGet get = new HttpGet(url);
		//第三步：执行请求。
		CloseableHttpResponse response = httpClient.execute(get);
		//第四步：接收返回结果。HttpEntity对象。
		HttpEntity entity = response.getEntity();
		//第五步：取响应的内容。
		String html = EntityUtils.toString(entity);
		JSONObject response_json = JSONObject.parseObject(html);
		//第六步：关闭response、HttpClient。
		response.close();
		httpClient.close();
		return response_json;
	}

	static boolean flag=true;
	public String doFlask(String url, List<NameValuePair> formList) throws Exception {
		if(!flag){
			System.out.println("WAIT!!!");
			return "WAIT!!!";
		}
		flag=false;
		// 第一步：创建一个httpClient对象
		CloseableHttpClient httpClient = HttpClients.createDefault();
		// 第二步：创建一个HttpPost对象。需要指定一个url
		HttpPost post = new HttpPost(url);
		// 第三步：创建一个list模拟表单，list中每个元素是一个NameValuePair对象
		// 第四步：需要把表单包装到Entity对象中。StringEntity
		StringEntity entity = new UrlEncodedFormEntity(formList, "utf-8");
		post.setEntity(entity);
		// 第五步：执行请求。
		CloseableHttpResponse response = httpClient.execute(post);
		// 第六步：接收返回结果
		HttpEntity httpEntity = response.getEntity();
		String result = EntityUtils.toString(httpEntity);
		System.out.println(result);
		// 第七步：关闭流。
		response.close();
		httpClient.close();
		flag=true;
		return result;
	}


	public JSONObject search(String song_name) throws Exception {
		String url = "http://music.163.com/api/search/pc/?type=1&s=" + java.net.URLEncoder.encode(song_name);
		return doGet(url);
	}

	public int getSongId(JSONObject jsonObject, int index) {
		return jsonObject.getJSONObject("result").getJSONArray("songs").getJSONObject(index).getInteger("id");
	}

	public String getPicture(JSONObject jsonObject, int index) {
		return jsonObject.getJSONObject("result").getJSONArray("songs").getJSONObject(index).getJSONObject("album").getString("blurPicUrl");
	}

	public String getName(JSONObject jsonObject, int index) {
		return jsonObject.getJSONObject("result").getJSONArray("songs").getJSONObject(index).getString("name");
	}

	public String getArtist(JSONObject jsonObject, int index) {
		return jsonObject.getJSONObject("result").getJSONArray("songs").getJSONObject(index).getJSONObject("album").getJSONArray("artists").getJSONObject(0).getString("name");
	}

	public String getUrl(int song_id) throws Exception {
		String url = "http://api.imjad.cn/cloudmusic/?type=song&id=" + song_id;
		JSONObject response_json = doGet(url);
		return response_json.getJSONArray("data").getJSONObject(0).getString("url");
	}

	public String getLyric(int song_id) throws Exception {
		String url = "https://api.imjad.cn/cloudmusic/?type=lyric&id=" + song_id;
		JSONObject response_json = doGet(url);
		System.out.print(response_json);
		return response_json.getJSONObject("lrc").getString("lyric");
	}

	private double getLength(String path) {
		File file = new File(path);
		double length = 0;
		try {
			MP3File f = (MP3File) AudioFileIO.read(file);
			MP3AudioHeader audioHeader = (MP3AudioHeader)f.getAudioHeader();
			length=audioHeader.getTrackLength();

		} catch(Exception e) {
			e.printStackTrace();
		}
		return length;
	}

}
