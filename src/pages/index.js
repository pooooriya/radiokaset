import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout/Layout';
import Card from '@/components/Card/Card';
import { Divider, Carousel } from 'antd';
import ReactImageFallback from 'react-image-fallback';
import Landing from '@/components/Landing/Landing';

const index = (props) => {
  return (
    <Layout>
      <Landing />
    </Layout>
  );
};
export default index;
