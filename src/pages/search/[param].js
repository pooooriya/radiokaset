import React, { memo } from 'react';
import Layout from '@/components/Layout/Layout';
import ArtistPageCard from '../../components/Card/ArtistPageCard/ArtistPageCard';
import Link from '@/components/Link/Link';
import { Col, Row } from 'antd';
import { searchMusic, searchArtist } from '@/api/music';

const index = ({ search }) => {
  return (
    <Layout>
      <Row className="pt-5" gutter={[24, 24]} justify="center" align="middle">
        {search?.map((i) => (
          <Col xl={3} lg={5} xs={12} sm={8} md={6}>
            <Link to={`/artists/${i?.artist?.id ? i?.artist?.id : i?.id}`}>
              <ArtistPageCard
                persianTitle={i?.persianTitle}
                englishTitle={i?.englishTitle}
                cover={i?.cover}
              />
            </Link>
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  let search;

  try {
    search = await searchMusic(params?.param);
    if (search?.data?.length <= 0) {
      search = await searchArtist(params?.param);
    }
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      search: search?.data || null,
    },
  };
}

index.propTypes = {};

export default memo(index);
