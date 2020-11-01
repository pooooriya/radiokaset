import { useContext, useRef } from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.module.css';
import { appContext } from '@/providers/App';

const Player = () => {
  const { playlist, currentIndex, setIsPlaying, setCurrentIndex } = useContext(
    appContext
  );

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
      onAudioPlay={() => setIsPlaying(true)}
      onAudioPause={() => setIsPlaying(false)}
    />
  );
};

export default Player;
