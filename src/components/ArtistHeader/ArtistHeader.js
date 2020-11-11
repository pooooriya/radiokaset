import React from 'react';
import s from './ArtistHeader.scss';
import { Col, Row } from 'antd';
import ReactImageFallback from 'react-image-fallback';
import Button from '@/components/Button/Button';
import {
  InstagramOutlined,
  SendOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import { API_URL } from '@/root/env';

const ArtistHeader = ({ artistInfo: { artist } }) => {
  return (
    <Row
      style={{
        background: `linear-gradient(45deg, #303030, #fffdfd00),${
          artist?.background?.url
            ? `url(${API_URL}${artist?.background?.url})`
            : 'url(/artistback.png)'
        }`,
      }}
      className={s.ArtistHeader}
      align="bottom"
    >
      <Col xs={24}>
        <Row gutter={48} align="middle">
          {/* <Col>
            <ReactImageFallback
              src={
                artist?.cover?.url
                  ? `${API_URL}${artist?.cover?.url}`
                  : '/defaultavatar'
              }
              fallbackImage={
                artist?.cover?.url
                  ? `${API_URL}${artist?.cover?.url}`
                  : '/defaultavatar'
              }
              alt={artist?.persianTitle}
              className={s.ArtistHeader_cover}
            />
          </Col> */}
          <Col lg={10}>
            <div className={s.ArtistHeader_info}>
              <h1>{artist?.englishTitle}</h1>
              <h2>{artist?.persianTitle}</h2>
              <h4>{artist?.shortDescription}</h4>
              <Row
                gutter={[24, 12]}
                align="middle"
                justify="start"
                className={s.ArtistHeader_actions}
              >
                {/* <Col>
                  <Button
                    // {...form}
                    // disabled={!form.dirty || form.isSubmitting}
                    name="submit"
                    type="primary"
                    htmlType="submit"
                    size="large"
                  >
                    <FileTextOutlined className={s.buttonIcon} />
                    بیوگرافی کامل
                  </Button>
                </Col> */}
                {artist?.socialAddress && (
                  <>
                    {artist?.socialAddress?.instagram && (
                      <Col>
                        <a
                          href={artist?.socialAddress?.instagram}
                          rel="noopener noreferrer nofollow"
                          target="_blank"
                        >
                          <Button
                            // {...form}
                            // disabled={!form.dirty || form.isSubmitting}
                            name="submit"
                            type="primary"
                            htmlType="submit"
                            size="large"
                          >
                            <InstagramOutlined className={s.buttonIcon} />
                            اینستاگرام
                          </Button>
                        </a>
                      </Col>
                    )}
                    {artist?.socialAddress?.telegram && (
                      <Col>
                        <a
                          href={artist?.socialAddress?.telegram}
                          rel="noopener noreferrer nofollow"
                          target="_blank"
                        >
                          <Button
                            // {...form}
                            // disabled={!form.dirty || form.isSubmitting}
                            name="submit"
                            type="primary"
                            htmlType="submit"
                            size="large"
                          >
                            <SendOutlined className={s.buttonIcon} />
                            تلگرام
                          </Button>
                        </a>
                      </Col>
                    )}

                    {artist?.socialAddress?.twitter && (
                      <Col>
                        <a
                          href={artist?.socialAddress?.twitter}
                          rel="noopener noreferrer nofollow"
                          target="_blank"
                        >
                          <Button
                            // {...form}
                            // disabled={!form.dirty || form.isSubmitting}
                            name="submit"
                            type="primary"
                            htmlType="submit"
                            size="large"
                          >
                            <TwitterOutlined className={s.buttonIcon} />
                            توییتر
                          </Button>
                        </a>
                      </Col>
                    )}
                  </>
                )}
              </Row>
            </div>
            {/* <Button type="warning" ghost>
                مشاهده بیوگرافی کامل
              </Button> */}
            {/* <div className={s.ArtistHeader_info}>
          <h1>Mehrad Hidden</h1>
          <h2>مهراد هیدن</h2>
          <h4>
            مهراد مستوفی راد معروف به مهراد هیدن متولد 24 آذر 1363 در تهران،
            خواننده و آهنگ ساز ایرانی می‌باشد که در سبک رپ و راک و هیپ هاپ آغاز
            کرده‌است...
          </h4>
          <Button type="warning" ghost>
            مشاهده بیوگرافی کامل
          </Button>
        </div> */}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

ArtistHeader.propTypes = {};

export default ArtistHeader;
