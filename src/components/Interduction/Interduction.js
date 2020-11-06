import React from 'react';
import { Col, Row } from 'antd';
import s from './Interduction.scss';
import SearchBox from '@/components/SearchBox';
import {
  InstagramOutlined,
  SendOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import Button from '@/components/Button/Button';

const Interduction = (props) => {
  return (
    <Row
      className={s.cassetteBackground}
      style={{
        backgroundImage:
          'linear-gradient(to right, #00000075, #0000009a),url(/backgroundCassette.jpg);',
      }}
      justify="center"
      align="middle"
    >
      <Col lg={12} xs={20}>
        <h1>با کاستیفای بی وقفه به موزیک دلخواهت گوش بده !</h1>
        <SearchBox withBoxshadow />
        <h6>مطابق قوانین جمهوری اسلامی ایران</h6>

        <Row justify="center" align="center" className={s.socials}>
          <Col>
            <a
              href="https://instagram.com/cassettify"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <Button
                // {...form}
                // disabled={!form.dirty || form.isSubmitting}
                name="submit"
                type="primary"
                htmlType="submit"
                size="large"
                icon={<InstagramOutlined className={s.buttonIcon} />}
              >
                اینستاگرام
              </Button>
            </a>
          </Col>
          <Col>
            <a
              href="https://t.me/cassettify"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <Button
                // {...form}
                // disabled={!form.dirty || form.isSubmitting}
                name="submit"
                type="primary"
                htmlType="submit"
                size="large"
                icon={<SendOutlined className={s.buttonIcon} />}
              >
                تلگرام
              </Button>
            </a>
          </Col>
          <Col>
            <a
              href="https://twitter.com/cassettify"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <Button
                // {...form}
                // disabled={!form.dirty || form.isSubmitting}
                name="submit"
                type="primary"
                htmlType="submit"
                size="large"
                icon={<TwitterOutlined className={s.buttonIcon} />}
              >
                توپیتر
              </Button>
            </a>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

Interduction.propTypes = {};

export default Interduction;
