/* eslint-disable */
const map = '۰۱۲۳۴۵۶۷۸۹'.split('');
const toEnMap = {
  '۰': 0,
  '۱': 1,
  '۲': 2,
  '۳': 3,
  '۴': 4,
  '۵': 5,
  '۶': 6,
  '۷': 7,
  '۸': 8,
  '۹': 9,
};

const arabicChars = [
  'ي',
  'ك',
  '‍',
  'دِ',
  'بِ',
  'زِ',
  'ذِ',
  'ِشِ',
  'ِسِ',
  '‌',
  'ى',
];
const persianChars = ['ی', 'ک', '', 'د', 'ب', 'ز', 'ذ', 'ش', 'س', '', 'ی'];

const arabicCharsToFarsiMap = {};

const arabicNumbers = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠'];
const persianNumbers = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];

const arabicNumbersToFarsiMap = {};

arabicChars.forEach((arabicChar, i) => {
  arabicCharsToFarsiMap[arabicChar] = persianChars[i];
});

arabicNumbers.forEach((arabicNumber, i) => {
  arabicNumbersToFarsiMap[arabicNumber] = persianNumbers[i];
});

function convertToPersianNumbers(number) {
  let str;
  let arr;

  if (!number && number !== 0) {
    return '';
  }

  str = arabicNumbersToPersian(number.toString());
  arr = str.split('');

  for (let i = 0; i < arr.length; i++) {
    const char = arr[i];
    if (map[char]) {
      arr[i] = map[char];
    } else if (char === '.') {
      arr[i] = '\u066B';
    }
  }

  return arr.join('');
}

function persianNumbersToEnglish(number) {
  let persianNumber;
  let str;
  let arr;

  if (!number && number !== 0) {
    return '';
  }
  persianNumber = arabicNumbersToPersian(number);
  str = persianNumber.toString();
  arr = str.split('');

  for (let i = 0; i < arr.length; i++) {
    const char = arr[i];
    if (char in toEnMap) {
      arr[i] = toEnMap[char];
    }
  }

  return arr.join('');
}

function isNotEnglish(val) {
  return !/[a-z]/i.test(val);
}

function isStartedWithEnglish(value) {
  return /^\w+|^[a-zA-z]/.test(value);
}

function isEnglish(val) {
  const regex = /^([a-z]|[A-Z]|[0-9]|\s|@|#|\$|\(|\)|<|\.|\-|_|\||~|\/|\\|\*)+$/;
  return regex.test(val);
}

function arabicCharsToPersian(value) {
  let arr;

  if (!value) {
    return;
  }

  arr = value.toString().split('');

  for (let i = 0, len = arr.length; i < len; i++) {
    const char = arr[i];
    if (arabicCharsToFarsiMap[char]) {
      arr[i] = arabicCharsToFarsiMap[char];
    }
  }

  return arr.join('');
}

function arabicNumbersToPersian(value) {
  let arr;

  if (!value) {
    return;
  }

  arr = value.toString().split('');

  for (let i = 0, len = arr.length; i < len; i++) {
    const char = arr[i];
    if (arabicNumbersToFarsiMap[char]) {
      arr[i] = arabicNumbersToFarsiMap[char];
    }
  }

  return arr.join('');
}

function persianMatcher(term, text) {
  let persian = term || '';
  const english = term || '';

  let textFarsi = arabicCharsToPersian(text);
  textFarsi = arabicNumbersToPersian(textFarsi);

  persian = convertToPersianNumbers(persian);
  persian = arabicCharsToPersian(persian);
  persian = arabicNumbersToPersian(persian);

  if (
    textFarsi.indexOf(persian) > -1 ||
    textFarsi.toLowerCase().indexOf(english.toLowerCase()) > -1
  ) {
    return true;
  }

  return false;
}

export {
  convertToPersianNumbers,
  persianNumbersToEnglish,
  isNotEnglish,
  isEnglish,
  arabicCharsToPersian,
  arabicNumbersToPersian,
  persianMatcher,
  isStartedWithEnglish,
};
