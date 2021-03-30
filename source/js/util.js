const ESC_KEYS = ['Escape', 'Esc'];
const MAX_COMMENT_LENGTH = 140;
const ALERT_SHOW_TIME = 5000;

// проверка длины и типа комментария
const isValidComment = (comment, length = MAX_COMMENT_LENGTH) => {
  if (typeof comment !== 'string') {
    throw new TypeError('Not a String');
  }
  return comment.length <= length;
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

const isEscEvent = (evt) => ESC_KEYS.includes(evt.key);

const createModalCloseClick = (cb) => {
  return (evt) => {
    evt.preventDefault();
    cb();
  }
};

//Сообщение об ошибке
const showAlert = (message) => {
  const alertBox = document.createElement('div');

  alertBox.classList.add('show-alert');
  alertBox.textContent = message;

  document.body.append(alertBox);

  setTimeout(() => {
    alertBox.remove();
  }, ALERT_SHOW_TIME);
}

const getDebounce = (cb, interval) => {
  let lastTimeout = null;

  return (...args) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...args);
    }, interval);
  };
};

const shuffleArray = (arr) => {
  let tmpArr = [...arr];
  for (let i = tmpArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tmpArr[i], tmpArr[j]] = [tmpArr[j], tmpArr[i]];
  }
  return tmpArr;
}

//Экспорт
export { getRandomIntIncl, isValidComment, isEscEvent, MAX_COMMENT_LENGTH, showAlert, shuffleArray, createModalCloseClick, getDebounce };
