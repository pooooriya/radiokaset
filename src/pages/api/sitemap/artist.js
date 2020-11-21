import { API_URL, SITE_URL } from '@/root/env';
import { streamToPromise, SitemapStream } from 'sitemap';
import { hashedID } from '@/root/src/modules/seo';
import Axios from 'axios';

export default async (req, res) => {
  res.setHeader('Content-Type', 'application/xml');
  const { page } = req.query;
  const sitemapStream = new SitemapStream({ hostname: SITE_URL });
  //
  let data;

  try {
    data = await Axios.get(`${API_URL}/sitemap/artist/${page}`);
    data = data?.data;
    if (data) {
      // eslint-disable-next-line no-restricted-syntax
      for (const item of data) {
        sitemapStream.write({
          url: `${SITE_URL}artist/${hashedID(item.id)}`,
        });
      }
    }
  } catch (e) {
    res.statusCode = 400;
  }

  let xml;
  try {
    sitemapStream.end();
    const response = await streamToPromise(sitemapStream);
    xml = response.toString();
    res.statusCode = 200;
  } catch (e) {
    res.statusCode = 400;
  }
  res.write(xml);
  res.end();
};
