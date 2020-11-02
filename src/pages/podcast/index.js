import React, { useEffect, useState, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Layout from '@/components/Layout/Layout';
import { getLastArtistAdded } from '@/api/artist';
import InfiniteScroll from 'react-infinite-scroller';
import ArtistPageCard from '../../components/Card/ArtistPageCard/ArtistPageCard';
import Link from '@/components/Link/Link';
import { Col, Row } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { getMoreAlbum, getAlbums } from '@/api/album';
import { getMorePlaylist, getPlaylists } from '../../api/playlist';

const index = ({ playlists }) => {
  const [loadmore, setLoadmore] = useState(false);
  const [loading, setloading] = useState(true);
  const [start, setStart] = useState(20);
  const [data, setData] = useState(playlists?.playlists);

  useEffect(() => {
    if (loadmore) {
      const fetchMore = async () => {
        await getMorePlaylist(start, 20).then((res) => {
          setLoadmore(false);
          setStart(start + 20);
          setData([...data, ...res?.data?.data?.playlists]);
          if (res?.data?.data?.playlists.length < 20) {
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
  let playlists;

  try {
    playlists = await getPlaylists(20);
  } catch (e) {
    throw new Error('some thing went wrong !!!');
  }
  return {
    props: {
      playlists: playlists?.data?.data || null,
    },
  };
}

index.propTypes = {};

export default memo(index);
