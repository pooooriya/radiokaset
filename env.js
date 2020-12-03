let apiUrl;
let siteUrl;
let adminUrl;

const env = 'production';

if (env === 'production') {
  apiUrl = 'https://api.radiokaset.com';
  siteUrl = 'https://radiokaset.com/';
  adminUrl = 'https://api.radiokaset.com/admin';
} else if (env === 'development') {
  apiUrl = 'https://api.radiokaset.com';
  siteUrl = 'https://radiokaset.com/';
  adminUrl = 'https://api.radiokaset.com/admin';
}

// local host:
// apiUrl = 'http://localhost:1337';
// siteUrl = 'http://localhost:3000';

export const API_URL = apiUrl;
export const SITE_URL = siteUrl;
export const ADMIN_URL = adminUrl;
