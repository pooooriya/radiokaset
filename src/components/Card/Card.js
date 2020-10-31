import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Carousel, Divider, Row } from 'antd';
import CardItem from './CardItem/CardItem';
import s from './Card.scss';
import Flickity from 'react-flickity-component';
import { appContext } from '../../providers/App';
import { API_URL } from '@/root/env';
import Link from '@/components/Link/Link';
import ArtistCard from '@/components/Card/ArtistCard/ArtistCard';

const Card = ({ title, res, isArtist }) => {
  const audiolist = [];
  const { setPLaylist, setCurrentIndex } = useContext(appContext);

  const addToPlayList = (index) => {
    res.musics.map((i, index) => {
      audiolist.push({
        name: i?.persianTitle,
        singer: i?.artist?.persianTitle,
        cover: `${API_URL}${i?.cover?.url}`,
        musicSrc: `${API_URL}${i?.musicFile?.url}`,
        lyric: i?.lyrics ? i?.lyrics : '',
        key: index,
      });
    });
    setPLaylist(audiolist);
    setCurrentIndex(index);
  };
  const flickityOptions = {
    wrapAround: true,
    pauseAutoPlayOnHover: false,
    dragThreshold: 10,
    lazyLoad: true,
    lazyLoad: 8,
  };

  return (
    <>
      {title && (
        <Divider orientation="right">
          <span className={s.divider_right}>{title}</span>
          <span className={s.divider_left}>
            <Link>مشاهده همه</Link>
          </span>
        </Divider>
      )}

      <Flickity
        className={'carousel'} // default ''
        elementType={'div'} // default 'div'
        options={flickityOptions} // takes flickity options {}
        disableImagesLoaded={false} // default false
        reloadOnUpdate // default false
        static // default false
      >
        {!isArtist
          ? res?.musics?.map((i, index) => (
              <>
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
              </>
            ))
          : res?.artists?.map((i) => (
              <ArtistCard
                persianTitle={i.persianTitle}
                englishTitle={i.englishTitle}
                cover={i.cover}
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
