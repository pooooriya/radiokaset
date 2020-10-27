import React from 'react';
import PropTypes from 'prop-types';
import { Col, Divider, Row } from 'antd';
import s from './Genre.scss';
import Link from '@/components/Link/Link';
import ReactImageFallback from 'react-image-fallback';
import { API_URL } from '@/root/env';

const Genre = ({ title, res }) => {
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
      <Row justify="center" align="middle">
        {res?.genres?.map((i) => (
          <Col lg={8} sm={12}>
            <ReactImageFallback
              src={`${API_URL}${i?.cover?.url}`}
              fallbackImage={`${API_URL}${i?.cover?.url}`}
              className={s.genre_cover}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

Genre.propTypes = {};

export default Genre;
