import { Layout, Menu, Breadcrumb, ConfigProvider } from 'antd';
import Link from 'next/link';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  BarsOutlined,
  HomeOutlined,
  SearchOutlined,
  CustomerServiceOutlined,
  ControlOutlined,
  SoundOutlined,
  CaretRightOutlined,
  ForwardOutlined,
  KeyOutlined,
  LoginOutlined,
  EllipsisOutlined,
  IdcardOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { appContext } from '../../providers/App';
import cx from 'classnames';
import ReactImageFallback from 'react-image-fallback';
import faIR from 'antd/lib/locale-provider/fa_IR';
import withSizes from 'react-sizes';
import { useScroll } from '@/modules/customHooks';

const { Header, Sider } = Layout;

const MasterLayout = (props) => {
  const [isScrolled, setisScrolled] = useState(false);
  const scroller = useScroll();

  useEffect(() => {
    if (scroller?.scrollY > 200 && scroller?.scrollDirection === 'up') {
      setisScrolled(true);
    } else {
      setisScrolled(false);
    }
  }, [scroller?.scrollY]);
  const { isTablet } = props;
  const [collapse, setCollapse] = useState(true);
  const onCollapse = () => {
    setCollapse(!collapse);
  };
  return (
    <ConfigProvider locale={faIR} direction="rtl">
      <Layout style={{ minHeight: '100vh' }}>
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
          <ReactImageFallback
            src="/logo.svg"
            fallbackImage="/logo.svg"
            className="logo"
          />
          <Menu
            defaultSelectedKeys={['1']}
            mode="inline"
            theme="dark"
            direction="ltr"
          >
            <Menu.Item key="1" icon={<CustomerServiceOutlined />}>
              <Link href="/">کاست</Link>
            </Menu.Item>

            <Menu.Item key="2" icon={<SearchOutlined />}>
              <Link href="/search">جست و جو</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<ControlOutlined />}>
              <Link href="/genre">سبک ها</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              <Link href="/artist"> هنرمندان</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<CaretRightOutlined />}>
              <Link href="/album">آلبوم</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<ForwardOutlined />}>
              <Link href="/playlist">پلی لیست</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<SoundOutlined />}>
              <Link href="/podcast"> پادکست</Link>
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
            className="site-layout-background"
            style={{ padding: 0 }}
            className={cx('header', isScrolled && 'header_fixed')}
          >
            <div className="header_collapesd">
              {onCollapse ? (
                <MenuUnfoldOutlined onClick={onCollapse} />
              ) : (
                <MenuFoldOutlined onClick={onCollapse} />
              )}
            </div>
            <div className="header_handwriter">
              <ReactImageFallback
                fallbackImage="/handwriter.png"
                src="/handwrite.png"
                className="headerHandwrite"
              />
            </div>
            <div className="header_signBox">
              <SearchOutlined rotate={90} />
            </div>
          </Header>
          {props.children}
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

const mapSizesToProps = ({ width }) => ({
  isTablet: width < 768,
});

MasterLayout.propTypes = {};

export default withSizes(mapSizesToProps)(MasterLayout);
