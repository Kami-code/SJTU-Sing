from pydub import AudioSegment


def trans_mp3_to_wav(origin_filepath, target_filepath):
    song = AudioSegment.from_mp3(origin_filepath)
    song.export(target_filepath, format="wav")


def trans_wav_to_mp3(origin_filepath, target_filepath):
    song = AudioSegment.from_wav(origin_filepath)
    song.export(target_filepath, format="mp3")


if __name__ == '__main__':
    trans_wav_to_mp3("test_Vocals.wav", "my_mp3.mp3")
