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

  console.log(currentIndex);

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
      // playIndex={currentIndex}
      onAudioPlay={(audioInfo) => {
        setIsPlaying(true);
        visit(audioInfo?.idi);
      }}
      onAudioPause={() => setIsPlaying(false)}
      {...options}
    />
  );
};

export default Player;
