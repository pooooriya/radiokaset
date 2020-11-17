import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Tabs } from 'antd';
import s from './MusicAbout.scss';
import Link from '@/components/Link/Link';
import Button from '@/components/Button/Button';
import { API_URL } from '@/root/env';
import { UserOutlined } from '@ant-design/icons';

const MusicAbout = ({ music }) => {
  const { TabPane } = Tabs;
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="تکست آهنگ" key="1">
        <div
          className={s.musicAbout_lyrics}
          dangerouslySetInnerHTML={{
            __html: music?.lyrics.replace(RegExp('\n', 'g'), '<br>'),
          }}
        />
      </TabPane>
      <TabPane tab="دانلود" key="2">
        <Row justify="center" align="middle">
          <Col>
            <div className={s.musicAbout_downloadBar}>
              <h4>
                {`   دانلود آهنگ
                ${music?.persianTitle} 
                
                ${music?.artist?.persianTitle} با آخرین کیفیت`}
              </h4>
              <h4>
                {`  Download Music
                ${music?.englishTitle} 
                
                ${music?.artist?.englishTitle}`}
              </h4>
              <a href={`${API_URL}${music?.musicFile?.url}`} download>
                <Button
                  // {...form}
                  // disabled={!form.dirty || form.isSubmitting}
                  name="submit"
                  type="primary"
                  htmlType="submit"
                  size="large"
                >
                  <UserOutlined className={s.buttonIcon} />
                  دانلود آهنگ
                </Button>
              </a>
            </div>

            <div className={s.musicAbout_tags}>
              <span>
                {`دانلود جدیدترین آهنگ های  ${music?.artist?.persianTitle}`}{' '}
              </span>
              <span>
                {`دانلود بهترین آهنگ های  ${music?.artist?.persianTitle}`}{' '}
              </span>
              <span>{`دانلود فول آلبوم ${music?.artist?.persianTitle}`} </span>
              <span>{`دانلود آهنگ ${music?.persianTitle} ${music?.artist?.persianTitle}  با آخرین کیفیت`}</span>
              <span>دانلود آهنگ</span>
              <span>دانلود آهنگ</span>
              {music?.tags?.map((i) => (
                <span>{i.name}</span>
              ))}
            </div>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  );
};

MusicAbout.propTypes = {};

export default MusicAbout;
