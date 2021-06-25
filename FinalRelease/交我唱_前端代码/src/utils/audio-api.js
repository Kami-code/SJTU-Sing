import React from 'react';
import {RNFFmpeg, RNFFmpegConfig, RNFFprobe, LogLevel} from 'react-native-ffmpeg';
import RNFS from 'react-native-fs';
import RNNoise from './rnnoise';
import AECM from './aecm';
import Sox from './sox';
import SaveAudio from './saveAudio';

function ffprint(text) {
    console.log(text.endsWith('\n') ? text.replace('\n', '') : text);
}

export async function executeFFmpeg(command) {
    return await RNFFmpeg.execute(command)
}

export async function executeFFmpegAsync(command, callback) {
    return await RNFFmpeg.executeAsync(command, callback);
}

export function executeFFmpegCancel() {
    RNFFmpeg.cancel();
}
export async function toStero(f_in,f_out){//channel = 1 or 2
    ffmpegCommand = `-y -i ${f_in} -ac 2 -ar 48000 ${f_out}`;
    return await RNFFmpeg.execute(ffmpegCommand);
    

}

function readFile(fileName) {
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, (err, data) => {
        if(err) {
          reject(err)
        }
        resolve(data.toString())
      })
    })
  }

export async function saveAudio(path,array,offset){
    try {
        console.log(path);
        let msg = await SaveAudio.save(path,array,offset);
        console.log(msg);
    }catch (e) {
        console.error(e);
    }
}

//audio.wav music.wav output.xxx
export async function mergeAudio(f_in_1, f_in_2, f_out){
    ffmpegCommand = `-y -i ${f_in_1} -i ${f_in_2} -filter_complex amix=inputs=2:duration=longest ${f_out}`;
    return await RNFFmpeg.execute(ffmpegCommand);
}

export async function amplify(f_in, f_out,num_db){
    if(num_db>0){ffmpegCommand = `-y -i ${f_in} -filter "volume = ${num_db}dB" ${f_out}`;}
    else{ffmpegCommand = `-y -i ${f_in} -filter "volume = -${-num_db}dB" ${f_out}`}
    return await RNFFmpeg.execute(ffmpegCommand);
}

//input.xxx output.wav
export async function decodeToWav(f_in,f_out,channel,sampleRate){//channel = 1 or 2 sampleRate = 16000 or 48000
    ffmpegCommand = `-y -i ${f_in} -acodec pcm_s16le -ac ${channel} -ar ${sampleRate} ${f_out}`;
    return await RNFFmpeg.execute(ffmpegCommand);
}
//input.xxx output.pcm
// export function decodeToPcm(f_in,f_out,channel,sampleRate){//channel = 1 or 2 sampleRate = 16000 or 48000
//     ffmpegCommand = '-y -i ' + RNFS.ExternalStorageDirectoryPath+ f_in + ' -acodec pcm_s16le -f s16le -ac '+channel+' -ar '+sampleRate + ' ' + RNFS.ExternalStorageDirectoryPath+f_out;
//     executeFFmpegAsync(ffmpegCommand, completedExecution => {
//         if (completedExecution.returnCode === 0) {
//             ffprint("Decode completed successfully.");
//         } else {
//             ffprint(`Decode failed with rc=${completedExecution.returnCode}.`);
//         }
//     }
//     ).then(executionId => ffprint(`Async FFmpeg process started with arguments \'${ffmpegCommand}\' and executionId ${executionId}.`));
// }
//input.pcm output.xxx
// export function encodeFromPcm(f_in,f_out,channel){//channel = 1 or 2
//     ffmpegCommand = '-y -f s16le -ac '+channel+' -ar 48000 -acodec pcm_s16le -i '+RNFS.ExternalStorageDirectoryPath+f_in+' '+RNFS.ExternalStorageDirectoryPath+f_out
//     return await RNFFmpeg.execute(ffmpegCommand);
// }

// input.wav output.xxx
export async function encodeFromWav(f_in,f_out,channel){//channel = 1 or 2
    ffmpegCommand = `-y -i ${f_in} -f mp3 -acodec libmp3lame -y ${f_out}`;
    return await RNFFmpeg.execute(ffmpegCommand);
}

//input.wav output.pcm
// export function WavToPcm(f_in,f_out){
//     ffmpegCommand = '-y -i '+RNFS.ExternalStorageDirectoryPath+f_in+' -f s16le '+RNFS.ExternalStorageDirectoryPath+f_out
//     executeFFmpegAsync(ffmpegCommand, completedExecution => {
//         if (completedExecution.returnCode === 0) {
//             ffprint("Encode completed successfully.");
//         } else {
//             ffprint(`Encode failed with rc=${completedExecution.returnCode}.`);
//         }
//     }
//     ).then(executionId => ffprint(`Async FFmpeg process started with arguments \'${ffmpegCommand}\' and executionId ${executionId}.`));
// }
// //input.pcm output.wav 采样率必须为48000
// export function PcmToWav(f_in,f_out,channel){//channel = 1 or 2
//     ffmpegCommand = '-y -f s16le -ac '+channel+' -ar 48000 -i '+RNFS.ExternalStorageDirectoryPath+f_in+' '+RNFS.ExternalStorageDirectoryPath+f_out
//     executeFFmpegAsync(ffmpegCommand, completedExecution => {
//         if (completedExecution.returnCode === 0) {
//             ffprint("Encode completed successfully.");
//         } else {
//             ffprint(`Encode failed with rc=${completedExecution.returnCode}.`);
//         }
//     }
//     ).then(executionId => ffprint(`Async FFmpeg process started with arguments \'${ffmpegCommand}\' and executionId ${executionId}.`));
// }

//输入输出必须是pcm，采样率48000，16bit
export function noiseSuppress(f_in,f_out){
    RNNoise.noise_suppress(RNFS.ExternalStorageDirectoryPath+ f_in,RNFS.ExternalStorageDirectoryPath+ f_out);
}

//f_near和f_far必须是wav，采样率16000，f_out也是wav
export function aecm(f_near, f_far, f_out){
    AECM.aec(RNFS.ExternalStorageDirectoryPath+ f_near,RNFS.ExternalStorageDirectoryPath+ f_far,RNFS.ExternalStorageDirectoryPath+ f_out);
}

export async function default_sox(infile,outfile,reverbStyle,equalStyle){
    let tempPath0 = `${RNFS.CachesDirectoryPath }/tmp0.wav`
    let tempPath1 = `${RNFS.CachesDirectoryPath }/tmp1.wav`;
    let tempPath2 = `${RNFS.CachesDirectoryPath }/tmp2.wav`;
    let tempPath3 = `${RNFS.CachesDirectoryPath }/tmp3.wav`;
    let msg;
    let echo = [10,20,100,1000];
    let stereoDepth = [10,20,100,80];
    let roomScale = [10,10,100,90];
    let vol = [5,15,10,20];
    let equal = [[0,0,0,0,0,0,0,0,0,0],
            [12,8,-8,12,-4,0,8,16,20,20],
            [8,12,16,8,-4,0,8,12,16,20],
            [8,10,4,-12,0,0,10,4,16,10]]
    // msg = await toStero(infile,tempPath0);
    // console.log(msg);
    msg = await Sox.init(infile,tempPath1);
    console.log(msg);
    msg = await Sox.add_effect("echo",{"delay": Math.round(echo[reverbStyle]/3)});
    console.log(msg);
    msg = await Sox.add_effect("echo",{"delay": Math.round(echo[reverbStyle]/3*2)});
    console.log(msg);
    msg = await Sox.add_effect("echo",{"delay": echo[reverbStyle]});
    console.log(msg);
    msg = await Sox.add_effect("reverb",{"wetOnly":true,"reverbrance":50,"hfDamping":50,"roomScale":roomScale[reverbStyle],"stereoDepth":stereoDepth[reverbStyle],"preDelay":30,"wetGain":0});
    console.log(msg);
    msg = await Sox.add_effect("vol",{"volume":vol[reverbStyle]});
    // console.log(msg);
    msg = await Sox.flow();
    console.log(msg);

    msg = await Sox.init(infile,tempPath2);
    console.log(msg);
    msg = await Sox.add_effect("vol",{"volume":15});
    console.log(msg);
    msg = await Sox.flow();
    console.log(msg);

    await mergeAudio(tempPath1,tempPath2,tempPath3);

    msg = await Sox.init(tempPath3,outfile);
    console.log(msg);
    msg = await Sox.add_effect("equalizer",{"frequency":31,"bandWidth":1.25,"gain":equal[equalStyle][0]});
    console.log(msg);
    msg = await Sox.add_effect("equalizer",{"frequency":62,"bandWidth":1.25,"gain":equal[equalStyle][1]});
    console.log(msg);
    msg = await Sox.add_effect("equalizer",{"frequency":125,"bandWidth":1.25,"gain":equal[equalStyle][2]});
    console.log(msg);
    msg = await Sox.add_effect("equalizer",{"frequency":250,"bandWidth":1.25,"gain":equal[equalStyle][3]});
    console.log(msg);
    msg = await Sox.add_effect("equalizer",{"frequency":500,"bandWidth":1.25,"gain":equal[equalStyle][4]});
    console.log(msg);
    msg = await Sox.add_effect("equalizer",{"frequency":1000,"bandWidth":1.25,"gain":equal[equalStyle][5]});
    console.log(msg);
    msg = await Sox.add_effect("equalizer",{"frequency":2000,"bandWidth":1.25,"gain":equal[equalStyle][6]});
    console.log(msg);
    msg = await Sox.add_effect("equalizer",{"frequency":4000,"bandWidth":1.25,"gain":equal[equalStyle][7]});
    console.log(msg);
    msg = await Sox.add_effect("equalizer",{"frequency":8000,"bandWidth":1.25,"gain":equal[equalStyle][8]});
    console.log(msg);
    msg = await Sox.add_effect("equalizer",{"frequency":16000,"bandWidth":1.25,"gain":equal[equalStyle][9]});
    console.log(msg);
    // msg = await Sox.add_effect("compand",{});
    // console.log(msg);


    msg = await Sox.flow();
    console.log(msg);
    return Promise.resolve(msg);
}

// export function noiseSuppress_mp3(f_in,f_decode,f_noise,f_out,channel){//channel = 1 or 2
//     ffmpegCommand = '-y -i ' + RNFS.ExternalStorageDirectoryPath+ f_in + ' -acodec pcm_s16le -f s16le -ac '+channel+' -ar 48000 ' + RNFS.ExternalStorageDirectoryPath+f_decode
//     executeFFmpegAsync(ffmpegCommand, completedExecution => {
//         if (completedExecution.returnCode === 0) {
//             ffprint("Decode completed successfully.");
//         } else {
//             ffprint(`Decode failed with rc=${completedExecution.returnCode}.`);
//         }
//         noiseSuppress(f_decode,f_noise)
//         encodeFromPca(f_noise,f_out,channel)
//         ffprint(RNFS.CachesDirectoryPath);
//     }
//     ).then(executionId => ffprint(`Async FFmpeg process started with arguments \'${ffmpegCommand}\' and executionId ${executionId}.`));
// }

