import s from './CardItem.scss';
import Link from '@/components/Link/Link';
import Button from '@/components/Button/Button';
import { API_URL } from '@/root/env';
import { FileTextOutlined, PlayCircleOutlined } from '@ant-design/icons';
import ReactImageFallback from 'react-image-fallback';

const Card_Item = ({
  persianTitle,
  cover,
  artist,
  onClick,
  ispodcast,
  fallbackImage,
}) => {
  return (
    <div className={s.artists} onClick={() => onClick()}>
      <ReactImageFallback
        src={`${API_URL}${cover?.url}`}
        className={s.artists_cover_inner}
        fallbackImage={fallbackImage}
      />

      <div className={s.artists_cover}>
        <div className={s.artists_cover_overlay}>
          <PlayCircleOutlined className={s.play_icon} />
        </div>
        <div className={s.artists_cover_info}>
          <h3>{ispodcast ? artist?.englishTitle : artist?.persianTitle}</h3>
          <h4>{persianTitle}</h4>
        </div>
      </div>
    </div>
  );
};

Card_Item.propTypes = {};

export default Card_Item;
