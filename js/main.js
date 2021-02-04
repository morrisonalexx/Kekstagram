'use strict';

// проверка длины и типа комментария
const isValidComment = (comment, maxLength = 140) => {
  if (typeof comment != 'string') {
    throw new TypeError('Not a String');
  } else {
    return comment.length > maxLength;
  }
}

try {
  isValidComment('комментарий');
} catch (err) {
  /* eslint-disable no-console */
  console.error(err.name + ':' + err.message)
}


// Возвразщает случайное целое число из диапозона
const getRandomIntIncl = (min, max) => {
  if (isNaN(min) || isNaN(max)) {
    throw new TypeError('Not a number');
  } else if (min < 0 || max < 0 ) {
    throw new RangeError('Outside of valid range');
  } else if (max < min) {
    min = Math.floor(min);
    max = Math.floor(max);
    [min, max] = [max, min]
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

try {
  getRandomIntIncl(5, 15);
} catch (err) {
  /* eslint-disable no-console */
  console.error(err.name + ' : ' + err.message);
}
