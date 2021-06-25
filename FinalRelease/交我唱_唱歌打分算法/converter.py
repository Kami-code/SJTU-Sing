# encoding=gbk
from pydub import AudioSegment


def trans_mp3_to_wav(origin_filepath, target_filepath):
    song = AudioSegment.from_mp3(origin_filepath)
    song.export(target_filepath, format="wav")


def trans_wav_to_mp3(origin_filepath, target_filepath):
    song = AudioSegment.from_wav(origin_filepath)
    song.export(target_filepath, format="mp3")


def get_second_part_from_mp3_to_wav(main_mp3_path, start_time, end_time, part_wav_path):
    print(main_mp3_path)
    print(part_wav_path)
    """
    ��Ƶ��Ƭ����ȡ������Ƶ����λ��
    :param main_mp3_path: ԭ��Ƶ�ļ�·��
    :param start_time: ��ȡ�Ŀ�ʼʱ��
    :param end_time: ��ȡ�Ľ���ʱ��
    :param part_wav_path: ��ȡ�����Ƶ·��
    :return:
    """
    start_time = int(start_time * 1000)
    end_time = int(end_time * 1000)

    sound = AudioSegment.from_mp3(main_mp3_path)
    word = sound[start_time:end_time]

    word.export(part_wav_path, format="wav")
