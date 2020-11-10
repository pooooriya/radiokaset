import React from 'react';
import Layout from '@/components/Layout/Layout';
import ArtistHeader from '@/components/ArtistHeader/ArtistHeader';
import MusicTable from '@/components/MusicTable/MusicTable';
import ArtistAnalytics from '@/components/ArtistAnalytics/ArtistAnalytics';
import { getArtist } from '@/api/artist';
import { getTopFiveMusicByArtist, getAllMusic } from '@/api/music';
import { getAlbumsByArtist } from '@/api/album';
import { API_URL } from '@/root/env';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { v4 as uuidv4 } from 'uuid';

const index = ({ artistInfo, getTopFiveMusic, getAlbums, getMusics }) => {
  console.log(getAlbums, 'getAlbums');

  const structuredData =
    getAlbums?.artists[0]?.albums.length > 0
      ? getAlbums?.artists[0]?.albums?.map((i) => {
          return {
            '@context': 'https://schema.org',
            '@type': 'MusicAlbum',
            '@id': `${API_URL}/${artistInfo.artist?.id}`,
            name: `${i?.persianTitle} - ${i?.englishTitle}`,
            image: `${API_URL}/${i?.cover?.url}`,
            genre: `${i?.genre?.persianTitle} - ${i?.genre?.englishTitle}`,
            byArtist: {
              '@type': 'MusicGroup',
              name: `${artistInfo.artist?.persianTitle} - ${artistInfo.artist?.englishTitle}`,
              '@id': `${API_URL}/${artistInfo.artist?.id}`,
            },
            albumRelease: {
              '@type': 'MusicRelease',
              name: `${i?.persianTitle} - ${i?.englishTitle}`,
              '@id': `${API_URL}/${i?.id}`,
            },
            track: i?.musics?.map((x) => {
              return {
                '@type': 'ListItem',
                position: index,
                item: {
                  '@type': 'MusicRecording',
                  name: `${x?.persianTitle} - ${x?.englishTitle}`,
                },
              };
            }),
          };
        })
      : getMusics?.artists[0].musics?.length > 0 && {
          '@context': 'https://schema.org',
          '@type': 'MusicAlbum',
          '@id': `${API_URL}/${artistInfo.artist?.id}`,
          name: `Single Tracks - ترک های سینگل`,
          genre: `${artistInfo?.artist?.genre?.persianTittle}- ${artistInfo?.artist?.genre?.englishTitle}`,
          byArtist: {
            '@type': 'MusicGroup',
            name: `${artistInfo.artist?.persianTitle} - ${artistInfo.artist?.englishTitle}`,
            '@id': `${API_URL}/${artistInfo.artist?.id}`,
          },
          track: getMusics?.artists[0].musics?.map((x) => {
            return {
              '@type': 'ListItem',
              position: index,
              item: {
                '@type': 'MusicRecording',
                name: `${x?.persianTitle} - ${x?.englishTitle}`,
              },
            };
          }),
        };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <Layout>
        <NextSeo
          title={`کاستیفای | ${artistInfo?.artist?.persianTitle} | ${artistInfo?.artist?.englishTitle}`}
          description={`دانلود فول آلبوم ${artistInfo?.artist?.persianTitle} و پخش آنلاین آهنگ های ${artistInfo?.artist?.persianTitle} و  بهترین آهنگ های ${artistInfo?.artist?.persianTitle}`}
        />
        <ArtistHeader artistInfo={artistInfo} />
        <ArtistAnalytics
          musicength={getMusics?.artists[0].musics?.length}
          albumLength={getAlbums?.artists[0]?.albums.length}
        />
        <MusicTable
          data={getTopFiveMusic.artists[0].musics}
          title="بهترین کاست های آرتیست"
          subjects={uuidv4()}
        />
        {getAlbums?.artists[0]?.albums.map((i, index) => (
          <MusicTable
            data={i.musics}
            title={`آلبوم ${i.persianTitle} (${i.englishTitle})`}
            album={i}
            subjects={uuidv4()}
          />
        ))}
      </Layout>
    </>
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
    getTopFiveMusic = await getTopFiveMusicByArtist(
      params.id,
      getAlbums?.data?.data?.artists[0]?.albums?.length > 0 ? 10 : null
    );
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
