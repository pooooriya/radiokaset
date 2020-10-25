import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Carousel, Divider, Row } from 'antd';
import CardItem from './CardItem/CardItem';
import s from './Card.scss';
import Flickity from 'react-flickity-component';
import { appContext } from '../../providers/App';
import { API_URL } from '@/root/env';

const Card = ({ title, res, subject }) => {
  const audiolist = [];
  const { setPLaylist, setCurrentIndex } = useContext(appContext);

  const addToPlayList = (index) => {
    res.musics.map((i, index) => {
      audiolist.push({
        name: i?.persianTitle,
        singer: i?.artist?.persianTitle,
        cover: `${API_URL}${i?.cover?.url}`,
        musicSrc: `${API_URL}${i?.musicFile?.url}`,
        lyric: i?.lyrics,
        key: index,
      });
    });
    setPLaylist(audiolist);
    setCurrentIndex(index);
  };
  const flickityOptions = {
    initialIndex: 5,
  };
  return (
    <>
      {title && <Divider orientation="right">{title}</Divider>}
      <Flickity
        className={'carousel'} // default ''
        elementType={'div'} // default 'div'
        options={flickityOptions} // takes flickity options {}
        disableImagesLoaded={false} // default false
        reloadOnUpdate // default false
        static // default false
      >
        {res?.musics.map((i, index) => (
          <CardItem
            persianTitle={i.persianTitle}
            englishTitle={i.persianTitle}
            cover={i.cover}
            file={i.musicFile}
            artist={i.artist}
            lyrics={i.lyrics}
            index={index}
            onClick={addToPlayList}
          />
        ))}
      </Flickity>
    </>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Card;
