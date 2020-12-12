import React, { useEffect, useState } from 'react';
import s from './Footer.scss';
import { Col, Row } from 'antd';
import ReactImageFallback from 'react-image-fallback';
import {
  InstagramOutlined,
  SendOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import Link from '@/components/Link/Link';
import { hashedID } from '@/modules/seo';
import { getLastMusicInSite } from '@/api/music';
import { getLastEditedArtist } from '@/api/artist';

const Footer = () => {
  const [data, setdata] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const musics = await getLastMusicInSite(7);
      const artists = await getLastEditedArtist(7);
      setdata({
        musics,
        artists,
      });
    };
    fetch();
  }, []);

  return (
    <>
      <Row className={s.cassetteFooter} justify="center">
        <Col lg={6} sm={24} className={s.cassetteFooter_logo}>
          <ReactImageFallback
            src="/tapes.png"
            fallbackImage="/tapes.png"
            className={s.cassetteFooter_img}
          />
        </Col>
        <Col lg={4} md={6} sm={12} xs={24}>
          <h4> شبکه های اجتماعی</h4>
          <Row justify="center" align="middle">
            <Col lg={6} className={s.socials}>
              <div className={s.socials_item}>
                <InstagramOutlined />
              </div>
            </Col>
            <Col lg={6} className={s.socials}>
              <div className={s.socials_item}>
                <SendOutlined />
              </div>
            </Col>
            <Col lg={6} className={s.socials}>
              <div className={s.socials_item}>
                <TwitterOutlined />
              </div>
            </Col>
            <Col lg={6} className={s.socials}>
              <div className={s.socials_item}>
                <YoutubeOutlined />
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg={4} md={6} sm={12} xs={24}>
          <h4>دسترسی سریع سایت</h4>
          <ul>
            <li>
              <Link TO="/"> صفحه اصلی</Link>
            </li>

            <li>
              <Link TO="/artist">خوانندگان</Link>
            </li>

            <li>
              <Link TO="/album">آلبوم ها</Link>
            </li>

            <li>
              <Link TO="/playlist">پلی لیست ها</Link>
            </li>

            <li>
              <Link TO="/podcast">پادکست ها</Link>
            </li>
          </ul>
        </Col>
        <Col lg={4} md={6} sm={12} xs={24}>
          <h4>بهترین خوانندگان</h4>
          <ul>
            {data?.artists?.data?.data?.artists?.map(
              (i, index) =>
                index <= 7 && (
                  <li>
                    <Link to={`/artist/${hashedID(i.id)}`}>
                      {`دانلود کل آهنگ های ${i.persianTitle}`}
                    </Link>
                  </li>
                )
            )}
          </ul>
        </Col>
        <Col lg={4} md={6} sm={12} xs={24}>
          <h4>جدیدترین آهنگ ها</h4>
          <ul>
            {data?.musics?.data?.data?.musics?.map(
              (i, index) =>
                index <= 7 && (
                  <li>
                    <Link to={`/music/${hashedID(i.id)}`}>
                      {`دانلود آهنگ  ${i.persianTitle} ${
                        i && i.artist ? i?.artist.persianTitle : ''
                      }`}
                    </Link>
                  </li>
                )
            )}
          </ul>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <div className={s.copyright}>
            <h5>
              تمامی حقوق مادی و معنوی این سایت برای رادیو کاست محفوظ است &copy;
            </h5>
            <h5>All Rights Reserved For RadioKaset &copy;</h5>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Footer;
