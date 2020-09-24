import React from 'react';
import PropTypes from 'prop-types';
import s from './CardItem.scss';
import ReactImageFallback from 'react-image-fallback';

const Card_Item = (props) => {
  return (
    <div className={s.card}>
      <div
        className={s.card_cover}
        style={{ backgroundImage: `url(/download.jpeg)` }}
      />
      <div className={s.card_detail}>
        <div className={s.card_detail__title}>تونل۲</div>
        <div className={s.card_detail__artist}>مهراد هیدن </div>
      </div>
    </div>
  );
};

Card_Item.propTypes = {};

export default Card_Item;
