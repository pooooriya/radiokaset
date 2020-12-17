import React from 'react';
import s from './podcast.scss';
import { Col, Divider, Row } from 'antd';
import CardItem from '@/components/Card/CardItem/CardItem';
import MusicTable from '@/components/MusicTable/MusicTable';
import { v4 as uuidv4 } from 'uuid';

const Podcast = ({ episodes, isPlaylist }) => {
  return (
    <Row className={s.podcast} justify="center" align="middle">
      <Col xs={24} lg={16} className={s.podcast_main}>
        <CardItem
          cover={episodes?.cover}
          artist={episodes}
          persianTitle={episodes?.persianTitle}
          ispodcast
        />
        <div className={s.podcast_detail}>
          <h1>
            {!isPlaylist
              ? `پادکست ${episodes?.persianTitle || ''}`
              : `پلی لیست ${episodes?.persianTitle || ''}`}
          </h1>
          <h2>{episodes?.description || ''}</h2>
        </div>
        <Divider orientation="center" className={s.dvider}>
          {isPlaylist
            ? `${episodes?.music?.length} کاست` || ''
            : `تمامی قسمت های ${episodes?.persianTitle}` || ''}
        </Divider>

        <MusicTable data={episodes?.music} subjects={uuidv4()} ispodcast />
      </Col>
    </Row>
  );
};

Podcast.propTypes = {};

export default Podcast;
