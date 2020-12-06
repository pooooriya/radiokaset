import { Menu } from 'antd';
import React from 'react';
import Link from '@/components/Link/Link';
import s from './FixedMenu.scss';
import { useRouter } from 'next/router';
import { SiGoogleplay } from 'react-icons/si';
import { RiPlayListLine } from 'react-icons/ri';
import { FaPodcast } from 'react-icons/fa';
import { IoIosAlbums } from 'react-icons/io';
import { RiUserVoiceFill } from 'react-icons/ri';
const Card = () => {
  const { pathname } = useRouter();

  return (
    <div className={s.fixedMenu}>
      <Menu
        mode="inline"
        theme="dark"
        direction="ltr"
        defaultSelectedKeys={['/']}
        selectedKeys={[pathname]}
        style={{ flexDirection: 'row' }}
      >
        {/* <Menu.Item key="2" icon={<SearchOutlined />}>
      <Link to="/search">جست و جو</Link>
    </Menu.Item> */}
        <Menu.Item key="/artist" style={{ height: '100%' }}>
          <RiUserVoiceFill />
          <Link to="/artist"> </Link>
        </Menu.Item>
        <Menu.Item key="/album" style={{ height: '100%' }}>
          <IoIosAlbums />
          <Link to="/album"></Link>
        </Menu.Item>
        <Menu.Item
          key="/"
          style={{
            height: '100% !important',
          }}
        >
          <SiGoogleplay />
          <Link to="/" />
        </Menu.Item>
        <Menu.Item key="/playlist" style={{ height: '100%' }}>
          <RiPlayListLine />
          <Link to="/playlist" />
        </Menu.Item>
        <Menu.Item key="/podcast" style={{ height: '100%' }}>
          <FaPodcast />
          <Link to="/podcast"></Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

{
  /* <ul>
<li key="/" >
  <Link to="/">
    <CustomerServiceOutlined />
    کاست
  </Link>
</li>
<li key="/artist">
  <Link to="/artist">
    <UserOutlined />
    خوانندگان
  </Link>
</li>
<li key="/search">
  <Link to="/search">
    <SearchOutlined />
    جست و جو
  </Link>
</li>
<li key="/album">
  <Link to="/album">
    <CaretRightOutlined />
    آلبوم
  </Link>
</li>
</ul> */
}

export default Card;
