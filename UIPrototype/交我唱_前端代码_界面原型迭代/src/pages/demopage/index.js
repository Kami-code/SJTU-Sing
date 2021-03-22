import { LogLevel, RNFFmpeg, RNFFprobe } from 'react-native-ffmpeg';
import RNFS from 'react-native-fs';

 const ffmpegWatermarkCommand = '-i ' + RNFS.ExternalStorageDirectoryPath+ '/test/wx_camera_1582897957311.mp4 ';
 RNFFmpeg.execute(ffmpegWatermarkCommand).then(result => console.log(`FFmpeg process exited with rc=${result}.`));