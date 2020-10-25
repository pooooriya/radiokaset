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
import { useContext } from 'react';
import { appContext } from '../../providers/App';
import s from './Layout.scss';
import cx from 'classnames';
import ReactImageFallback from 'react-image-fallback';
import faIR from 'antd/lib/locale-provider/fa_IR';

const { Header, Sider } = Layout;

const MasterLayout = (props) => {
  const { collapse, setCollapse } = useContext(appContext);
  const onCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <ConfigProvider locale={faIR}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsed={collapse}
          onCollapse={onCollapse}
          collapsible
          theme="light"
          className={cx(s.sidebar, !collapse && s.sidebar_open)}
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
            className={s.logo}
          />
          <Menu
            defaultSelectedKeys={['1']}
            mode="inline"
            theme="light"
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
            marginLeft: `${collapse ? ' 80px' : '200px'}`,
            transition: 'all ease .7s',
            minHeight: '100vh',
          }}
        >
          <Header
            className="site-layout-background"
            style={{ padding: 0 }}
            className={s.header}
          >
            <div className={s.header_collapesd}>
              <EllipsisOutlined onClick={onCollapse} rotate={90} />
            </div>
            <div className={s.header_handwriter}>
              <ReactImageFallback
                fallbackImage="/handwrite.png"
                src="/handwrite.png"
                className={s.headerHandwrite}
              />
            </div>
            <div className={s.header_signBox}>
              <SearchOutlined rotate={90} />
            </div>
          </Header>
          {props.children}
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

MasterLayout.propTypes = {};

export default MasterLayout;
