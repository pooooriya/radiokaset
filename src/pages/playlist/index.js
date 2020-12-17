import React, { useEffect, useState, memo } from 'react';
import Layout from '@/components/Layout/Layout';
import InfiniteScroll from 'react-infinite-scroller';
import ArtistPageCard from '../../components/Card/ArtistPageCard/ArtistPageCard';
import Link from '@/components/Link/Link';
import { Col, Row } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { getPlaylistProgram, getMorePlaylistProgram } from '@/api/program';
import { hashedID } from '../../modules/seo';

const index = ({ playlists }) => {
  const [loadmore, setLoadmore] = useState(false);
  const [loading, setloading] = useState(true);
  const [start, setStart] = useState(20);
  const [data, setData] = useState(playlists?.programs);

  useEffect(() => {
    if (loadmore) {
      const fetchMore = async () => {
        await getMorePlaylistProgram(start, 20).then((res) => {
          setLoadmore(false);
          setStart(start + 20);
          setData([...data, ...res?.data?.data?.programs]);
          if (res?.data?.data?.programs?.length < 20) {
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
          {data?.map((i, index) => (
            <Col xl={3} lg={5} xs={12} sm={8} md={6} key={index}>
              <Link to={`/playlist/${hashedID(i?.id)}`}>
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
    playlists = await getPlaylistProgram(20);
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      playlists: playlists?.data?.data || null,
    },
  };
}

index.propTypes = {};

export default memo(index);
