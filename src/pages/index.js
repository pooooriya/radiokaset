import React from 'react';
import Layout from '../components/Layout/Layout';
import Card from '@/components/Card/Card';
import { getLastMusic, getBestMusic, getLastMusicInSite } from '@/api/music';
import { getLastArtistAdded, getLastEditedArtist } from '@/api/artist';
import { getGenres } from '@/api/genre';
import { NextSeo } from 'next-seo';
import Interduction from '@/components/Interduction/Interduction';

const index = ({
  newest,
  bestest,
  newinsite,
  lastArtistAdded,
  lastEditedArtsit,
}) => {
  return (
    <Layout>
      <NextSeo
        title="کاستیفای | پخش آنلاین بهترین آهنگ های ایرانی و خارجی  "
        description=" کاستیفای برترین استریم موزیک ایرانی و خارجی که میتوانید بی وقفه با آن به موسیقی گوش دهید و موزیک دلخواه خود را دانلود کنید"
      />
      <Interduction />
      <Card title="جدیدترین کاست ها" res={newest} subject="latest-music" />
      <Card title="بهترین کاست ها" res={bestest} subject="top-best-music" />
      <Card
        title="آخرین کاست های اضافه شده"
        res={newinsite}
        subject="latest-music-in-cassettify"
      />
      <Card title="آرتیست های بروز شده کاست" res={lastEditedArtsit} isArtist />
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
  let lastEditedArtsit;
  try {
    lastEditedArtsit = await getLastEditedArtist(15);
    genres = await getGenres(10);
    bestest = await getBestMusic(15);
    newest = await getLastMusic(15);
    newinsite = await getLastMusicInSite(15);
    lastArtistAdded = await getLastArtistAdded(10);
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      newest: newest?.data?.data || null,
      lastEditedArtsit: lastEditedArtsit?.data?.data || null,
      newinsite: newinsite?.data?.data || null,
      lastArtistAdded: lastArtistAdded?.data?.data || null,
      bestest: bestest?.data?.data || null,
      genres: genres?.data?.data || null,
    },
  };
}

export default index;
