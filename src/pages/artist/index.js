import React, { useEffect, useState, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Layout from '@/components/Layout/Layout';
import { getLastArtistAdded } from '@/api/artist';
import InfiniteScroll from 'react-infinite-scroller';
import ArtistPageCard from '@/components/Card/ArtistPageCard/ArtistPageCard';
import Link from '@/components/Link/Link';
import { Col, Row } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { getMore } from '../../api/artist';
import { NextSeo } from 'next-seo';

const index = ({ artists }) => {
  const [loadmore, setLoadmore] = useState(false);
  const [loading, setloading] = useState(true);
  const [start, setStart] = useState(20);
  const [data, setData] = useState(artists?.artists);

  useEffect(() => {
    if (loadmore) {
      const fetchMore = async () => {
        await getMore(start, 20).then((res) => {
          setLoadmore(false);
          setStart(start + 20);
          setData([...data, ...res?.data?.data?.artists]);
          if (res?.data?.data?.artists.length < 20) {
            setloading(false);
          }
        });
      };
      fetchMore();
    }
  }, [loadmore]);

  return (
    <Layout>
      <NextSeo
        title="کاستیفای | آرتیست ها"
        description="شما میتوانید به آهنگ های خواننده مورد نظر خود گوشی بدهید و به فول آلبوم آن ها دسترسی داشته باشید و آن را دانلود کنید "
      />
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
        <Row
          className="pt-5 px-3"
          gutter={[24, 24]}
          justify="center"
          align="middle"
        >
          {data?.map((i) => (
            <Col xl={3} lg={5} xs={12} sm={8} md={6}>
              <Link to={`/artist/${i?.id}`}>
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
  let artists;

  try {
    artists = await getLastArtistAdded(20);
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

export default memo(index);
