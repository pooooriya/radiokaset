import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import s from './ArtistAnalytics.scss';
import Button from '@/components/Button/Button';
import {
  FileTextOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  SafetyCertificateOutlined,
  SearchOutlined,
  WifiOutlined,
} from '@ant-design/icons';
import { appContext } from '@/providers/App';

const ArtistAnalytics = ({ albumLength, musicength }) => {
  return (
    <Row align="middle" justify="space-around" className={s.analytics}>
      <Col>
        <div className={s.analytics_item}>
          <div className={s.analytics_item_icon}>
            <SafetyCertificateOutlined style={{ color: '#018ccc' }} />
          </div>
          <div className={s.analytics_item_count}> {musicength} کاست</div>
        </div>
      </Col>
      <Col>
        <div className={s.analytics_item}>
          <div className={s.analytics_item_icon}>
            <FileTextOutlined style={{ color: '#fff' }} />
          </div>
          <div className={s.analytics_item_count}> {albumLength} آلبوم</div>
        </div>
      </Col>
    </Row>
  );
};

ArtistAnalytics.propTypes = {};

export default ArtistAnalytics;
