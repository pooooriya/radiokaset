import React from 'react';
import PropTypes from 'prop-types';
import Layout from '@/components/Layout/Layout';
import ArtistHeader from '@/components/ArtistHeader/ArtistHeader';
import MusicTable from '@/components/MusicTable/MusicTable';

const index = (props) => {
  return (
    <Layout>
      <ArtistHeader />
      <MusicTable />
    </Layout>
  );
};

index.propTypes = {};

export default index;
