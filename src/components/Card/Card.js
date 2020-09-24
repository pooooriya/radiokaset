import React from 'react';
import PropTypes from 'prop-types';
import { Carousel, Divider, Row } from 'antd';
import CardItem from './CardItem/CardItem';
import s from './Card.scss';

const Card = ({ title }) => {
  return (
    <>
      {title && <Divider orientation="right">{title}</Divider>}
      <Carousel
        autoplay={false}
        slidesToShow={6}
        slidesToScroll
        swipeToSlide
        infinite={false}
        swipe
        dots={false}
        arrows={!0}
        draggable
        responsive={[
          {
            breakpoint: 2500,
            settings: {
              slidesToShow: 6,
            },
          },
          {
            breakpoint: 1920,
            settings: {
              slidesToShow: 6,
            },
          },
          {
            breakpoint: 1750,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 1366,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoinlt: 768,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
      ></Carousel>
    </>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Card;
