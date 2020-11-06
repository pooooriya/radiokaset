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
const index = ({ musics, subject, title }) => {
  return (
    <Layout>
      <Row className="pt-5">
        <Divider orientation="right">{title}</Divider>
        <Col xs={24}>
          <MusicTable data={musics?.musics} subjects={subject} />
        </Col>
      </Row>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  let musics;
  let subject = null;
  let title = null;
  switch (query.slug) {
    case 'top-best-music':
      try {
        musics = await getBestMusic(50);
        subject = query.slug;
        title = 'بهترین های کاست';
      } catch (e) {
        throw new Error('sorry somthing wents wrong');
      }
      break;
    case 'latest-music':
      try {
        musics = await getLastMusic(50);
        subject = query.slug;
        title = ' جدیدترین کاست ها';
      } catch (e) {
        throw new Error('sorry somthing wents wrong');
      }
      break;
    case 'latest-music-in-cassettify':
      try {
        musics = await getLastMusicInSite(50);
        subject = query.slug;
        title = ' آخرین کاست های اضافه شده';
      } catch (e) {
        throw new Error('sorry somthing wents wrong');
      }
      break;
    case 'latest-podcast':
      try {
        musics = await getLastestPodcast(50);
        subject = query.slug;
        title = 'آخرین پادکست ها';
      } catch (e) {
        throw new Error('sorry somthing wents wrong');
      }
      break;

    case 'top-best-podcast':
      try {
        musics = await getTopBestPodcast(50);
        subject = query.slug;
        title = 'بهترین پادکست ها';
      } catch (e) {
        throw new Error('sorry somthing wents wrong');
      }
      break;

    default:
      musics = null;
      subject;
      title;
      break;
  }

  return {
    props: {
      musics: musics?.data?.data || null,
      subject,
      title,
    },
  };
}

index.propTypes = {};

export default index;
