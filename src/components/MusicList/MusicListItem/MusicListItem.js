import React from 'react';
import PropTypes from 'prop-types';
import s from './MusicListItem.scss';
import ReactImageFallback from 'react-image-fallback';

const MusicListItem = (props) => {
  return (
    <>
      <div className={s.music}>
        <div className={s.music_info}>
          <ReactImageFallback src="/ali.jpg" className={s.music_info_cover} />
          <h5>اون روز هیچ وقت نمیاد</h5>
        </div>
        <div className={s.music_time}>3:15</div>
      </div>
      <div className={s.music}>
        <div className={s.music_info}>
          <ReactImageFallback src="/ali.jpg" className={s.music_info_cover} />
          <h5>اون روز هیچ وقت نمیاد</h5>
        </div>
        <div className={s.music_time}>3:15</div>
      </div>
      <div className={s.music}>
        <div className={s.music_info}>
          <ReactImageFallback src="/ali.jpg" className={s.music_info_cover} />
          <h5>اون روز هیچ وقت نمیاد</h5>
        </div>
        <div className={s.music_time}>3:15</div>
      </div>
    </>
  );
};

MusicListItem.propTypes = {};

export default MusicListItem;
