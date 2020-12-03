import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'antd';
import CardItem from './CardItem/CardItem';
import s from './Card.scss';
import Flickity from 'react-flickity-component';
import { appContext } from '../../providers/App';
import { API_URL } from '@/root/env';
import Link from '@/components/Link/Link';
import { hashedID } from '@/root/src/modules/seo';

const Card = ({ title, res, isArtist, subject }) => {
  const audiolist = [];
  const { setPLaylist, setCurrentIndex, playlist } = useContext(appContext);

  const addToPlayList = (index) => {
    if (playlist.length <= 0) {
      res.musics.map((i, index) => {
        audiolist.push({
          name: i?.persianTitle,
          singer: i?.artist?.persianTitle,
          cover: `${API_URL}${i?.cover?.url}`,
          musicSrc: `${API_URL}${i?.musicFile?.url}`,
          lyric: i?.lyrics ? i?.lyrics : '',
          key: index,
          idi: i?.id,
          table: subject,
        });
      });
      setPLaylist(audiolist);
      setCurrentIndex(index);
    } else {
      if (playlist.filter((i) => i.table !== subject).length > 0) {
        res?.musics?.map((i, index) => {
          setPLaylist([]);
          audiolist.push({
            name: i?.persianTitle,
            singer: i?.artist?.persianTitle,
            cover: `${API_URL}${i?.cover?.url}`,
            musicSrc: `${API_URL}${i?.musicFile?.url}`,
            lyric: i?.lyrics ? i?.lyrics : '',
            key: index,
            table: subject,
            idi: i?.id,
          });
        });
        setPLaylist(audiolist);
        setCurrentIndex(index);
      } else {
        setCurrentIndex(index);
      }
    }
  };
  const flickityOptions = {
    dragThreshold: 10,
    freeScroll: true,
    initialIndex: 5,
  };

  return (
    <>
      {title && (
        <Divider orientation="right">
          <span className={s.divider_right}>{title}</span>
          <span className={s.divider_left}>
            <Link
              to={res?.artists?.length > 0 ? `/artist` : `/tags/${subject}`}
            >
              مشاهده همه
            </Link>
          </span>
        </Divider>
      )}

      <Flickity
        className={'carousel'} // default ''
        elementType={'div'} // default 'div'
        options={flickityOptions} // takes flickity options {}
        static // default false
      >
        {!isArtist
          ? res?.musics?.map((i, index) => (
              <>
                <CardItem
                  persianTitle={i.persianTitle}
                  cover={i.cover}
                  file={i.musicFile}
                  artist={i.artist}
                  lyrics={i.lyrics}
                  index={index}
                  onClick={() => addToPlayList(index)}
                />
              </>
            ))
          : res?.artists?.map((i, index) => (
              <Link to={`/artist/${hashedID(i?.id)}`} key={index}>
                <CardItem
                  persianTitle={i.persianTitle}
                  englishTitle={i.englishTitle}
                  cover={i.cover}
                  file={i.musicFile}
                  lyrics={i.lyrics}
                />
              </Link>
            ))}
      </Flickity>
    </>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Card;
