import React from 'react';
import PropTypes from 'prop-types';
import s from './ArtistHeader.scss';
import { Col, Row } from 'antd';
import ReactImageFallback from 'react-image-fallback';
import Button from '@/components/Button/Button';

const ArtistHeader = (props) => {
  return (
    <Row
      className={s.artistHeader}
      style={{
        background: 'linear-gradient(45deg, #303030, #fffdfd00),url(/back.jpg)',
      }}
    >
      <Col lg={5} className={s.artistHeader_info}>
        <h1>Mehrad Hidden</h1>
        <h2>مهراد هیدن</h2>
        <h4>
          مهراد مستوفی راد معروف به مهراد هیدن متولد 24 آذر 1363 در تهران،
          خواننده و آهنگ ساز ایرانی می‌باشد که در سبک رپ و راک و هیپ هاپ آغاز
          کرده‌است...
        </h4>
        <Button type="warning" ghost>
          مشاهده بیوگرافی کامل
        </Button>
      </Col>
    </Row>
  );
};

ArtistHeader.propTypes = {};

export default ArtistHeader;
