import { isEmpty } from 'lodash';
import Router from 'next/router';
import { persianNumbersToEnglish } from './farsi_helper';

export const numberWithCommas = (x) =>
  x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const numberRialToTomanWithCommas = (x) =>
  (x / 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const numberToDelNumber = (x) =>
  x.toString().replace(/\d/g, (digit) => `${digit}\u0336`);

export const isNumeric = (x) => !isNaN(parseFloat(x)) && isFinite(x); //eslint-disable-line

export const toPersianNum = (n) => {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  return n
    .toString()
    .split('')
    .map((x) => farsiDigits[x])
    .join('');
};

export const transformKeyLabel = (data) => {
  return data
    ? data.map((item) => {
        const option = {};
        if (item) {
          // option.value = specialty.id ? specialty.id : 0;
          option.value = item.name ? item.name : 0;
          option.label = item.name ? item.name : '';
        }
        return option;
      })
    : [];
};

export const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return 'n/a';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes} ${sizes[i]})`;
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
};

export const objToQuery = (obj) =>
  Object.keys(obj)
    .reduce((a, k) => {
      a.push(`${k}=${encodeURIComponent(obj[k])}`);
      return a;
    }, [])
    .join('&');

export const objectToQuery = (obj) => {
  const query = [];
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      if (Array.isArray(obj[key])) {
        obj[key].map((val) => query.push(`${key}=${val}`));
      } else {
        query.push(`${key}=${obj[key]}`);
      }
    }
  });
  return query?.join('&');
};

export const serialize = (obj) => {
  const str = [];
  const query = obj;
  delete query.search;
  delete query.sort;
  Object.keys(query).forEach((q) => {
    str.push(`${encodeURIComponent(q)}=${encodeURIComponent(query[q])}`);
  });
  return str.length > 0 ? `&${str.join('&')}` : '';
};

export const queryBuilder = (obj) => {
  const ret = {};
  const query = obj;
  delete query.search;
  delete query.sort;
  Object.keys(query).forEach((q) => {
    if (q !== '' && query[q].split('__')[1] !== '')
      ret[`${query[q].split('__')[0]}__${q}`] = query[q].split('__')[1];
  });
  return serialize(ret);
};

export const queryToObject = (query) => {
  const ret = {};
  Object.keys(query).forEach((q) => {
    if (q !== '' && query[q].split('__')[1] !== '')
      ret[q.split('__')[1]] = `${q.split('__')[0]}__${query[q]}`;
  });
  return ret;
};

/**
 * Get the user IP throught the webkitRTCPeerConnection
 * @param onNewIP {Function} listener function to expose the IP locally
 * @return undefined
 */
export const getUserIP = (onNewIP) => {
  //  onNewIp - your listener function for new IPs
  // compatibility for firefox and chrome
  const MyPeerConnection =
    window.RTCPeerConnection ||
    window.mozRTCPeerConnection ||
    window.webkitRTCPeerConnection;
  const pc = new MyPeerConnection({
    iceServers: [],
  });
  const noop = () => {};
  const localIPs = {};
  const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;

  function iterateIP(ip) {
    if (!localIPs[ip]) onNewIP(ip);
    localIPs[ip] = true;
  }

  // create a bogus data channel
  pc.createDataChannel('');

  // create offer and set local description
  pc.createOffer()
    .then((sdp) => {
      sdp.sdp.split('\n').forEach((line) => {
        if (line.indexOf('candidate') < 0) return;
        line.match(ipRegex).forEach(iterateIP);
      });

      pc.setLocalDescription(sdp, noop, noop);
    })
    .catch(() => {
      // An error occurred, so handle the failure to connect
    });

  // listen for candidate events
  pc.onicecandidate = (ice) => {
    if (
      !ice ||
      !ice.candidate ||
      !ice.candidate.candidate ||
      !ice.candidate.candidate.match(ipRegex)
    )
      return;
    ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
  };
};

export const getCurrentPosition = (options = {}) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export const showDoctorDisplayName = (query) => {
  let doctorName = '';
  if (query) {
    const isDoctorRegistered =
      (typeof query?.user !== 'undefined' &&
        query?.user &&
        (query?.user?.displayName ||
          (query?.user?.firstName && query?.user?.lastName))) ||
      (typeof query?.status !== 'undefined' &&
        query?.status &&
        query?.status !== 'notRegister');
    // if doctor registered
    if (isDoctorRegistered) {
      doctorName =
        query?.user?.displayName ||
        `${query?.user?.firstName} ${query?.user?.lastName}`;
    }
    // if not registered or not has user or not has status
    else if (
      (!isDoctorRegistered && query.displayName) ||
      (query?.firstName && query?.lastName)
    ) {
      doctorName =
        query?.displayName || `${query?.firstName} ${query?.lastName}`;
    } else {
      doctorName = query?.metaTitle ? query?.metaTitle : 'بدون نام';
    }
  }
  return doctorName;
};

export const padZeroStart = (value, count) => {
  // if (value && value.length < count) {
  //   console.log(value.padStart(count, '0'));
  // }

  let result = value && value !== '0' ? value.toString() : '';
  if (result && result.length > 0) {
    for (let i = result.length; i < count; i += 1) {
      result = '0'.concat(result);
    }
  }

  return persianNumbersToEnglish(result);
};

export const validPhoneNumber = (value) => padZeroStart(value, 11);

export const validNationalCode = (value) => padZeroStart(value, 10);

export const abbreviation = (day) => {
  switch (day) {
    case 'sat':
      return 'شنبه';

    case 'sun':
      return 'یک شنبه';

    case 'mon':
      return 'دوشنبه';

    case 'tue':
      return 'سه شنبه';

    case 'wed':
      return 'چهار شنبه';

    case 'thu':
      return 'پنج شنبه';

    default:
      return 'نا مشخص';
  }
};

export const metaFinder = (query, type) => {
  let metas = null;
  if (query && query.length > 0) {
    metas = query.map((item) => item.meta).filter((meta) => meta.type === type);
  }
  return metas;
};

export const doctorIsUser = (doctor, userInfo) => {
  if (!isEmpty(userInfo)) {
    return (
      doctor.user &&
      doctor.user.id &&
      userInfo.id &&
      doctor.user.id.toString() !== userInfo.id.toString()
    );
  }
  return true;
};

export const getLocationHref = () => {
  let href = '';
  if (Router?.location) {
    const { pathname, search } = Router?.location;
    href = pathname + search;
  }
  return href;
};

export const getBackHref = (params = {}) => {
  let href = '';
  if (!isEmpty(params)) {
    const queryObject = !isEmpty(params.query)
      ? `?${objToQuery(params.query)}`
      : '';
    href = params.pathname + queryObject;
  } else {
    href = getLocationHref();
  }
  return `?_back=${href}`;
};

export const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
