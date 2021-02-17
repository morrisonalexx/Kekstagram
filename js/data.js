//Импорты
import { getRandomIntIncl, getRandomArrayElement } from './util.js';

// Константы
const COMMENTS_COUNT_MAX = 5;

const ID = {
  MIN: 1,
  MAX: 25,
}

const PHOTOS = {
  MIN_URL: 1,
  MAX_URL: 25,
  COUNT: 25,
}

const AVATAR = {
  MIN: 1,
  MAX: 6,
}

const LIKES = {
  MIN: 15,
  MAX: 200,
}

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

// функции для создания массива
let commentID = 0;                                            // счетчик комментариев; можно сделать случайным по аналогии с айдишниками описаний и фото
let descriptionIDs =[];                                       // Глобальный массив идентификаторов
let photoIDs =[];                                             // Глобальный массив идентификаторов

const getCommentID = () => {
  return commentID += 1;
}

const getRandomIntID = (idArrayName, min, max) => {
  let randomIntID = getRandomIntIncl(min, max);                // создаем случайное число

  while(idArrayName.includes(randomIntID)){                    // проверяем есть ли в массиве идентификатров такое число, если есть
    randomIntID = getRandomIntIncl(min, max);                   // создаем еще одно случайное число пока не появится такое число, которого нет в массиве
  }

  idArrayName.push(randomIntID);                               // пушим число в массив
  return randomIntID;
};


// Cоздаем один коментарий
const createComments = () => {
  let messages = MESSAGES.filter((msg,idx) => idx % 2);

  return {
    id: getCommentID(),
    avatar: 'img/avatar-' + getRandomIntIncl(AVATAR.MIN, AVATAR.MAX) +'.svg',
    message: messages,
    name: getRandomArrayElement(NAMES),
  };
};

// Создаем одно описание одной фотографии
const createPhotoDescription = () => {

  return {
    id: getRandomIntID(descriptionIDs, ID.MIN, ID.MAX),
    url: 'photos/' + getRandomIntID(photoIDs, PHOTOS.MIN_URL, PHOTOS.MAX_URL) + '.jpg',
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomIntIncl(LIKES.MIN, LIKES.MAX),
    comments: createComments(COMMENTS_COUNT_MAX),
  };
};

// Создаем массив описаний  фотографий
const createPhotos = (numberOfPhotos) => {
  let photoDescriptionArray = [];

  for (let i = 0; i < numberOfPhotos; i++) {
    let photoDescription = createPhotoDescription();
    photoDescriptionArray.push(photoDescription);
  }
  return photoDescriptionArray;
}

const photos = createPhotos(PHOTOS.COUNT);

/* eslint-disable no-console */
console.log(photos);

//Экспорт
export { getRandomIntID, createPhotos, createComments, createPhotoDescription };
