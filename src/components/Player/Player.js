import { useContext, useEffect, useRef, useState } from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.module.css';
import { appContext } from '@/providers/App';
import { visitMusic } from '@/api/music';
import { notification } from 'antd';

const Player = () => {
  const {
    playlist,
    currentIndex,
    setIsPlaying,
    setCurrentIndex,
    isPlaying,
  } = useContext(appContext);

  const visit = async (id) => {
    return await visitMusic(id);
  };

  const options = {
    showReload: false,
    showLyric: true,
    autoPlayInitLoadPlayList: true,
    showMiniProcessBar: true,
    quietUpdate: true,
    clearPriorAudioLists: true,
    showMediaSession: true,
  };
  return (
    <ReactJkMusicPlayer
      defaultPosition={{ right: '30px', bottom: '30px' }}
      audioLists={playlist}
      playIndex={currentIndex}
      onAudioEnded={(currentPlayId, audioLists, audioInfo) => {
        audioLists.length > currentIndex + 1
          ? setCurrentIndex(currentIndex + 1)
          : setCurrentIndex(0);
      }}
      onAudioPlay={(audioInfo) => {
        setIsPlaying(true);
        visit(audioInfo?.idi);
      }}
      onAudioPause={() => setIsPlaying(false)}
      {...options}
      onAudioError={() => {
        notification.error({
          message: 'خطا',
          description: 'مشکلی در پخش آهنگ جاری پیش آمده است',
        });
      }}
    />
  );
};

export default Player;
