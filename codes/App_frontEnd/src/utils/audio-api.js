import React from 'react';
import {RNFFmpeg, RNFFmpegConfig, RNFFprobe, LogLevel} from 'react-native-ffmpeg';
import RNFS from 'react-native-fs';
import RNNoise from './rnnoise';
import AECM from './aecm';
import Sox from './sox';
import SaveAudio from './saveAudio';
RNFS.ExternalStorageDirectoryPath
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
export function toSingleChannel(f_in,f_out){//channel = 1 or 2
    ffmpegCommand = '-y -i ' + RNFS.ExternalStorageDirectoryPath+ f_in + ' -ac 1 -ar 48000 ' + RNFS.ExternalStorageDirectoryPath+f_out;
    executeFFmpegAsync(ffmpegCommand, completedExecution => {
        if (completedExecution.returnCode === 0) {
            ffprint("Decode completed successfully.");
        } else {
            ffprint(`Decode failed with rc=${completedExecution.returnCode}.`);
        }
    }
    ).then(executionId => ffprint(`Async FFmpeg process started with arguments \'${ffmpegCommand}\' and executionId ${executionId}.`));
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

export async function saveAudio(path,array){
    try {
        console.log(RNFS.ExternalStorageDirectoryPath+path);
        let msg = await SaveAudio.save(RNFS.ExternalStorageDirectoryPath+path,array);
        console.log(msg);
    }catch (e) {
        console.error(e);
    }
}

//audio.wav music.wav output.xxx
export function mergeAudio(f_in_1, f_in_2, f_out){
    command = '-y -i '+RNFS.ExternalStorageDirectoryPath+f_in_1+' -i '+RNFS.ExternalStorageDirectoryPath+f_in_2+' -filter_complex amix=inputs=2:duration=longest '+RNFS.ExternalStorageDirectoryPath+f_out
    executeFFmpegAsync(ffmpegCommand, completedExecution => {
        if (completedExecution.returnCode === 0) {
            ffprint("Merge completed successfully.");
        } else {
            ffprint(`Merge failed with rc=${completedExecution.returnCode}.`);
        }
    }
    ).then(executionId => ffprint(`Async FFmpeg process started with arguments \'${ffmpegCommand}\' and executionId ${executionId}.`));
}

//input.xxx output.wav
export function decodeToWav(f_in,f_out,channel,sampleRate){//channel = 1 or 2 sampleRate = 16000 or 48000
    ffmpegCommand = '-y -i ' + RNFS.ExternalStorageDirectoryPath+ f_in + ' -acodec pcm_s16le -ac '+channel+' -ar '+sampleRate + ' ' + RNFS.ExternalStorageDirectoryPath+f_out;
    executeFFmpegAsync(ffmpegCommand, completedExecution => {
        if (completedExecution.returnCode === 0) {
            ffprint("Decode completed successfully.");
        } else {
            ffprint(`Decode failed with rc=${completedExecution.returnCode}.`);
        }
    }
    ).then(executionId => ffprint(`Async FFmpeg process started with arguments \'${ffmpegCommand}\' and executionId ${executionId}.`));
}
//input.xxx output.pcm
export function decodeToPcm(f_in,f_out,channel,sampleRate){//channel = 1 or 2 sampleRate = 16000 or 48000
    ffmpegCommand = '-y -i ' + RNFS.ExternalStorageDirectoryPath+ f_in + ' -acodec pcm_s16le -f s16le -ac '+channel+' -ar '+sampleRate + ' ' + RNFS.ExternalStorageDirectoryPath+f_out;
    executeFFmpegAsync(ffmpegCommand, completedExecution => {
        if (completedExecution.returnCode === 0) {
            ffprint("Decode completed successfully.");
        } else {
            ffprint(`Decode failed with rc=${completedExecution.returnCode}.`);
        }
    }
    ).then(executionId => ffprint(`Async FFmpeg process started with arguments \'${ffmpegCommand}\' and executionId ${executionId}.`));
}
//input.pcm output.xxx
export function encodeFromPcm(f_in,f_out,channel){//channel = 1 or 2
    ffmpegCommand = '-y -f s16le -ac '+channel+' -ar 48000 -acodec pcm_s16le -i '+RNFS.ExternalStorageDirectoryPath+f_in+' '+RNFS.ExternalStorageDirectoryPath+f_out
    executeFFmpegAsync(ffmpegCommand, completedExecution => {
        if (completedExecution.returnCode === 0) {
            ffprint("Encode completed successfully.");
        } else {
            ffprint(`Encode failed with rc=${completedExecution.returnCode}.`);
        }
    }
    ).then(executionId => ffprint(`Async FFmpeg process started with arguments \'${ffmpegCommand}\' and executionId ${executionId}.`));
}

//input.wav output.xxx
export function encodeFromWav(f_in,f_out,channel){//channel = 1 or 2
    ffmpegCommand = '-y -ac '+channel+' -ar 48000 -acodec pcm_s16le -i '+RNFS.ExternalStorageDirectoryPath+f_in+' '+RNFS.ExternalStorageDirectoryPath+f_out
    executeFFmpegAsync(ffmpegCommand, completedExecution => {
        if (completedExecution.returnCode === 0) {
            ffprint("Encode completed successfully.");
        } else {
            ffprint(`Encode failed with rc=${completedExecution.returnCode}.`);
        }
    }
    ).then(executionId => ffprint(`Async FFmpeg process started with arguments \'${ffmpegCommand}\' and executionId ${executionId}.`));
}

//input.wav output.pcm
export function WavToPcm(f_in,f_out){
    ffmpegCommand = '-y -i '+RNFS.ExternalStorageDirectoryPath+f_in+' -f s16le '+RNFS.ExternalStorageDirectoryPath+f_out
    executeFFmpegAsync(ffmpegCommand, completedExecution => {
        if (completedExecution.returnCode === 0) {
            ffprint("Encode completed successfully.");
        } else {
            ffprint(`Encode failed with rc=${completedExecution.returnCode}.`);
        }
    }
    ).then(executionId => ffprint(`Async FFmpeg process started with arguments \'${ffmpegCommand}\' and executionId ${executionId}.`));
}
//input.pcm output.wav 采样率必须为48000
export function PcmToWav(f_in,f_out,channel){//channel = 1 or 2
    ffmpegCommand = '-y -f s16le -ac '+channel+' -ar 48000 -i '+RNFS.ExternalStorageDirectoryPath+f_in+' '+RNFS.ExternalStorageDirectoryPath+f_out
    executeFFmpegAsync(ffmpegCommand, completedExecution => {
        if (completedExecution.returnCode === 0) {
            ffprint("Encode completed successfully.");
        } else {
            ffprint(`Encode failed with rc=${completedExecution.returnCode}.`);
        }
    }
    ).then(executionId => ffprint(`Async FFmpeg process started with arguments \'${ffmpegCommand}\' and executionId ${executionId}.`));
}

//输入输出必须是pca，采样率48000，16bit
export function noiseSuppress(f_in,f_out){
    RNNoise.noise_suppress(RNFS.ExternalStorageDirectoryPath+ f_in,RNFS.ExternalStorageDirectoryPath+ f_out);
}

//f_near和f_far必须是wav，采样率16000，f_out也是wav
export function aecm(f_near, f_far, f_out){
    AECM.aec(RNFS.ExternalStorageDirectoryPath+ f_near,RNFS.ExternalStorageDirectoryPath+ f_far,RNFS.ExternalStorageDirectoryPath+ f_out);
}

export function sox_test(infile,outfile){
    console.log(RNFS.ExternalStorageDirectoryPath+infile);
    if(Sox.init(RNFS.ExternalStorageDirectoryPath+infile,RNFS.ExternalStorageDirectoryPath+outfile)){
        console.log("init failed");
    }
    else{
        console.log("init success"); 
       } 
    
    if(Sox.add_effect("echo",{})==1){
        console.log("echo failed");
    }
    else{
        console.log("echo success");
    }
    Sox.add_effect("chorus",{});
    Sox.flow();
    
}

export function noiseSuppress_mp3(f_in,f_decode,f_noise,f_out,channel){//channel = 1 or 2
    ffmpegCommand = '-y -i ' + RNFS.ExternalStorageDirectoryPath+ f_in + ' -acodec pcm_s16le -f s16le -ac '+channel+' -ar 48000 ' + RNFS.ExternalStorageDirectoryPath+f_decode
    executeFFmpegAsync(ffmpegCommand, completedExecution => {
        if (completedExecution.returnCode === 0) {
            ffprint("Decode completed successfully.");
        } else {
            ffprint(`Decode failed with rc=${completedExecution.returnCode}.`);
        }
        noiseSuppress(f_decode,f_noise)
        encodeFromPca(f_noise,f_out,channel)
        ffprint(RNFS.CachesDirectoryPath);
    }
    ).then(executionId => ffprint(`Async FFmpeg process started with arguments \'${ffmpegCommand}\' and executionId ${executionId}.`));
}

