import {
  getLastMusic,
  getBestMusic,
  getLastMusicInSite,
  getLastestPodcast,
  getTopBestPodcast,
} from '@/api/music';
import Layout from '@/components/Layout/Layout';
import MusicTable from '@/components/MusicTable/MusicTable';
import { Col, Divider, Row } from 'antd';
import { getAlbumById } from '@/api/album';

const index = ({ album }) => {
  return (
    <Layout>
      <Row className="pt-5">
        <Divider orientation="right">{`${album?.albums[0].artist?.persianTitle} - ${album?.albums[0].persianTitle} (${album?.albums[0].englishTitle})`}</Divider>
        <Col xs={24}>
          <MusicTable
            data={album?.albums[0]?.musics}
            album={album?.albums[0]}
            subjects={`albums${index}`}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  let album;

  try {
    album = await getAlbumById(params?.id);
  } catch (e) {
    throw new Error('some thing went wrong !!!');
  }
  return {
    props: {
      album: album?.data?.data || null,
    },
  };
}

index.propTypes = {};

export default index;
