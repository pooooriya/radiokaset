import { useContext } from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/es/styles/index.less';
import { appContext } from '@/providers/App';

const Player = () => {
  const { playlist, currentIndex } = useContext(appContext);
  return (
    <ReactJkMusicPlayer
      defaultPosition={{ right: '30px', bottom: '30px' }}
      showMediaSession
      audioLists={playlist}
      showLyric
      autoPlayInitLoadPlayList
      playIndex={currentIndex}
    />
  );
};

export default Player;
