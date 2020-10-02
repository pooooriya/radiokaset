import React from 'react';
import PropTypes from 'prop-types';
import s from './Player.scss';
import {
  BackwardOutlined,
  CaretRightOutlined,
  ForwardOutlined,
} from '@ant-design/icons';
import { Slider } from 'antd';

const Player = (props) => {
  return (
    <div className={s.player}>
      <div className={s.actions}>
        <ForwardOutlined />
        <CaretRightOutlined />
        <BackwardOutlined />
      </div>
    </div>
  );
};

Player.propTypes = {};

export default Player;
