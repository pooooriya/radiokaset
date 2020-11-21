import React, { useContext } from 'react';
import s from './MusicInfo.scss';
import { PlayCircleOutlined, UserOutlined } from '@ant-design/icons';
import { hashedID } from '@/root/src/modules/seo';
import Link from '@/components/Link/Link';
import Button from '@/components/Button/Button';
import { appContext } from '@/providers/App';
import { v4 as uuidv4 } from 'uuid';
import { API_URL } from '@/root/env';

const MusicInfo = ({ data }) => {
  const audiolist = [];
  const { setPLaylist } = useContext(appContext);
  const addToPlayList = () => {
    setPLaylist([]);
    audiolist.push({
      name: data?.persianTitle,
      singer: data?.artist?.persianTitle,
      cover: `${API_URL}${data?.cover?.url}`,
      musicSrc: `${API_URL}${data?.musicFile?.url}`,
      lyric: data?.lyrics ? data?.lyrics : '',
      key: 0,
      idi: data?.id,
      table: uuidv4(),
    });
    setPLaylist(audiolist);
  };

  return (
    <div className={s.musicInfo}>
      <div>
        <h1>{data?.artist?.englishTitle}</h1>
        <h2>{data?.englishTitle}</h2>
      </div>
      <div>
        {data?.view && <h3>{data?.view} بار شنیده شده</h3>}
        {data?.genre && <h3> در سبک {data?.genre?.persianTittle} </h3>}
        {data?.album ? (
          <>
            <h4> آین آهنگ مربوط به آلبوم {data?.album?.persianTitle} است</h4>
            <Link>
              <h3>
                تمام آهنگ های آلبوم {data?.album?.persianTitle} را اینجا گوش
                کنید
              </h3>
            </Link>
          </>
        ) : (
          <h3>این آهنگ سینگل ترک است </h3>
        )}
      </div>
      <div className={s.playIcon}>
        <Button
          // {...form}
          // disabled={!form.dirty || form.isSubmitting}
          name="submit"
          type="primary"
          htmlType="submit"
          size="large"
          onClick={() => addToPlayList()}
          className={s.play}
        >
          <PlayCircleOutlined className={s.buttonIcon} />
          پخش کاست
        </Button>
      </div>
      <Link to={`/artist/${hashedID(data?.artist?.id)}`}>
        <Button
          // {...form}
          // disabled={!form.dirty || form.isSubmitting}
          name="submit"
          type="primary"
          htmlType="submit"
          size="large"
          className={s.play}
        >
          <UserOutlined className={s.buttonIcon} />
          صفحه آرتیست
        </Button>
      </Link>
    </div>
  );
};

MusicInfo.propTypes = {};

export default MusicInfo;
