import React from 'react';
import Layout from '../components/Layout/Layout';
import dynamic from 'next/dynamic';
import Player from '@/components/Player/Player';
import Card from '@/components/Card/Card';
import ArtistCard from '@/components/Card/ArtistCard/ArtistCard';
import { getLastMusic, getBestMusic, getLastMusicInSite } from '@/api/music';
import { getLastArtistAdded } from '@/api/artist';
import { getGenres } from '@/api/genre';
import Genre from '../components/Genre/Genre';

const index = ({ newest, bestest, newinsite, lastArtistAdded, genres }) => {
  return (
    <Layout>
      <Card title="جدیدترین کاست ها" res={newest} />
      <Genre title="ژانر ها" res={genres} />
      <Card title="بهترین کاست ها" res={bestest} />
      <Card title="آخرین کاست ها" res={newinsite} />
      <Card title="جدیدترین آرتیست های کاست" res={lastArtistAdded} isArtist />
      {/* <Card title="آخرین کاست ها" res={genres} /> */}
    </Layout>
  );
};

export async function getServerSideProps() {
  let newest;
  let bestest;
  let newinsite;
  let lastArtistAdded;
  let genres;
  try {
    genres = await getGenres();
    bestest = await getBestMusic();
    newest = await getLastMusic();
    newinsite = await getLastMusicInSite();
    lastArtistAdded = await getLastArtistAdded();
  } catch (e) {
    throw new Error('some thing went wrong !!!');
  }
  return {
    props: {
      newest: newest?.data?.data || null,
      newinsite: newinsite?.data?.data || null,
      lastArtistAdded: lastArtistAdded?.data?.data || null,
      bestest: bestest?.data?.data || null,
      genres: genres?.data?.data || null,
    },
  };
}

export default index;
