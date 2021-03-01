// проверка длины и типа комментария
const isValidComment = (comment, maxLength = 140) => {
  if (typeof comment != 'string') {
    throw new TypeError('Not a String');
  }
  return comment.length > maxLength;
}

// Возвразщает случайное целое число из диапозона
const getRandomIntIncl = (minNumber, maxNumber) => {
  let min = Math.floor(minNumber);
  let max = Math.floor(maxNumber);

  if (isNaN(min) || isNaN(max)) {
    throw new TypeError('Not a number');
  } if (min < 0 || max < 0 ) {
    throw new RangeError('Outside of valid range');
  } if (max < min) {
    [min, max] = [max, min]
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//получаем рандомный элемент из массива
const getRandomElement = (elements) => {
  return elements[getRandomIntIncl(0, elements.length-1)];
};

// Нажатие ESC
const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

//Экспорт
export { getRandomIntIncl, getRandomElement, isValidComment, isEscEvent};

