import { useContext, useEffect, useRef, useState } from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.module.css';
import { appContext } from '@/providers/App';
import { visitMusic } from '@/api/music';
import { notification } from 'antd';
import Link from '@/components/Link/Link';

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

  const customLocale = {
    playModeText: {
      order: 'پخش کاست به ترتیب',
      orderLoop: 'پخش مکرر کاست فعلی',
      singleLoop: 'این کاست یکبار پخش شود',
      shufflePlay: 'پخش شانسی کاست ها',
    },
    openText: 'بازش کن',
    closeText: 'بستن',
    emptyText: 'کاستی برای پخش وجود ندارد',
    clickToPlayText: 'پلی کردن کاست',
    clickToPauseText: 'متوقف کردن پخش کاست',
    nextTrackText: 'بزن کاست بعدی',
    previousTrackText: 'بزن کاست قبلی',
    reloadText: 'کاست رو مجدد ریلود کن',
    volumeText: 'صدای کاست',
    playListsText: 'پلی لیستی از کاست ها',
    toggleLyricText: 'تکست کاست ها رو باز کن',
    toggleMiniModeText: 'تبدیل به حالت مینی',
    destroyText: 'پلیر را کاملا ببند',
    downloadText: 'دانلود کاست',
    lightThemeText: 'پلیر با تم روشن',
    darkThemeText: 'پلیر با تم تیره',
    switchThemeText: 'تم پلیر را تغییر بده',
    removeAudioListsText: 'کاست ها رو حذف کن',
    emptyLyricText:
      'اینجا شعری براش ثبت نکردیم برو رو آیکون تکست روی آهنگ کلیک کن اونجا تکستشو برات نوشتیم',
  };

  const options = {
    showReload: true,
    showLyric: false,
    autoPlayInitLoadPlayList: true,
    showMiniProcessBar: true,
    quietUpdate: true,
    clearPriorAudioLists: true,
    showMediaSession: true,
    showThemeSwitch: false,
    autoPlay: true,
  };
  return (
    <ReactJkMusicPlayer
      locale={customLocale}
      defaultPosition={{ right: '30px', bottom: '65px' }}
      audioLists={playlist}
      playIndex={currentIndex}
      renderAudioTitle={(a, b) => (
        <div className="playerTitle">
          <Link to="#" className="playerTitle_artist">
            {a.singer}
          </Link>
          <Link to="#" className="playerTitle_song">
            {a.name}
          </Link>
        </div>
      )}
      onAudioPlay={(audioInfo) => {
        setCurrentIndex(audioInfo?.key);
        setIsPlaying(true);
        visit(audioInfo?.idi);
        // if (localStorage.getItem('singer') !== audioInfo?.singer) {
        //   localStorage.setItem('singer', audioInfo.singer);
        // }
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
