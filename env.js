let apiUrl;
let siteUrl;
let adminUrl;
let rcEnv = false;

const env = process.env.NODE_ENV;

if (env === 'production') {
  apiUrl = 'https://api.doctop.com';
  siteUrl = 'https://doctop.com/';
  adminUrl = 'https://api.doctop.com/paneldoctop';
} else if (env === 'development') {
  apiUrl = 'https://api-dev.topdoc.ir';
  siteUrl = 'https://dev.topdoc.ir/';
  adminUrl = 'https://dev.topdoc.ir/admin';
  rcEnv = true;
} else {
  apiUrl = 'https://api-dev.topdoc.ir';
  siteUrl = 'https://dev.topdoc.ir/';
  adminUrl = 'https://api-dev.topdoc.ir/admin';
  rcEnv = true;
}
// local host:
apiUrl = 'http://localhost:1337';
// siteUrl = 'http://localhost:3000';

export const API_URL = apiUrl;
export const SITE_URL = siteUrl;
export const ADMIN_URL = adminUrl;
export const RC_ENV = rcEnv;
