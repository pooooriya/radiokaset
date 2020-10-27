import React from 'react';
import PropTypes from 'prop-types';
import ReactImageFallback from 'react-image-fallback';
import { API_URL } from '@/root/env';
import s from './GenreCard.scss';

const GenreCard = ({ cover }) => {
  return (
    <div className={s.genre}>
      <ReactImageFallback
        src={`${API_URL}${cover?.url}`}
        fallbackImage={`${API_URL}${cover?.url}`}
      />
    </div>
  );
};

GenreCard.propTypes = {};

export default GenreCard;
