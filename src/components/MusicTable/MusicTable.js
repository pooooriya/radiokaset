import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Divider, Row, Space, Table } from 'antd';
import {
  AlignCenterOutlined,
  CaretRightOutlined,
  MinusCircleTwoTone,
  PlayCircleOutlined,
  PlaySquareOutlined,
  PlusCircleTwoTone,
} from '@ant-design/icons';
import s from './MusicTable.scss';

const MusicTable = (props) => {
  const [expandedRowKeys, setexpandedRowKeys] = useState([]);

  const onTableRowExpand = (expanded, record) => {
    updateExpandedRowKeys({ record });
  };

  const updateExpandedRowKeys = ({ record }) => {
    const rowKey = record.key;
    const isExpanded = expandedRowKeys.find((key) => key === rowKey);
    let expandedRowKey = [];
    if (isExpanded) {
      expandedRowKey = expandedRowKeys.reduce((acc, key) => {
        if (key !== rowKey) acc.push(key);
        return acc;
      }, []);
    } else {
      expandedRowKey.push(rowKey);
    }
    setexpandedRowKeys(expandedRowKey);
  };

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

  const columns = ({ updateExpandedRowKeys }) => [
    {
      title: 'تعداد پلی',
      dataIndex: '.',
      key: '.',
      responsive: ['sm'],
    },
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      responsive: ['sm'],
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
      responsive: ['sm'],
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
      responsive: ['sm'],
    },
    {
      title: 'تکست آهنگ',
      dataIndex: 'lyrics',
      key: 'lyrics',
      align: 'center',
      render: (text, record, index) => (
        <Space size="middle">
          {/* {console.log(record, text, index)} */}
          <AlignCenterOutlined
            style={{ fontSize: '25px' }}
            onClick={(rowKey) => updateExpandedRowKeys({ record })}
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
      <Divider orientation="right" className={s.dvider}>
        بهترین های مهراد هیدن
      </Divider>
      <Col lg={20} xs={24}>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          expandedRowKeys={expandedRowKeys}
          onExpand={onTableRowExpand}
          expandIconColumnIndex={-1}
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.lyrics}</p>
            ),
          }}
          columns={columns({
            updateExpandedRowKeys: (e) => updateExpandedRowKeys(e),
          })}
        />
      </Col>
    </Row>
  );
};

MusicTable.propTypes = {};

export default MusicTable;
