import React from 'react';
import PropTypes from 'prop-types';
import s from './Artist.scss';

const Artist = (props) => {
  return (
    <div className={s.Artist}>
      <div
        className={s.ArtistCover}
        style={{ backgroundImage: `url(/mehard.jpg)` }}
      >
        <div className={s.Artist_overlay} />
      </div>
      <div className={s.ArtistName}>مهراد هیدن</div>
    </div>
  );
};

Artist.propTypes = {};

export default Artist;
