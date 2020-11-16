import React, { useEffect, useState, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Layout from '@/components/Layout/Layout';
import InfiniteScroll from 'react-infinite-scroller';
import ArtistPageCard from '@/components/Card/ArtistPageCard/ArtistPageCard';
import Link from '@/components/Link/Link';
import { Col, Row } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { getGenres, getMoreGenres } from '@/api/genre';

const index = ({ genres }) => {
  const [loadmore, setLoadmore] = useState(false);
  const [loading, setloading] = useState(
    genres?.genres.length < 20 ? false : true
  );
  const [start, setStart] = useState(20);
  const [data, setData] = useState(genres?.genres);

  useEffect(() => {
    if (loadmore) {
      const fetchMore = async () => {
        await getMoreGenres(start, 20).then((res) => {
          setLoadmore(false);
          setStart(start + 20);
          setData([...data, ...res?.data?.data?.genres]);
          if (res?.data?.data?.genres.length < 20) {
            setloading(false);
          }
        });
      };
      fetchMore();
    }
  }, [loadmore]);

  return (
    <Layout>
      <InfiniteScroll
        pageStart={0}
        loadMore={() => setLoadmore(true)}
        hasMore={loading}
        loader={
          <div className="loader" key={0}>
            <LoadingOutlined />
          </div>
        }
      >
        <Row className="pt-5" gutter={[24, 24]} justify="center" align="middle">
          {data?.map((i) => (
            <Col xl={3} lg={5} xs={12} sm={8} md={6}>
              <Link to={`/albums/${i?.id}`}>
                <ArtistPageCard
                  persianTitle={i?.persianTitle}
                  englishTitle={i?.englishTitle}
                  cover={i?.cover}
                />
              </Link>
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  let genres;

  try {
    genres = await getGenres(20);
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      genres: genres?.data?.data || null,
    },
  };
}

index.propTypes = {};

export default memo(index);
