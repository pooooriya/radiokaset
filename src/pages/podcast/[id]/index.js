import Layout from '@/components/Layout/Layout';
import MusicHeader from '@/components/MusicPage/MusicHeader';
import { getEpisodeByProgram } from '@/api/episode';
import { dehashedID } from '@/modules/seo';
import Podcast from '@/components/podcast/podcast';

const index = ({ episodes }) => {
  return (
    <Layout>
      <Podcast episodes={episodes?.programs[0]} />
    </Layout>
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
