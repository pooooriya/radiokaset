import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import MusicListItem from './MusicListItem/MusicListItem';
import s from './MusicList.scss';

const MusicList = (props) => {
  return (
    <Row align="middle" justify="center" className={s.musicList}>
      <Col lg={12} xs={24}>
        <h2>بهترین های مهراد هیدن</h2>
        <MusicListItem />
      </Col>
    </Row>
  );
};

MusicList.propTypes = {};

export default MusicList;
