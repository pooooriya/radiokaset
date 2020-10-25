import { useContext } from 'react';
import PropTypes from 'prop-types';
import s from './CardItem.scss';
import ReactImageFallback from 'react-image-fallback';
import { appContext } from '@/providers/App';
import { API_URL } from '@/root/env';

const Card_Item = ({
  persianTitle,
  englishTitle,
  cover,
  file,
  artist,
  lyrics,
  index,
  isPLaying,
  onClick,
}) => {
  /* 
  [
          {
            name: persianTitle,
            singer: artist.persianTitle,
            cover: `${API_URL}${cover?.url}`,
            musicSrc: `${API_URL}${file?.url}`,
            lyric: lyrics,
          },
        ]
  
  
  */
  return (
    <div className={s.card}>
      <div
        className={s.card_cover}
        style={{ backgroundImage: `url(${API_URL}${cover?.url})` }}
        onClick={() => onClick(index)}
      >
        <div className={s.card_overlay}>
          {isPLaying ? (
            <i className="fa fa-pause" />
          ) : (
            <i className="fa fa-play" />
          )}
        </div>
      </div>
      <div className={s.card_detail}>
        <div className={s.card_detail__title}>{persianTitle}</div>
        <div className={s.card_detail__artist}>{artist?.persianTitle}</div>
      </div>
    </div>
  );
};

Card_Item.propTypes = {};

export default Card_Item;
