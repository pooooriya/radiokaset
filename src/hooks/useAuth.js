import React, { useContext } from 'react';
import { appContext } from '@/providers/App';
import { Router } from '@/modules/i18n';

const isBrowser = () => {
  return typeof window !== 'undefined';
};

export const withAuth = (WrappedComponent) => (props) => {
  const { isAuthenticated } = useContext(appContext);
  if (!isAuthenticated && isBrowser()) {
    Router.push('/');
    return <></>;
  }
  return <WrappedComponent {...props} {...isAuthenticated} />;
};

withAuth.getInitialProps = (ctx) => {
  // We check for ctx.res to make sure we're on the server.
  if (ctx.res) {
    ctx.res.writeHead(302, { Location: '/' });
    ctx.res.end();
  }
  return {};
};

export const withoutAuth = (WrappedComponent) => (props) => {
  const { isAuthenticated } = useContext(appContext);
  if (isAuthenticated && isBrowser()) {
    Router.push('/dashboard');
    return <></>;
  }

  return <WrappedComponent {...props} {...!isAuthenticated} />;
};

withoutAuth.getInitialProps = (ctx) => {
  // We check for ctx.res to make sure we're on the server.
  if (ctx.res) {
    ctx.res.writeHead(302, { Location: '/dashboard' });
    ctx.res.end();
  }
  return {};
};
