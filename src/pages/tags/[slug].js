import {
  getLastMusic,
  getBestMusic,
  getLastMusicInSite,
  getLastestPodcast,
  getTopBestPodcast,
} from '@/api/music';
import { NextSeo } from 'next-seo';
import Layout from '@/components/Layout/Layout';
import MusicTable from '@/components/MusicTable/MusicTable';
import { Col, Divider, Row } from 'antd';
const index = ({ musics, subject, title, seoTitle, seoDescripton }) => {
  return (
    <>
      <NextSeo title={seoTitle} description={seoDescripton} />;
      <Layout>
        <Row className="pt-5">
          <Divider orientation="right">{title}</Divider>
          <Col xs={24}>
            <MusicTable
              data={musics?.musics}
              subjects={`${subject}-in-table`}
            />
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export async function getServerSideProps({ query }) {
  let musics;
  let subject = null;
  let title = null;
  let seoTitle = null;
  let seoDescripton = null;
  switch (query.slug) {
    case 'top-best-music':
      try {
        musics = await getBestMusic(50);
        subject = query.slug;
        title = 'بهترین های کاست';
        seoTitle =
          'دانلود بهترین آهنگ های جدید ایرانی 1399 (با آخرین کیفیت و لینک مستقیم )';
        seoDescripton =
          'رادیوکاست ، پخَش آنلاین و دانلود بهترین آهنگ های ایرانی با آخرین کیفیت و لینک مستقیم ، دانلود همه ی آهنگ های ایرانی جدید';
      } catch (e) {
        console.log(e);
      }
      break;
    case 'latest-music':
      try {
        musics = await getLastMusic(50);
        subject = query.slug;
        title = ' جدیدترین کاست ها';
        seoTitle =
          'دانلود جدیدترین و بروزترین آهنگ های ایرانی 1399 (با آخرین کیفیت و لینک مستقیم)';
        seoDescripton =
          'رادیوکاست ، پخَش آنلاین و دانلود بهترین آهنگ های ایرانی با آخرین کیفیت و لینک مستقیم ، دانلود همه ی آهنگ های ایرانی جدید';
      } catch (e) {
        console.log(e);
      }
      break;
    case 'latest-music-in-cassettify':
      try {
        musics = await getLastMusicInSite(50);
        subject = query.slug;
        title = ' آخرین کاست های اضافه شده';
        seoTitle =
          'دانلود جدیدترین آهنگ های ایرانی 1399 (با آخرین کیفیت و لینک مستقیم)';
        seoDescripton =
          'رادیوکاست ، پخَش آنلاین و دانلود بهترین آهنگ های ایرانی با آخرین کیفیت و لینک مستقیم ، دانلود همه ی آهنگ های ایرانی جدید';
      } catch (e) {
        console.log(e);
      }
      break;
    case 'latest-podcast':
      try {
        musics = await getLastestPodcast(50);
        subject = query.slug;
        title = 'آخرین پادکست ها';
        seoTitle =
          'دانلود جدیدترین پادکست های عاشقانه ، تکنولوژی ، اخبار ، ورزشی ، داستان ،با آخرین کیفیت و لینک مستقیم';
        seoDescripton =
          'رادیوکاست ، پخَش آنلاین و دانلود بهترین پادکست های ایرانی با آخرین کیفیت و لینک مستقیم ، دانلود همه ی آهنگ های ایرانی جدید';
      } catch (e) {
        console.log(e);
      }
      break;

    case 'top-best-podcast':
      try {
        musics = await getTopBestPodcast(50);
        subject = query.slug;
        title = 'بهترین پادکست ها';
        seoTitle =
          'دانلود جدیدترین پادکست های عاشقانه ، تکنولوژی ، اخبار ، ورزشی ، داستان ،با آخرین کیفیت و لینک مستقیم';
        seoDescripton =
          'رادیوکاست ، پخَش آنلاین و دانلود بهترین پادکست های ایرانی با آخرین کیفیت و لینک مستقیم ، دانلود همه ی آهنگ های ایرانی جدید';
      } catch (e) {
        console.log(e);
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
      seoTitle,
      seoDescripton,
    },
  };
}

index.propTypes = {};

export default index;
