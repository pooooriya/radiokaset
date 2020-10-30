import React from 'react';
import PropTypes from 'prop-types';
import { Carousel, Col, Row } from 'antd';
import s from './Interduction.scss';
import SearchBox from '@/components/SearchBox';

const Interduction = (props) => {
  return (
    <Row
      className={s.cassetteBackground}
      style={{
        backgroundImage:
          'linear-gradient(to right, #00000075, #0000009a),url(/backgroundCassette.jpg);',
      }}
      justify="center"
      align="middle"
    >
      <Col lg={12} xs={20}>
        <SearchBox withBoxshadow />
      </Col>
    </Row>
  );
};

Interduction.propTypes = {};

export default Interduction;
