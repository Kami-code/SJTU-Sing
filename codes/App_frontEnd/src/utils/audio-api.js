import React from 'react';
import {RNFFmpeg, RNFFmpegConfig, RNFFprobe, LogLevel} from 'react-native-ffmpeg';
import RNFS from 'react-native-fs';
import RNNoise from './native'

function ffprint(text) {
    console.log(text.endsWith('\n') ? text.replace('\n', '') : text);
}

export async function executeFFmpeg(command) {
    return await RNFFmpeg.execute(command)
}

export async function executeFFmpegAsync(command, callback) {
    return await RNFFmpeg.executeAsync(command, callback);
}

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

export function executeFFmpegCancel() {
    RNFFmpeg.cancel();
}

export function decode(f_in,f_decode,f_noise,f_out,channel){//channel = 1 or 2
    ffmpegCommand = '-y -i ' + RNFS.ExternalStorageDirectoryPath+ f_in + ' -acodec pcm_s16le -f s16le -ac '+channel+' -ar 48000 ' + RNFS.ExternalStorageDirectoryPath+f_decode
    executeFFmpegAsync(ffmpegCommand, completedExecution => {
        if (completedExecution.returnCode === 0) {
            ffprint("Decode completed successfully.");
        } else {
            ffprint(`Decode failed with rc=${completedExecution.returnCode}.`);
        }
        noiseSuppress(f_decode,f_noise)
        encode(f_noise,f_out,channel)
        ffprint(RNFS.CachesDirectoryPath);
    }
    ).then(executionId => ffprint(`Async FFmpeg process started with arguments \'${ffmpegCommand}\' and executionId ${executionId}.`));
}

export function encode(f_in,f_out,channel){//channel = 1 or 2
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

export function noiseSuppress(f_in,f_out){
    RNNoise.noise_suppress(RNFS.ExternalStorageDirectoryPath+ f_in,RNFS.ExternalStorageDirectoryPath+ f_out)
}




