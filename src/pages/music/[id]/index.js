import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Affix, Col, Divider, Row } from 'antd';
import Layout from '@/components/Layout/Layout';
import MusicSideBar from '@/components/MusicSideBar/MusicSideBar';
import { dehashedID } from '@/root/src/modules/seo';
import {
  getMusicById,
  getTopFiveMusicByArtist,
  getSameMusic,
} from '@/api/music';
import MusicHeader from '@/components/MusicPage/MusicHeader';
import MusicAbout from '@/components/MusicPage/MusicAbout';
import MusicTable from '@/components/MusicTable/MusicTable';
import Card from '@/components/Card/Card';
import { getSameArtist } from '@/api/artist';
import { NextSeo } from 'next-seo';
import { v4 as uuidv4 } from 'uuid';

const index = ({ music, getSame, getArtist }) => {
  const [state, setstate] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getTopFiveMusicByArtist(
        music?.musics[0]?.artist?.id,
        5
      );
      setstate(res?.data?.data?.artists[0]);
    };
    fetchData();
  }, []);
  return (
    <Layout>
      <NextSeo
        title={`رادیو کاست | دانلود آهنگ ${music?.musics[0]?.persianTitle} ${music?.musics[0]?.artist?.persianTitle}`}
        description={`دانلود آهنگ ${music?.musics[0]?.persianTitle} از ${music?.musics[0]?.artist?.persianTitle}
        دانلود آخرین کیفیت آهنگ های ${music?.musics[0]?.artist?.persianTitle},
        متن آهنگ ${music?.musics[0]?.persianTitle} از ${music?.musics[0]?.artist?.persianTitle}
        دانلود فول آلبوم ${music?.musics[0]?.artist?.persianTitle}
        `}
      />
      <MusicHeader music={music?.musics[0]} />
      <MusicAbout music={music?.musics[0]} />
      <MusicTable
        title={`بهترین آهنگ های ${music?.musics[0]?.artist?.persianTitle} را بشنوید`}
        data={state?.musics}
        // album={album?.albums[0]}
        subjects={uuidv4()}
      />
      <MusicTable
        title="دیگر شنوندگان این کاست ها را نیز شنیده اند"
        data={getSame?.musics}
        // album={album?.albums[0]}
        subjects={uuidv4()}
      />
      <Card title="آرتیست های مشابه" res={getArtist} isArtist />
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  let music;
  let getSame;
  let getArtist;
  const randomSelect = Math.floor(Math.random() * 100);
  const random = Math.floor(Math.random() * 20);
  try {
    music = await getMusicById(dehashedID(params.id));
    getSame = await getSameMusic(randomSelect, 25);
    getArtist = await getSameArtist(random, 10);
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      music: music?.data?.data || null,
      getSame: getSame?.data?.data || null,
      getArtist: getArtist?.data?.data || null,
    },
  };
}

index.propTypes = {};

export default memo(index);
