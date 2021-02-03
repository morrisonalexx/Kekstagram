'use strict';

// проверка длины и типа комментария
const isCommentOverLimit = (comment, maxLength = 140) => {
  try {
    if (typeof comment != 'string') {
      throw new TypeError('Not a String');
    } else {
      return comment.length > maxLength;
    }
  } catch(err) {
    return err.name + ':' + err.message
  }
}

isCommentOverLimit(15, 2);


// Возвразщает случайное целое число из диапозона
const getRandomIntIncl = (min, max) => {
  try {
    if (isNaN(min) || isNaN(max)) {
      throw new TypeError('Not a number');
    } else if (min < 0 || max < 0 ) {
      throw new RangeError('Outside of valid range');
    } else if (max < min) {
      min = Math.ceil(min);
      max = Math.floor(max);
      [min, max] = [max, min]
    }
  } catch(err) {
    return err.name + ' : ' + err.message;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomIntIncl(5, 15);
