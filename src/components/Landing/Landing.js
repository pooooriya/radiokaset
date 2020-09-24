import React from 'react';
import PropTypes from 'prop-types';
import s from './Landing.scss';
import { Divider, Steps, Table } from 'antd';
import {
  AudioOutlined,
  CaretRightOutlined,
  SoundOutlined,
} from '@ant-design/icons';
import Link from '@/components/Link/Link';
import ReactImageFallback from 'react-image-fallback';

const Landing = (props) => {
  return (
    <>
      <div
        className={s.landing}
        style={{
          backgroundImage:
            'linear-gradient( transparent, #000 90%),url(/mehradBack.jpg)',
        }}
      >
        <div
          className={s.landing_cover}
          style={{
            backgroundImage: 'url(/mehard.jpg)',
          }}
        />
        <div className={s.landing_detail}>
          <div className={s.landing_detail__information}>
            <h1>Mehrad Hidden</h1>
            <h2>مهراد هیدن</h2>
            {/* <h3 className={s.landing_detail__information__biography}>
              مهراد مستوفی راد معروف به مهراد هیدن متولد 24 آذر 1363 در تهران،
              خواننده و آهنگ ساز ایرانی می‌باشد که در سبک رپ و راک و هیپ هاپ
              آغاز کرده‌است...
            </h3>

            <Link
              to="#"
              className={s.landing_detail__information__biography__more}
            >
              <CaretRightOutlined rotate={90} />
              مشاهده بیوگرافی مهراد هیدن
            </Link> */}

            {/* <h3>
            <CaretRightOutlined />
            <span className={s.landing_detail__information__number}>35</span>
            بار شنیده شده است
          </h3>
          <h3>
            <CaretRightOutlined />
            <span className={s.landing_detail__information__number}>852</span>
            موزیک
          </h3>
          <h3>
            <CaretRightOutlined />
            <span className={s.landing_detail__information__number}>5</span>
            آلبوم
          </h3> */}
          </div>
        </div>
      </div>

      <Divider orientation="right">بهترین های مهراد هیدن</Divider>
      <div className={s.landing__main}>
        <div className={s.landing_tracklist}>
          <div className={s.landing_tracklist__item}>
            <ReactImageFallback
              className={s.landing_tracklist__item__cover}
              fallbackImage="/mehard.jpg"
              src="/mehard.jpg"
            />
            <div className={s.landing_tracklist__item__info}>
              <h5>solh daroon aramesh biroon</h5>
              <h4>Mehrad Hidden</h4>
            </div>
          </div>
        </div>
        <div className={s.landing_tracklist}>
          <div className={s.landing_tracklist__item}>
            <ReactImageFallback
              className={s.landing_tracklist__item__cover}
              fallbackImage="/mehard.jpg"
              src="/mehard.jpg"
            />
            <div className={s.landing_tracklist__item__info}>
              <h5>solh daroon aramesh biroon</h5>
              <h4>Mehrad Hidden</h4>
            </div>
          </div>
        </div>
        <div className={s.landing_tracklist}>
          <div className={s.landing_tracklist__item}>
            <ReactImageFallback
              className={s.landing_tracklist__item__cover}
              fallbackImage="/mehard.jpg"
              src="/mehard.jpg"
            />
            <div className={s.landing_tracklist__item__info}>
              <h5>solh daroon aramesh biroon</h5>
              <h4>Mehrad Hidden</h4>
            </div>
          </div>
        </div>
        <div className={s.landing_tracklist}>
          <div className={s.landing_tracklist__item}>
            <ReactImageFallback
              className={s.landing_tracklist__item__cover}
              fallbackImage="/mehard.jpg"
              src="/mehard.jpg"
            />
            <div className={s.landing_tracklist__item__info}>
              <h5>solh daroon aramesh biroon</h5>
              <h4>Mehrad Hidden</h4>
            </div>
          </div>
        </div>
      </div>
      <Divider orientation="right">آلبوم ها</Divider>
      <div className={s.landing__main}>
        <div className={s.landing_Albums}>
          <ReactImageFallback
            className={s.landing_Albums__cover}
            fallbackImage="/mehard.jpg"
            src="/mehard.jpg"
          />

          <div className={s.landing_Albums__info}>
            <h3>
              <span className={s.landing_Albums__info_eng}>Tunnel 2</span> |{' '}
              <span className={s.landing_Albums__info_fa}>تونل۲</span>
            </h3>
            <h4>12 موزیک</h4>
            <h4>352 بار شنیده شده است</h4>
            <h4>200 نفر آن را دوست داشتند</h4>
          </div>
        </div>
        <div className={s.landing_tracklist}>
          <div className={s.landing_tracklist__item}>
            <ReactImageFallback
              className={s.landing_tracklist__item__cover}
              fallbackImage="/mehard.jpg"
              src="/mehard.jpg"
            />
            <div className={s.landing_tracklist__item__info}>
              <h5>solh daroon aramesh biroon</h5>
              <h4>Mehrad Hidden</h4>
            </div>
          </div>
        </div>
        <div className={s.landing_tracklist}>
          <div className={s.landing_tracklist__item}>
            <ReactImageFallback
              className={s.landing_tracklist__item__cover}
              fallbackImage="/mehard.jpg"
              src="/mehard.jpg"
            />
            <div className={s.landing_tracklist__item__info}>
              <h5>solh daroon aramesh biroon</h5>
              <h4>Mehrad Hidden</h4>
            </div>
          </div>
        </div>
        <div className={s.landing_tracklist}>
          <div className={s.landing_tracklist__item}>
            <ReactImageFallback
              className={s.landing_tracklist__item__cover}
              fallbackImage="/mehard.jpg"
              src="/mehard.jpg"
            />
            <div className={s.landing_tracklist__item__info}>
              <h5>solh daroon aramesh biroon</h5>
              <h4>Mehrad Hidden</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Landing.propTypes = {};

export default Landing;
