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
const DESCRIPTIONS = [
  'Не заинстаграмил - не поел',
  'Кек',
  'Не подарили - а накодил',
  'Свободу политзаключенным!',
  'Мой апарт-отель в Геленджике',
]

const NAMES = [
  'Valera',
  'Vasya',
  'Alex',
  'Alfred',
]

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const PHOTOS = 25;
const MAX_NUMBER_OF_COMMENTS = 5;

let commentID = 0;                                            // счетчик комментариев; можно сделать случайным по аналогии с айдишниками описаний и фото
let descriptionIDs =[];                                       // Глобальный массив идентификаторов
let photoIDs =[];                                             // Глобальный массив идентификаторов

const getCommentID = () => {
  return commentID += 1;
}

const getRandomIntID = (idArrayName, min, max) => {
  let randomIntID = getRandomIntIncl(min, max);                // создаем случайное число

  while(idArrayName.includes(randomIntID)){                    // проверяем есть ли в массиве идентификатров такое число, если есть
    randomIntID = getRandomIntIncl(min,max);                   // создаем еще одно случайное число пока не появится такое число, которого нет в массиве
  }

  idArrayName.push(randomIntID);                               // пушим число в массив
  return randomIntID;
};

const getRandomArrayElement = (elements) => {
  return elements[Math.floor(Math.random() * elements.length)];
};

// Cоздаем один коментарий
const createComment = () => {

  return {
    id: getCommentID(),
    avatar: 'img/avatar-' + getRandomIntIncl(1, 6) +'.svg',
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
};

// Создаем массив комментариев
const createComments = (maxNumberOfComments) => {
  let comments = [];
  let numberOfComments = getRandomIntIncl(1, maxNumberOfComments);

  for (let i = 0; i < numberOfComments; i++){
    let comment = createComment();
    comments.push(comment);
  }
  return comments;
};

// Создаем одно описание одной фотографии
const createPhotoDescription = () => {

  return {
    id: getRandomIntID(descriptionIDs, 1, 25),
    url: 'photos/' + getRandomIntID(photoIDs, 1, 25) + '.jpg',
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomIntIncl(15, 200),
    comments: createComments(MAX_NUMBER_OF_COMMENTS),
  };
};

// Создаем массив описаний  фотографий
const createPhotoDescriptionArray = (numberOfPhotos) => {
  let photoDescriptionArray = [];

  for (let i = 0; i < numberOfPhotos; i++) {
    let photoDescription = createPhotoDescription();
    photoDescriptionArray.push(photoDescription);
  }
  return photoDescriptionArray;
}

const descriptionArray = createPhotoDescriptionArray(PHOTOS);
