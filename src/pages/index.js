import React from 'react';
import Layout from '../components/Layout/Layout';
import dynamic from 'next/dynamic';
import Player from '@/components/Player/Player';
import Card from '@/components/Card/Card';
import { getLastMusic } from '@/api/music';

const index = ({ res }) => {
  return (
    <Layout>
      <Card title="جدیدترین ها" res={res} subject="newest" />
    </Layout>
  );
};

export async function getServerSideProps() {
  let res;
  try {
    res = await getLastMusic();
  } catch (e) {
    throw new Error('400');
  }
  return {
    props: {
      res: res?.data?.data || null,
    },
  };
}

export default index;
