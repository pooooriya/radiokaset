import { useContext, useEffect, useRef, useState } from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.module.css';
import { appContext } from '@/providers/App';
import { visitMusic } from '@/api/music';

const Player = () => {
  const {
    playlist,
    currentIndex,
    setIsPlaying,
    setCurrentIndex,
    isPlaying,
  } = useContext(appContext);
  const [currentPlay, setCurrentPlay] = useState(null);

  const visit = async (id) => {
    return await visitMusic(id);
  };

  return (
    <ReactJkMusicPlayer
      defaultPosition={{ right: '30px', bottom: '30px' }}
      showMediaSession
      audioLists={playlist}
      showLyric
      autoPlayInitLoadPlayList
      playIndex={currentIndex}
      showMiniProcessBar
      quietUpdate
      clearPriorAudioLists
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
    />
  );
};

export default Player;
