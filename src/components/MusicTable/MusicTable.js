import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Space, Table } from 'antd';
import {
  AlignCenterOutlined,
  CaretRightOutlined,
  MinusCircleTwoTone,
  PlayCircleOutlined,
  PlaySquareOutlined,
  PlusCircleTwoTone,
} from '@ant-design/icons';

const MusicTable = (props) => {
  const [expendable, setExpendable] = useState(false);
  const dataSource = [
    {
      key: '1',
      musicLength: 'Mike',
      dataIndex: 32,
      music: 'alo alo',
      album: '10 Downing Street',
      visit: 352000,
      description:
        'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
      key: '2',
      musicLength: 'John',
      dataIndex: 42,
      music: 'Mar',
      album: '10 Downing Street',
      visit: 245512,
      description:
        'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
      key: '3',
      musicLength: 'Mike',
      dataIndex: 32,
      music: 'alo alo',
      album: '10 Downing Street',
      visit: 352000,
      description:
        'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
      key: '4',
      musicLength: 'John',
      dataIndex: 42,
      music: 'Mar',
      album: '10 Downing Street',
      visit: 245512,
      description:
        'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
  ];

  const columns = [
    {
      title: 'تعداد پلی',
      dataIndex: '.',
      key: '.',
    },
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '',
      dataIndex: 'cover',
      key: 'cover',
    },

    {
      title: 'آهنگ',
      dataIndex: 'music',
      key: 'music',
    },
    {
      title: 'آلبوم',
      dataIndex: 'album',
      key: 'album',
      align: 'center',
    },
    {
      title: 'زمان',
      dataIndex: 'musicLength',
      key: 'musicLength',
    },
    {
      title: 'تعداد پلی',
      dataIndex: 'visit',
      key: 'visit',
    },
    {
      title: 'تکست آهنگ',
      dataIndex: 'lyrics',
      key: 'lyrics',
      align: 'center',
      render: (text, record) => (
        <Space size="middle">
          <AlignCenterOutlined
            style={{ fontSize: '25px' }}
            onClick={useCallback(() => setExpendable(!expendable), [
              expendable,
            ])}
          />
        </Space>
      ),
    },
    {
      title: '',
      dataIndex: 'playIcon',
      key: 'playIcon',
      render: (text, record) => (
        <Space size="middle">
          <PlayCircleOutlined style={{ fontSize: '25px' }} />
        </Space>
      ),
    },
  ];
  return (
    <Row justify="center" align="middle">
      <Col lg={20} xs={24}>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          expandIconColumnIndex={8}
          expandIconAsCell="false"
          expandedRowRender={(record) => <p>{record.description}</p>}
          expandable={{
            expandIconAsCell: false,
          }}
        />
      </Col>
    </Row>
  );
};

MusicTable.propTypes = {};

export default MusicTable;
