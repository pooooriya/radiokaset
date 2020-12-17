import { Layout, Menu, ConfigProvider, BackTop } from 'antd';
import Link from '@/components/Link/Link';
import {
  UpOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import cx from 'classnames';
import ReactImageFallback from 'react-image-fallback';
import faIR from 'antd/lib/locale-provider/fa_IR';
import withSizes from 'react-sizes';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { useRouter } from 'next/router';
import Footer from '@/components/Footer/Footer';
import FixedMenu from '@/components/FixedMenu/FixedMenu';
import { CgMenu } from 'react-icons/cg';
import { GoSearch } from 'react-icons/go';
import { SiGoogleplay } from 'react-icons/si';
import { RiPlayListLine } from 'react-icons/ri';
import { FaPodcast } from 'react-icons/fa';
import { IoIosAlbums } from 'react-icons/io';
import { RiUserVoiceFill } from 'react-icons/ri';
const { Header, Sider } = Layout;

const MasterLayout = (props) => {
  const router = useRouter();
  const { isTablet } = props;
  const [collapse, setCollapse] = useState(true);
  const onCollapse = () => {
    setCollapse(!collapse);
  };
  return (
    <ConfigProvider locale={faIR} direction="rtl">
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider
          collapsible
          collapsed={collapse}
          onCollapse={onCollapse}
          trigger={null}
          theme="dark"
          className={cx('sidebar', !collapse && ' sidebar_open')}
          style={{
            position: 'fixed',
            left: '0',
            zIndex: 10,
            minHeight: '100vh',
          }}
        >
          <div className="logo-bar">
            <ReactImageFallback
              src="/cassette.svg"
              fallbackImage="/cassette.svg"
              className="logo"
            />
            {collapse ? (
              <MenuUnfoldOutlined
                onClick={onCollapse}
                style={{ color: '#fff' }}
              />
            ) : (
              <MenuFoldOutlined
                onClick={onCollapse}
                style={{ color: '#fff' }}
              />
            )}
          </div>

          <Menu
            mode="inline"
            theme="dark"
            direction="ltr"
            defaultSelectedKeys={['/']}
            selectedKeys={[router?.pathname]}
          >
            <Menu.Item key="/" icon={<SiGoogleplay className="anticon" />}>
              <Link to="/">کاست</Link>
            </Menu.Item>
            {/* <Menu.Item key="2" icon={<SearchOutlined />}>
              <Link to="/search">جست و جو</Link>
            </Menu.Item> */}
            <Menu.Item
              key="/artist"
              icon={<RiUserVoiceFill className="anticon" />}
            >
              <Link to="/artist">خوانندگان</Link>
            </Menu.Item>
            <Menu.Item
              key="/playlist"
              icon={<RiPlayListLine className="anticon" />}
            >
              <Link to="/playlist">پلی لیست ها</Link>
            </Menu.Item>
            <Menu.Item key="/podcast" icon={<FaPodcast className="anticon" />}>
              <Link to="/podcast">پادکست ها</Link>
            </Menu.Item>
            <Menu.Item key="/album" icon={<IoIosAlbums className="anticon" />}>
              <Link to="/album">آلبوم خوانندگان</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          className="site-layout"
          style={{
            margin: `${
              isTablet ? '0' : collapse ? '0 0 0 80px' : '0 0 0 200px'
            }`,
            minHeight: '100vh',
            transition: 'all ease .3s',
          }}
        >
          <Header
            className="site-layout-background header"
            style={{ padding: 0 }}
          >
            <div className="header_collapesd">
              <CgMenu onClick={onCollapse} />
            </div>
            <div className="header_handwriter">
              <Link to="/">
                <ReactImageFallback
                  fallbackImage="/cassette.png"
                  src="/cassette.png"
                  className="headerHandwrite"
                  alt="رادیو کاست"
                />
              </Link>
            </div>
            <div className="header_signBox">
              <>
                {router.pathname === '/' ? (
                  <AnchorLink
                    href="#boxSearch"
                    offset="50"
                    style={{ color: '#fff' }}
                    // className={s.sidebarHeader__search}
                  >
                    <GoSearch rotate={90} />
                  </AnchorLink>
                ) : (
                  <Link to="/search">
                    <GoSearch style={{ color: '#f7f7f7' }} />{' '}
                  </Link>
                )}
              </>
            </div>
          </Header>
          {props.children}
          <Footer />
          <FixedMenu />
        </Layout>
        <BackTop
          visibilityHeight={600}
          style={{
            left: `${isTablet ? '30px' : !collapse ? '230px' : '100px'}`,
            bottom: `${isTablet ? '80px' : '75'}`,
            transition: 'all ease .2s',
          }}
        >
          <div className="layout_moveUp">
            <UpOutlined />
          </div>
        </BackTop>
      </Layout>
    </ConfigProvider>
  );
};

const mapSizesToProps = ({ width }) => ({
  isTablet: width < 768,
});

MasterLayout.propTypes = {};

export default withSizes(mapSizesToProps)(MasterLayout);
