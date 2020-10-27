import React from 'react';
import PropTypes from 'prop-types';
import s from './ArtistCard.scss';
import { API_URL } from '@/root/env';

const Artist = ({ cover, persianTitle }) => {
  return (
    <div className={s.Artist}>
      <div
        className={s.ArtistCover}
        style={{ backgroundImage: `url(${API_URL}${cover?.url})` }}
      >
        <div className={s.Artist_overlay} />
      </div>
      <div className={s.ArtistName}>{persianTitle}</div>
    </div>
  );
};

Artist.propTypes = {};

export default Artist;
