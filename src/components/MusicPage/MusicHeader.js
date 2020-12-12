import React from 'react';
import PropTypes from 'prop-types';
import { Affix, Col, Divider, Row } from 'antd';
import s from './MusicHeader.scss';
import CardItem from '@/components/Card/CardItem/CardItem';
import MusicInfo from '@/components/MusicPage/MusicInfo';

const musicHeader = ({ music, ispodcast }) => {
  return (
    <Row className={s.musicHeader} align="bottom">
      <Col xs={24}>
        <Row className={s.musicHeader_main}>
          <Col>
            <CardItem
              cover={music?.cover}
              persianTitle={music?.persianTitle}
              artist={ispodcast ? music : music?.artist}
              ispodcast
            />
          </Col>
          <Col lg={14} xs={0} className={s.musicHeader_info}>
            <MusicInfo data={music} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

musicHeader.propTypes = {};

export default musicHeader;
