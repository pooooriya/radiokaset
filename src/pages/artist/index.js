import React from 'react';
import PropTypes from 'prop-types';
import Layout from '@/components/Layout/Layout';
import ArtistHeader from '@/components/ArtistHeader/ArtistHeader';
import MusicTable from '@/components/MusicTable/MusicTable';
import { getLastArtistAdded } from '@/api/artist';
import CardItem from '@/components/Card/CardItem/CardItem';

import { Col, Row } from 'antd';

const index = ({ artists }) => {
  console.log(artists);
  return (
    <Layout>
      <Row
        className="pt-5"
        gutter={[24, 24]}
        justify="space-between"
        align="middle"
      >
        {artists?.artists?.map((i) => (
          <Col lg={5}>
            <CardItem
              persianTitle={i?.persianTitle}
              englishTitle={i?.englishTitle}
              cover={i?.cover}
            />
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  let artists;

  try {
    artists = await getLastArtistAdded(50);
  } catch (e) {
    throw new Error('some thing went wrong !!!');
  }
  return {
    props: {
      artists: artists?.data?.data || null,
    },
  };
}

index.propTypes = {};

export default index;
