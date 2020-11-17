import React from 'react';
import PropTypes from 'prop-types';
import s from './MusicSideBar.scss';
import ArtistPageCard from '@/components/Card/ArtistPageCard/ArtistPageCard';
import { Col, Tabs } from 'antd';
import Button from '@/components/Button/Button';
import { FileTextOutlined, UserOutlined } from '@ant-design/icons';
import { API_URL } from '@/root/env';
import Link from '@/components/Link/Link';

const MusicSideBar = ({ data }) => {
  const { TabPane } = Tabs;
  return (
    <div class={s.sidebarMusic}>
      <ArtistPageCard
        cover={data?.cover}
        persianTitle={`${data?.persianTitle} - ${data?.artist?.persianTitle}`}
        englishTitle={`${data?.englishTitle} by ${data?.artist?.englishTitle}`}
      />
      <Tabs defaultActiveKey="1">
        <TabPane tab=" تکست آهنگ" key="1">
          <div
            className={s.sidebarMusic_lyrics}
            dangerouslySetInnerHTML={{
              __html: data?.lyrics.replace(RegExp('\n', 'g'), '<br>'),
            }}
          />
        </TabPane>
        <TabPane tab="دانلود" key="2">
          <div className={s.sidebarMusic_downloadBar}>
            <h5>
              {` دانلود آهنگ ${data?.persianTitle} ${data?.artist?.persianTitle}`}
            </h5>
            <h5>
              {` Download ${data?.englishTitle} ${data?.artist?.englishTitle}`}
            </h5>
            <Link href={`/artist/${data?.artist?.id}`} download>
              <Button
                name="submit"
                type="primary"
                htmlType="submit"
                size="large"
              >
                <UserOutlined className={s.buttonIcon} />
                صفحه آرتیست
              </Button>
            </Link>
            <a href={`${API_URL}${data?.musicFile?.url}`} download>
              <Button
                name="submit"
                type="primary"
                htmlType="submit"
                size="large"
              >
                <FileTextOutlined className={s.buttonIcon} />
                دانلود آهنگ
              </Button>
            </a>
            <div className={s.sidebarMusic_tag}>
              <span>
                {`دانلود جدیدترین آهنگ های  ${data?.artist?.persianTitle}`}{' '}
              </span>
              <span>
                {`دانلود بهترین آهنگ های  ${data?.artist?.persianTitle}`}{' '}
              </span>
              <span>{`دانلود فول آلبوم ${data?.artist?.persianTitle}`} </span>
              <span>{`دانلود آهنگ ${data?.persianTitle} ${data?.artist?.persianTitle}  با آخرین کیفیت`}</span>
              <span>دانلود آهنگ</span>
              {data?.tags?.map((i) => (
                <span>{i.name}</span>
              ))}
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

MusicSideBar.propTypes = {};

export default MusicSideBar;
