const SONGS = [
    {
        pic_small: "https://bkimg.cdn.bcebos.com/pic/72f082025aafa40f4bfb30fea62d144f78f0f736b3f5?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2UyMjA=,g_7,xp_5,yp_5/format,f_auto", //小图
        pic_big: 'https://bkimg.cdn.bcebos.com/pic/72f082025aafa40f4bfb30fea62d144f78f0f736b3f5?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2UyMjA=,g_7,xp_5,yp_5/format,f_auto',  //大图
        title: "可可托海的牧羊人",     //歌曲名
        author: "王琪",   //歌手
        file_link: "https://mp32.9ku.com/upload/128/2020/05/22/1004523.mp3",   //播放链接
        file_duration: 340, //歌曲长度
        lrcContent: "[ti:可可托海的牧羊人]\n" +
            "[ar:王琪]\n" +
            "[al:可可托海的牧羊人]\n" +
            "[by:]\n" +
            "[offset:0]\n" +
            "[00:00.27]可可托海的牧羊人 - 王琪\n" +
            "[00:00.60]词：王琪\n" +
            "[00:00.70]曲：王琪\n" +
            "[00:00.80]编曲：达吾然\n" +
            "[00:00.97]缩混：文克津\n" +
            "[00:18.01]那夜的雨也没能留住你\n" +
            "[00:25.17]山谷的风它陪着我哭泣\n" +
            "[00:32.79]你的驼铃声仿佛还在我耳边响起\n" +
            "[00:40.13]告诉我你曾来过这里\n" +
            "[00:47.54]我酿的酒喝不醉我自己\n" +
            "[00:54.74]你唱的歌却让我一醉不起\n" +
            "[01:02.62]我愿意陪你翻过雪山穿越戈壁\n" +
            "[01:09.60]可你不辞而别还断绝了所有的消息\n" +
            "[01:16.70]心上人我在可可托海等你\n" +
            "[01:24.07]他们说你嫁到了伊犁\n" +
            "[01:32.24]是不是因为那里有美丽的那拉提\n" +
            "[01:39.26]还是那里的杏花\n" +
            "[01:41.54]才能酿出你要的甜蜜\n" +
            "[01:46.18]毡房外又有驼铃声声响起\n" +
            "[01:53.75]我知道那一定不是你\n" +
            "[02:01.78]再没人能唱出像你那样动人的歌曲\n" +
            "[02:08.94]再没有一个美丽的姑娘让我难忘记\n" +
            "[02:45.80]我酿的酒喝不醉我自己\n" +
            "[02:53.02]你唱的歌却让我一醉不起\n" +
            "[03:00.88]我愿意陪你翻过雪山穿越戈壁\n" +
            "[03:07.85]可你不辞而别还断绝了所有的消息\n" +
            "[03:14.76]心上人我在可可托海等你\n" +
            "[03:22.16]他们说你嫁到了伊犁\n" +
            "[03:30.40]是不是因为那里有美丽的那拉提\n" +
            "[03:37.48]还是那里的杏花\n" +
            "[03:39.71]才能酿出你要的甜蜜\n" +
            "[03:44.33]毡房外又有驼铃声声响起\n" +
            "[03:51.69]我知道那一定不是你\n" +
            "[03:59.90]再没人能唱出像你那样动人的歌曲\n" +
            "[04:07.03]再没有一个美丽的姑娘让我难忘记\n" +
            "[04:14.06]心上人我在可可托海等你\n" +
            "[04:21.21]他们说你嫁到了伊犁\n" +
            "[04:29.35]是不是因为那里有美丽的那拉提\n" +
            "[04:36.51]还是那里的杏花\n" +
            "[04:38.80]才能酿出你要的甜蜜\n" +
            "[04:43.62]毡房外又有驼铃声声响起\n" +
            "[04:50.53]我知道那一定不是你\n" +
            "[04:58.76]再没人能唱出像你那样动人的歌曲\n" +
            "[05:06.32]再没有一个美丽的姑娘让我难忘记"
    },
    {
        pic_small: "https://bkimg.cdn.bcebos.com/pic/94cad1c8a786c9177f3e29ad9d7467cf3bc79f3df944?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2UxODA=,g_7,xp_5,yp_5/format,f_auto", //小图
        pic_big: 'https://bkimg.cdn.bcebos.com/pic/94cad1c8a786c9177f3e29ad9d7467cf3bc79f3df944?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2UxODA=,g_7,xp_5,yp_5/format,f_auto',  //大图
        title: "Mojito",     //歌曲名
        author: "周杰伦",   //歌手
        file_link: "https://mp32.9ku.com/upload/128/2020/10/02/1010008.mp3",   //播放链接
        file_duration: 185, //歌曲长度
        lrcContent: "[ti:Mojito]\n" +
            "[ar:周杰伦]\n" +
            "[al:Mojito]\n" +
            "[by:www.yolrc.com]\n" +
            "[00:01.09]Mojito-周杰伦(JayChou)歌词：\n" +
            "[00:17.38]麻烦给我的爱人来一杯Mojito\n" +
            "[00:21.99]我喜欢阅读她微醺时的眼眸\n" +
            "[00:25.64]而我的咖啡糖不用太多\n" +
            "[00:29.79]这世界已经因为她甜得过头\n" +
            "[00:33.99]没有跟她笑容一样浓郁的雪茄\n" +
            "[00:37.99]就别浪费时间介绍收起来吧\n" +
            "[00:42.14]拱廊的壁画旧城的涂鸦\n" +
            "[00:46.39]所有色彩都因为她说不出话\n" +
            "[00:50.69]这爱不落幕忘了心事的国度\n" +
            "[00:54.79]你所在之处孤单都被征服\n" +
            "[00:58.94]铁铸的招牌错落着就像\n" +
            "[01:03.19]一封封城市献给天空的情书\n" +
            "[01:07.54]当街灯亮起Havana漫步\n" +
            "[01:11.39]这是世上最美丽的那双人舞\n" +
            "[01:32.95]缤纷的老爷车跟着棕榈摇曳\n" +
            "[01:34.96]载着海风私奔漫无目的\n" +
            "[01:37.16]古董书摊漫着时光香气\n" +
            "[01:39.22]我想上辈子是不是就遇过你\n" +
            "[01:41.67]喧嚣的海报躺在慵懒的阁楼阳台\n" +
            "[01:45.87]而你是文学家笔下的那一片海\n" +
            "[01:49.12]麻烦给我的爱人来一杯Mojito\n" +
            "[01:53.17]我喜欢阅读她微醺时的眼眸\n" +
            "[01:57.37]而我的咖啡糖不用太多\n" +
            "[02:01.77]这世界已经因为她甜得过头\n" +
            "[02:05.82]这爱不落幕忘了心事的国度\n" +
            "[02:09.94]你所在之处孤单都被征服\n" +
            "[02:14.20]铁铸的招牌错落着就像\n" +
            "[02:18.30]一封封城市献给天空的情书\n" +
            "[02:22.50]当街灯亮起Havana漫步\n" +
            "[02:26.60]这是世上最美丽的那双人舞\n" +
            "[02:39.15]铁铸的招牌错落着就像\n" +
            "[02:43.35]一封封城市献给天空的情书\n" +
            "[02:47.50]当街灯亮起Havana漫步\n" +
            "[02:52.46]这是世上最美丽的那双人舞"
    },
    {
        pic_small: "https://bkimg.cdn.bcebos.com/pic/d788d43f8794a4c200e480bf0cf41bd5ac6e395a?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2UyMjA=,g_7,xp_5,yp_5/format,f_auto", //小图
        pic_big: 'https://bkimg.cdn.bcebos.com/pic/d788d43f8794a4c200e480bf0cf41bd5ac6e395a?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2UyMjA=,g_7,xp_5,yp_5/format,f_auto',  //大图
        title: "Love Story",     //歌曲名
        author: "Taylor Swift",   //歌手
        file_link: "https://mp3.9ku.com/hot/2009/10-09/194548.mp3",   //播放链接
        file_duration: 236, //歌曲长度
        lrcContent: "[ti:Love Story]\n" +
            "[ar:Taylor Swift]\n" +
            "[al:Fearless]\n" +
            "[00:01.00]Love Story\n" +
            "[00:03.00]\n" +
            "[00:06.00]singer:Taylor Swift\n" +
            "[00:08.00]\n" +
            "[00:12.00]LRC:妙一法师\n" +
            "[00:16.00]\n" +
            "[00:16.58]We were both young when I first saw you.\n" +
            "[00:20.27]I close my eyes and the flashback starts:\n" +
            "[00:23.94]I’m standing there on a balcony in summer air.\n" +
            "[00:30.35]\n" +
            "[00:32.63]See the lights, see the party, the ball gowns.\n" +
            "[00:36.38]See you make your way through the crowd\n" +
            "[00:40.00]and say hello;\n" +
            "[00:41.86]\n" +
            "[00:43.75]Little did I know\n" +
            "[00:48.48]That you were Romeo; you were throwing pebbles,\n" +
            "[00:52.20]And my daddy said, \"Stay away from Juliet.\"\n" +
            "[00:56.01]And I was crying on the staircase,\n" +
            "[00:58.73]begging you, ’Please, don’t go.’\n" +
            "[01:02.91]\n" +
            "[01:03.39]And I said,\n" +
            "[01:04.51]\"Romeo, take me somewhere we can be alone.\n" +
            "[01:08.77]I’ll be waiting; all there’s left to do is run.\n" +
            "[01:12.79]You’ll be the prince and I’ll be the princess\n" +
            "[01:16.86]It’s a love story - baby just say ’Yes.’\n" +
            "[01:21.65]\n" +
            "[01:24.91]So I sneak out to the garden to see you.\n" +
            "[01:29.09]We keep quiet ’cause we’re dead if they knew.\n" +
            "[01:32.42]So close your eyes; escape this town for a little while.\n" +
            "[01:39.33]\n" +
            "[01:40.94]’Cause you were Romeo, I was a scarlet letter,\n" +
            "[01:44.64]And my daddy said \"Stay away from Juliet,\"\n" +
            "[01:48.37]But you were everything to me; I was begging you, ’Please, don’t go,’\n" +
            "[01:55.41]\n" +
            "[01:55.87]And I said,\n" +
            "[01:57.12]Romeo, take me somewhere we can be alone.\n" +
            "[02:01.20]I’ll be waiting; all there’s left to do is run.\n" +
            "[02:05.21]You’ll be the prince and I’ll be the princess\n" +
            "[02:09.29]It’s a love story - baby just say ’Yes.’\n" +
            "[02:13.29]\n" +
            "[02:13.65]Romeo save me; they’re tryin’ to tell me how to feel.\n" +
            "[02:17.33]This love is difficult, but it’s real.\n" +
            "[02:21.54]Don’t be afraid; we’ll make it out of this mess.\n" +
            "[02:25.47]It’s a love story - baby just say ’Yes.’\n" +
            "[02:29.92]\n" +
            "[02:44.89]I got tired of waiting,\n" +
            "[02:49.33]Wondering if you were ever comin’ around.\n" +
            "[02:53.07]My faith in you was fading\n" +
            "[02:57.94]When I met you on the outskirts of town.\n" +
            "[03:01.07]\n" +
            "[03:01.44]And I said,\n" +
            "[03:02.25]Romeo save me - I’ve been feeling so alone.\n" +
            "[03:06.34]I keep waiting for you but you never come.\n" +
            "[03:10.37]Is this in my head? I don’t know what to think-\n" +
            "[03:13.97]He knelt to the ground and pulled out a ring and said,\n" +
            "[03:18.41]Marry me, Juliet. you’ll never have to be alone.\n" +
            "[03:22.52]I love you and that’s all I really know.\n" +
            "[03:26.52]I talked to your dad, go pick out a white dress;\n" +
            "[03:30.57]It’s a love story - baby just say ’Yes.’\n" +
            "[03:36.65]\n" +
            "[03:38.13]Oh, oh.\n" +
            "[03:44.49]\n" +
            "[03:46.73]We were both young when I first saw you...\n" +
            "[03:51.69]\n" +
            "[03:52.01]END\n" +
            "[03:55.80]"
    },
    {
        pic_small: "https://bkimg.cdn.bcebos.com/pic/2f738bd4b31c8701c88b25fc2f7f9e2f0708ffef?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U4MA==,g_7,xp_5,yp_5/format,f_auto", //小图
        pic_big: 'https://bkimg.cdn.bcebos.com/pic/2f738bd4b31c8701c88b25fc2f7f9e2f0708ffef?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U4MA==,g_7,xp_5,yp_5/format,f_auto',  //大图
        title: "我好像在哪见过你",     //歌曲名
        author: "薛之谦",   //歌手
        file_link: "https://mp32.9ku.com/upload/128/2020/10/21/1010465.mp3",   //播放链接
        file_duration: 279, //歌曲长度
        lrcContent: "[ti:我好像在哪见过你 (《精灵王座》动画电影主题曲)]\n" +
            "[ar:薛之谦]\n" +
            "[al:我好像在哪见过你]\n" +
            "[by:]\n" +
            "[offset:0]\n" +
            "[00:00.00]我好像在哪见过你 - 薛之谦 (Joker)\n" +
            "[00:01.57]词：薛之谦\n" +
            "[00:03.14]曲：薛之谦\n" +
            "[00:04.71]编曲：周以力\n" +
            "[00:06.29]制作人：薛之谦\n" +
            "[00:07.86]配唱制作人：赵英俊\n" +
            "[00:09.43]吉他：张凇\n" +
            "[00:11.01]鼓：陈志昆\n" +
            "[00:12.58]大提琴：吴牧\n" +
            "[00:14.15]混音室：鲍锐\n" +
            "[00:15.73]混音师：鲍锐\n" +
            "[00:17.30]录音助理：王晓海\n" +
            "[00:18.88]和你有关观后无感\n" +
            "[00:24.00]\n" +
            "[00:26.44]若是真的敢问作者何来罪恶\n" +
            "[00:31.62]\n" +
            "[00:34.17]劝人离散有多为难\n" +
            "[00:39.42]\n" +
            "[00:41.79]若美丽的故事来得太晚\n" +
            "[00:46.80]\n" +
            "[00:49.39]所以到哪里都像快乐被燃起\n" +
            "[00:54.82]\n" +
            "[00:57.09]就好像你曾在我隔壁的班级\n" +
            "[01:02.22]\n" +
            "[01:04.82]人们把难言的爱都埋入土壤里\n" +
            "[01:09.93]\n" +
            "[01:12.47]袖手旁观着别人尽力撇清自己\n" +
            "[01:17.90]\n" +
            "[01:21.59]我听见了你的声音\n" +
            "[01:26.83]\n" +
            "[01:29.43]也藏着颗不敢见的心\n" +
            "[01:33.86]\n" +
            "[01:37.20]我躲进挑剔的人群\n" +
            "[01:41.75]\n" +
            "[01:45.11]夜一深就找那颗星星\n" +
            "[01:49.46]\n" +
            "[02:22.13]我以为旅人将我热情都燃尽\n" +
            "[02:27.31]\n" +
            "[02:29.83]你却像一张情书感觉很初级\n" +
            "[02:34.98]\n" +
            "[02:37.52]人们把晚来的爱都锁在密码里\n" +
            "[02:42.73]\n" +
            "[02:45.11]字正腔圆的演说撇清所有关系\n" +
            "[02:51.00]\n" +
            "[02:56.24]我听见了你的声音\n" +
            "[03:00.80]\n" +
            "[03:04.08]也藏着颗不敢见的心\n" +
            "[03:08.63]\n" +
            "[03:11.80]我躲进挑剔的人群\n" +
            "[03:17.66]\n" +
            "[03:19.57]夜一深就找那颗星星\n" +
            "[03:24.17]\n" +
            "[03:27.40]你听不到我的声音\n" +
            "[03:32.76]\n" +
            "[03:35.16]怕脱口而出是你姓名\n" +
            "[03:39.39]\n" +
            "[03:42.96]像确定我要遇见你\n" +
            "[03:47.96]\n" +
            "[03:50.80]就像曾经交换过眼睛\n" +
            "[03:55.16]\n" +
            "[03:58.44]我好像在哪见过你\n" +
            "[04:02.58]\n" +
            "[04:06.22]我好像在哪见过你\n" +
            "[04:10.38]\n" +
            "[04:14.03]我好像在哪见过你\n" +
            "[04:19.08]\n" +
            "[04:22.84]我在劝我该忘了你"
    },
];

const template =
    {
        pic_small: "", //小图
        pic_big: '',  //大图
        title: "",     //歌曲名
        author: "",   //歌手
        file_link: "",   //播放链接
        file_duration: 0, //歌曲长度
        lrcContent: ""
    };

export default SONGS;
