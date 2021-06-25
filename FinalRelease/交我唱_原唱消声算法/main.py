#encoding=gbk

from flask import Flask, redirect, url_for, request, jsonify, Response
from flask_cors import CORS
import base64
import os
import json
import random
import converter


app = Flask(__name__)
# CORS(app, supports_credentials=True)


@app.route('/audio', methods=["POST", "GET"])
def api_post_audio_blob():
    if request.method == 'POST':
        ID = request.form['id']
        origin_path = '/root/audioData/music/' + ID + ".mp3"
        instrument_target_dir = '/root/audioData/flask/'
        mp3_instrument_target_path = '/root/audioData/flask/' + ID + ".mp3"
        mp3_vocal_target_path = '/root/audioData/vocal/' + ID + ".mp3"
        wav_instrument_target_path = '/root/audioData/flask/' + ID + ".wav"
        wav_vocal_target_path = '/root/audioData/vocal/' + ID + ".wav"
        vocal_target_dir = '/root/audioData/vocal/'
        print(origin_path)
        if not os.path.exists(origin_path):
            return Response(json.dumps({'result': "origin music file not found!"}), content_type='application/json')
        if os.path.exists(mp3_instrument_target_path) and os.path.exists(mp3_vocal_target_path):
            return Response(json.dumps({'result': "accompaniment existed!"}), content_type='application/json')
        if os.path.exists(wav_instrument_target_path) and os.path.exists(wav_vocal_target_path):
            converter.trans_wav_to_mp3(wav_instrument_target_path, ID + ".mp3")
            os.system('cp ./' + ID + ".mp3 " + instrument_target_dir)
            converter.trans_wav_to_mp3(wav_vocal_target_path, ID + ".mp3")
            os.system('cp ./' + ID + ".mp3 " + vocal_target_dir)
            os.system('rm -f ./' + ID + ".mp3")
        else:
            os.system('python inference.py --input ' + origin_path)
            os.system('mv ./' + ID + "_Instruments.wav " + ID + ".wav")
            converter.trans_wav_to_mp3(ID + ".wav", ID + ".mp3")
            os.system('cp ./' + ID + ".wav " + instrument_target_dir)
            os.system('cp ./' + ID + ".mp3 " + instrument_target_dir)   # mp3和wav全copy过去
            os.system('mv ./' + ID + "_Vocals.wav " + ID + ".wav")
            converter.trans_wav_to_mp3(ID + ".wav", ID + ".mp3")
            os.system('cp ./' + ID + ".wav " + vocal_target_dir)
            os.system('cp ./' + ID + ".mp3 " + vocal_target_dir)        # mp3和wav全copy过去
            os.system('rm -f ./' + ID + ".wav")
            os.system('rm -f ./' + ID + ".mp3")
        if os.path.exists(mp3_instrument_target_path) and os.path.exists(mp3_vocal_target_path):
            return Response(json.dumps({'result': "accompaniment created!"}), content_type='application/json')
        else:
            return Response(json.dumps({'result': "internal error!"}), content_type='application/json')
    else:
        return Response(json.dumps({'response': "this is a get."}), content_type='application/json')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
