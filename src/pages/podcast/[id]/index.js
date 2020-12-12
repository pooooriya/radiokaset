import Layout from '@/components/Layout/Layout';
import MusicHeader from '@/components/MusicPage/MusicHeader';
import { getEpisodeByProgram } from '@/api/episode';
import { dehashedID } from '@/modules/seo';
import Podcast from '@/components/podcast/podcast';
import { NextSeo } from 'next-seo';

const index = ({ episodes }) => {
  return (
    <>
      <NextSeo
        title={`رادیو کاست | ${episodes?.programs[0].persianTitle} | ${episodes?.programs[0]?.englishTitle}`}
        description={`دانلود جدید ترین پادکست های علمی ورزشی احساسی عاشقانه و تکنولوژی در رادیو کاست ، دانلود جدیدترین قسمت از پادکست ${episodes?.programs[0].persianTitle} ، دانلود همه  قسمت های پادکست ${episodes?.programs[0].persianTitle} ، دانلود پادکست ${episodes?.programs[0].persianTitle}`}
      />
      <Layout>
        <Podcast episodes={episodes?.programs[0]} />
      </Layout>
    </>
  );
};

export async function getServerSideProps({ params }) {
  let episodes;
  try {
    episodes = await getEpisodeByProgram(dehashedID(params.id));
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      episodes: episodes?.data?.data || null,
    },
  };
}

export default index;
