import React from 'react';
import PropTypes from 'prop-types';
import s from './ArtistHeader.scss';
import { Col, Row } from 'antd';
import ReactImageFallback from 'react-image-fallback';
import Button from '@/components/Button/Button';
import {
  FileExcelFilled,
  FileTextOutlined,
  PlayCircleOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';

const ArtistHeader = (props) => {
  return (
    <Row
      style={{
        background: 'linear-gradient(45deg, #303030, #fffdfd00),url(/back.jpg)',
      }}
      className={s.ArtistHeader}
      align="bottom"
    >
      <Col xs={24}>
        <Row gutter={48}>
          <Col lg={4} xl={3} xs={24}>
            <ReactImageFallback
              src="/mehard.jpg"
              className={s.ArtistHeader_cover}
            />
          </Col>
          <Col xl={21} lg={20} xs={24}>
            <div className={s.ArtistHeader_info}>
              <h1>Mehrad Hidden</h1>
              <h2>مهراد هیدن</h2>
              <h4>
                مهراد مستوفی راد معروف به مهراد هیدن متولد 24 آذر 1363 در تهران،
                خواننده و آهنگ ساز ایرانی می‌باشد که در سبک رپ و راک و هیپ هاپ
                آغاز کرده‌است... مهراد مستوفی راد معروف به مهراد هیدن متولد 24 .
                آغاز کرده‌است... مهراد مستوفی راد معروف به مهراد هیدن متولد 24 .
                آغاز کرده‌است... مهراد مستوفی راد معروف به مهراد هیدن متولد 24 .
              </h4>
              <Row
                gutter={[24, 12]}
                align="middle"
                className={s.ArtistHeader_actions}
              >
                <Col xl={4} lg={5} xs={24}>
                  <Button
                    // {...form}
                    // disabled={!form.dirty || form.isSubmitting}
                    name="submit"
                    type="primary"
                    htmlType="submit"
                    size="large"
                  >
                    <PlayCircleOutlined className={s.buttonIcon} />
                    پخش همه کاست ها
                  </Button>
                </Col>
                <Col xl={3} lg={4} xs={24}>
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
                </Col>
                <Col xl={3} lg={5} xs={24}>
                  <Button
                    // {...form}
                    // disabled={!form.dirty || form.isSubmitting}
                    name="submit"
                    type="primary"
                    htmlType="submit"
                    size="large"
                  >
                    <ShareAltOutlined className={s.buttonIcon} />
                    اشتراک گذاری
                  </Button>
                </Col>
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
