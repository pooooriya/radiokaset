import React from 'react';
import PropTypes from 'prop-types';
import Layout from '@/components/Layout/Layout';
import ArtistHeader from '@/components/ArtistHeader/ArtistHeader';
import MusicTable from '@/components/MusicTable/MusicTable';
import ArtistAnalytics from '@/components/ArtistAnalytics/ArtistAnalytics';
import { getArtist } from '@/api/artist';
import { getTopFiveMusicByArtist, getAllMusic } from '@/api/music';
import { getAlbumsByArtist } from '@/api/album';

const index = ({ artistInfo, getTopFiveMusic, getAlbums, getMusics }) => {
  return (
    <Layout>
      <ArtistHeader artistInfo={artistInfo} />
      <ArtistAnalytics
        musicength={getMusics?.artists[0].musics?.length}
        albumLength={getAlbums?.artists[0]?.albums.length}
      />
      <MusicTable
        data={getTopFiveMusic.artists[0].musics}
        title="بهترین کاست های آرتیست"
        subjects="tops"
      />
      {getAlbums?.artists[0]?.albums.map((i, index) => (
        <MusicTable
          data={i.musics}
          title={`آلبوم ${i.persianTitle} (${i.englishTitle})`}
          album={i}
          subjects={`albums${index}`}
        />
      ))}
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  let artistInfo;
  let getTopFiveMusic;
  let getAlbums;
  let getMusics;

  try {
    getMusics = await getAllMusic(params.id);
    getAlbums = await getAlbumsByArtist(params.id);
    getTopFiveMusic = await getTopFiveMusicByArtist(params.id);
    artistInfo = await getArtist(params.id);
  } catch (e) {
    throw new Error('some thing went wrong !!!');
  }
  return {
    props: {
      getTopFiveMusic: getTopFiveMusic?.data?.data || null,
      artistInfo: artistInfo?.data?.data || null,
      getAlbums: getAlbums?.data?.data || null,
      getMusics: getMusics?.data?.data || null,
    },
  };
}

index.propTypes = {};

export default index;
