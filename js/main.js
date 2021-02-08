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

// функции для создания массива

const descriptions = [
  'Не заинстаграмил - не поел',
  'Кек',
  'Не подарили - а накодил',
  'Свободу политзаключенным!',
  'Мой апарт-отель в Геленджике',
]

const names = [
  'Valera',
  'Vasya',
  'Alex',
  'Alfred',
]

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const PHOTOS = 25;

const getRandomArrayElement = (elements) => {
  // eslint-disable-next-line no-undef
  return elements[_.random(0, elements.length - 1)];
};

const createComments = () => {
  const randomIndexComment = getRandomIntIncl(1, 30);

  return {
    id: randomIndexComment,
    avatar: 'img/avatar-' + getRandomIntIncl(1, 6) +'.svg',
    message: getRandomArrayElement(messages),
    name: getRandomArrayElement(names),
  };
};

const createPhotoDescription = (index) => {
  index += 1;
  const randomLikes = getRandomIntIncl(15, 200);

  return {
    id: index,
    url: 'photos/' + index + '.jpg',
    description: getRandomArrayElement(descriptions),
    likes: randomLikes,
    comments: createComments(),
  };
};

const descriptionArray = new Array(PHOTOS).fill(null).map((element, index) => createPhotoDescription(index));

console.log(descriptionArray);
