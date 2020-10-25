import { useEffect } from 'react';
import App from 'next/app';
import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';
import MobileDetect from 'mobile-detect';
import { SizesProvider } from 'react-sizes';
import { ConfigProvider, notification } from 'antd';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { parseCookies, destroyCookie } from 'nookies';
import faIR from 'antd/lib/locale-provider/fa_IR';
import { AppProvider } from '@/providers/App';
import { isJson } from '../madules/index';
import 'antd/dist/antd.less';
import '@/styles/font.less';
import '@/styles/global.less';

const DynamicComponentWithNoSSR = dynamic(
  () => import('@/components/Player/Player'),
  { ssr: false }
);

function MyApp({ Component, pageProps, data }) {
  // Config Axios
  if (data.authenticated) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  }
  useEffect(() => {
    axios.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (error.response && error.response.status === 403) {
          notification.error({
            message: 'You do not have access',
            description: 'Please contact support.',
          });
        }
        if (error.response && error.response.status === 500) {
          notification.error({
            message: 'There is a problem',
            description: 'Please contact support.',
          });
        }
        if (error.response && error.response.status === 401) {
          destroyCookie(null, 'token');
          destroyCookie(null, 'user');
          axios.defaults.headers.common['Authorization'] = '';
        }
        return Promise.reject(error);
      }
    );
    NProgress.configure({ showSpinner: false });
    Router.events.on('routeChangeStart', () => NProgress.start());
    Router.events.on('routeChangeComplete', () => NProgress.done());
    Router.events.on('routeChangeError', () => NProgress.done());

    return () => {
      Router.events.off('routeChangeStart', () => NProgress.start());
      Router.events.off('routeChangeComplete', () => NProgress.done());
      Router.events.off('routeChangeError', () => NProgress.done());
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <AppProvider
        authenticated={data.authenticated}
        userInfo={data.userData}
        userID={data.userID}
        role={data.role}
        token={data.token}
        collapse={data.collapse}
      >
        <SizesProvider config={data.sizes}>
          <Component {...pageProps} />
          <DynamicComponentWithNoSSR />
        </SizesProvider>
      </AppProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const { req } = appContext.ctx;
  let authenticated = false;
  let userID = null;
  let token = null;
  let role = null;
  let userData = null;
  let collapse = false;
  let sizes = {
    fallbackWidth: 1280,
    fallbackHeight: 700,
  };

  if (req) {
    const cookies = parseCookies({ req });
    authenticated = !!cookies.token;
    token = cookies.token || null;
    userData = isJson(cookies.user) ? JSON.parse(cookies.user) : null;
    role = userData?.role?.name?.toLowerCase() || null;
    userID = userData?.id || null;
    collapse = isJson(cookies.collapse) ? JSON.parse(cookies.collapse) : false;

    const md = new MobileDetect(req.headers['user-agent']);
    if (md.mobile()) {
      sizes = {
        fallbackWidth: 360,
        fallbackHeight: 640,
      };
    } else if (md.tablet()) {
      sizes = {
        fallbackWidth: 768,
        fallbackHeight: 1024,
      };
    }
  }

  const appProps = await App.getInitialProps(appContext);

  return {
    ...appProps,
    data: {
      sizes,
      authenticated,
      userID,
      token,
      role,
      userData,
      collapse,
    },
  };
};

export default MyApp;
