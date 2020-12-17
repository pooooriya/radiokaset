import React from 'react';
import Podcast from '@/components/podcast/podcast';
import Layout from '@/components/Layout/Layout';
import { dehashedID } from '@/modules/seo';
import { getAPlaylistProgram } from '@/api/program';

const index = (playlist) => {
  return (
    <Layout backGroundImage={playlist?.playlist?.programs[0]?.cover?.url}>
      <Podcast episodes={playlist?.playlist?.programs[0] || []} isPlaylist />;
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  let playlist;
  try {
    playlist = await getAPlaylistProgram(dehashedID(params.id));
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      playlist: playlist?.data?.data || null,
    },
  };
}

export default index;
