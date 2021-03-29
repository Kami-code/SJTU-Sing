import React from 'react';
import {RNFFmpeg, RNFFmpegConfig, RNFFprobe, LogLevel} from 'react-native-ffmpeg';
import RNFS from 'react-native-fs';

function ffprint(text) {
    console.log(text.endsWith('\n') ? text.replace('\n', '') : text);
}

export async function executeFFmpeg(command) {
    return await RNFFmpeg.execute(command)
}

export function mergeAudio(file1, file2, output){
    command = '-y -i '+RNFS.ExternalStorageDirectoryPath+file1+' -i '+RNFS.ExternalStorageDirectoryPath+file2+' -filter_complex amix=inputs=2:duration=longest '+RNFS.ExternalStorageDirectoryPath+output
    return executeFFmpeg(command)
}

export function convertFile(input, output){
    command = '-y -i ' + RNFS.ExternalStorageDirectoryPath+ input + ' '+RNFS.ExternalStorageDirectoryPath+output;
    console.log(command)
    return executeFFmpeg(command)
}

export function executeFFmpegCancel() {
    RNFFmpeg.cancel();
}