import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Divider, Row, Space, Table } from 'antd';
import {
  AlignCenterOutlined,
  CaretRightOutlined,
  MinusCircleTwoTone,
  PauseCircleOutlined,
  PlayCircleOutlined,
  PlaySquareOutlined,
  PlusCircleTwoTone,
} from '@ant-design/icons';
import s from './MusicTable.scss';
import { appContext } from '@/providers/App';
import { API_URL } from '@/root/env';
import ReactImageFallback from 'react-image-fallback';

const MusicTable = ({ data, title, album, subjects }) => {
  const dataSource = [];
  let audiolist = [];
  const [expandedRowKeys, setexpandedRowKeys] = useState([]);
  const {
    setPLaylist,
    setCurrentIndex,
    currentIndex,
    setIsPlaying,
    isPlaying,
    playlist,
  } = useContext(appContext);

  const playingMusic = async (record, rowIndex) => {
    if (audiolist && audiolist.length === 0 && !isPlaying) {
      await data?.map((i, index) => {
        audiolist.push({
          name: i?.persianTitle,
          singer: i?.artist?.persianTitle,
          cover: `${API_URL}${i?.cover?.url}`,
          musicSrc: `${API_URL}${i?.musicFile?.url}`,
          lyric: i?.lyrics ? i?.lyrics : '',
          key: index,
          table: subjects,
        });
      });
      setPLaylist(audiolist);
      setCurrentIndex(rowIndex);
    } else {
      if (playlist.filter((i) => i.table !== record?.table).length > 0) {
        await data?.map((i, index) => {
          setPLaylist([]);
          audiolist.push({
            name: i?.persianTitle,
            singer: i?.artist?.persianTitle,
            cover: `${API_URL}${i?.cover?.url}`,
            musicSrc: `${API_URL}${i?.musicFile?.url}`,
            lyric: i?.lyrics ? i?.lyrics : '',
            key: index,
            table: subjects,
          });
        });
        await setPLaylist(audiolist);
        await setCurrentIndex(rowIndex);
      } else {
        setCurrentIndex(rowIndex);
      }
    }
  };
  data?.map((i, index) => {
    dataSource.push({
      key: index + 1,
      musicTitle: `${i?.englishTitle} (${i?.persianTitle})`,
      musicLength: i?.musicLength,
      album: `${i?.album?.englishTitle} (${i?.album?.persianTitle})`,
      view: i?.view != null ? i.view : '0',
      cover: i?.cover?.url ? `${API_URL}${i?.cover.url}` : '/defaultavatar.jpg',
      lyrics: i?.lyrics ? i?.lyrics : 'تکستی برای این آهنگ یافت نشد',
      table: subjects,
    });
  });

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

  const columns = ({ updateExpandedRowKeys }) => [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      responsive: ['sm'],
    },
    {
      title: 'کاور',
      dataIndex: 'cover',
      key: 'cover',
      render: (text, record, index) => (
        <Space size="middle">
          <ReactImageFallback
            src={record?.cover}
            fallbackImage={record?.cover}
            className={s.musicCover}
          />
        </Space>
      ),
    },

    {
      title: 'آهنگ',
      dataIndex: 'musicTitle',
      key: 'musicTitle',
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
      align: 'center',
    },
    {
      title: 'تعداد پلی',
      dataIndex: 'view',
      key: 'view',
      responsive: ['sm'],
      align: 'center',
    },
    {
      title: 'تکست آهنگ',
      dataIndex: 'lyrics',
      key: 'lyrics',
      align: 'center',
      render: (text, record, index) => (
        <Space size="middle">
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
      render: (text, record, index) => (
        <Space size="middle">
          {record.key === currentIndex + 1 && isPlaying ? (
            <PauseCircleOutlined style={{ fontSize: '25px' }} />
          ) : (
            <PlayCircleOutlined style={{ fontSize: '25px' }} />
          )}
        </Space>
      ),
    },
  ];
  return (
    <Row justify="center" align="middle">
      {title && (
        <Divider orientation="right" className={s.dvider}>
          {title}
        </Divider>
      )}
      <Col lg={20} xs={24}>
        {album && (
          <Row gutter={[24, 24]} className={s.album} justify="space-around">
            <Col flex="250px">
              <ReactImageFallback
                src={`${API_URL}${album?.cover?.url}`}
                fallbackImage={`${API_URL}${album?.cover?.url}`}
                className={s.album_cover}
              />
            </Col>
            <Col xs={24} lg={16} md={16}>
              <div className={s.album_info}>
                <h2>{album?.englishTitle}</h2>
                <h3>{album?.persianTitle}</h3>
                <h4> {data.length} کاست</h4>
                <h4>{album?.albumDuration} دقیقه </h4>
                <h4>سال انتشار ؛ {album?.releasedAt} </h4>
                <h4> در سبک {album?.genre?.persianTittle} </h4>
                <h4>{album?.description}</h4>
              </div>
            </Col>
          </Row>
        )}

        <Table
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                console.log(record, subjects, playlist);
                playingMusic(record, rowIndex);
              },
            };
          }}
          dataSource={dataSource}
          columns={columns}
          rowClassName={(record) =>
            record.key === currentIndex + 1 &&
            isPlaying &&
            playlist.find(
              (i) => i?.table === record?.table && i.key + 1 === record?.key
            )
              ? 'data-row active-row'
              : 'data-row'
          }
          pagination={false}
          expandedRowKeys={expandedRowKeys}
          onExpand={onTableRowExpand}
          expandIconColumnIndex={-1}
          expandable={{
            expandedRowRender: (record) => (
              <>
                <div
                  className={s.music_lyrics}
                  dangerouslySetInnerHTML={{
                    __html: record?.lyrics,
                  }}
                />
              </>
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
