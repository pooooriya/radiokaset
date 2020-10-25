import React from 'react';
import PropTypes from 'prop-types';
import Layout from '@/components/Layout/Layout';
import Landing from '@/components/Landing/Landing';

const index = (props) => {
  return (
    <Layout>
      <Landing />
    </Layout>
  );
};

index.propTypes = {};

export default index;
