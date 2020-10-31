import { SITE_URL } from '../../env';

const Hashids = require('hashids/cjs');

export const createNewLink = (to) => {
  const res = to
    .replace(SITE_URL, '/')
    .replace('/faq?specialty=', '')
    .replace('/faq?doctor=', '')
    .replace('/articles?specialty=', '')
    .replace('/articles?doctor=', '')
    .replace('/faq/add?doctor=', '')
    .replace('/faq/', '')
    .replace('/doctors/', '')
    .replace('/health-centers/', '')
    .replace('/articles/', '');
  let hashedTo = to;
  if (!Number.isNaN(res)) {
    const hashids = new Hashids('', 3);

    const hashedId = hashids.encode(res);
    hashedTo = hashedId ? to.replace(res, hashedId) : to;
  }
  return hashedTo;
};

export const SEOandHashesChanges = (context, params) => {
  const { query, route } = context;
  const { path } = route;
  const { id } = params;
  const paramsNew = params;
  const hashids = new Hashids('', 3);
  let canonical = `${SITE_URL.substr(0, SITE_URL.length - 1)}`;

  const dehashedID = hashids.decode(id);

  switch (path) {
    case '/doctors/:id':
    case '/health-centers/:id':
    case '/articles/:id':
    case '/faq/:id':
      if (dehashedID && dehashedID[0]) {
        canonical += path.replace(':id', id);
        paramsNew.id = dehashedID[0];
      } else {
        canonical += path.replace(':id', hashids.encode(id));
      }
      break;
    case '/specialties/:specialty':
      canonical += path.replace(':specialty', params.specialty);
      break;

    case '/specialties/:specialty/:city':
      canonical += path
        .replace(':specialty', params.specialty)
        .replace(':city', params.city);
      break;

    case '/faq':
    case '/articles':
    case '/faq/add':
      if (query) {
        query.specialty = query.specialty
          ? hashids.decode(query.specialty)[0]
          : null;
        query.doctor = query.doctor ? hashids.decode(query.doctor)[0] : null;
      }
      break;
    default:
  }

  return { canonical, context, paramsNew };
};

// eslint-disable-next-line no-unused-vars
export const hashedID = (id, type = 'doctop') => {
  const hashids = new Hashids('', 3);
  const hashedId = hashids.encode(id);
  return hashedId;
};

// eslint-disable-next-line no-unused-vars
export const dehashedID = (id, type = 'doctop') => {
  const hashids = new Hashids('', 3);
  const dehashedId = hashids.decode(id);
  return dehashedId && dehashedId[0];
};
