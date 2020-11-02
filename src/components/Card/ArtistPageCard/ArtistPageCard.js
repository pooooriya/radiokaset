import React from 'react';
import PropTypes from 'prop-types';
import s from './ArtistPageCard.scss';
import Link from '@/components/Link/Link';
import Button from '@/components/Button/Button';
import { API_URL } from '@/root/env';
import { FileTextOutlined, PlayCircleOutlined } from '@ant-design/icons';
import ReactImageFallback from 'react-image-fallback';

const ArtistPageCard = ({ persianTitle, id, englishTitle, cover, title }) => {
  return (
    <div className={s.artists}>
      <ReactImageFallback
        src={`${API_URL}${cover?.url}`}
        className={s.artists_cover_inner}
      />

      <div className={s.artists_cover}>
        <div className={s.artists_cover_overlay}>
          <PlayCircleOutlined className={s.play_icon} />
        </div>
        <div className={s.artists_cover_info}>
          <h2>{englishTitle}</h2>
          <h4>{persianTitle}</h4>
        </div>
      </div>
    </div>
  );
};

ArtistPageCard.propTypes = {};

export default ArtistPageCard;
