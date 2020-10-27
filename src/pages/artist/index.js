import React from 'react';
import PropTypes from 'prop-types';
import Layout from '@/components/Layout/Layout';
import ArtistHeader from '@/components/ArtistHeader/ArtistHeader';
import MusicList from '@/components/MusicList/MusicList';

const index = (props) => {
  return (
    <Layout>
      <ArtistHeader />
      <MusicList />
    </Layout>
  );
};

index.propTypes = {};

export default index;
