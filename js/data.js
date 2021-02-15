//Импорты
import {getRandomIntIncl, getRandomArrayElement} from './util.js';

// Константы
const PHOTOS = 25;
const MAX_NUMBER_OF_COMMENTS = 5;
const MAX_ID = 25;
const MIN_ID = 1;
const MAX_URL_PHOTOS = 1;
const MIN_URL_PHOTOS = 25;
const MAX_AVATAR = 6;
const MIN_AVATAR = 1;
const MIN_LIKES = 15;
const MAX_LIKES = 200;

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


// Cоздаем один коментарии
const createComments = () => {
  let messages = MESSAGES.filter((msg,idx) => idx % 2);

  return {
    id: getCommentID(),
    avatar: 'img/avatar-' + getRandomIntIncl(MIN_AVATAR, MAX_AVATAR) +'.svg',
    message: messages,
    name: getRandomArrayElement(NAMES),
  };
};

// Создаем одно описание одной фотографии
const createPhotoDescription = () => {

  return {
    id: getRandomIntID(descriptionIDs, MIN_ID, MAX_ID),
    url: 'photos/' + getRandomIntID(photoIDs, MIN_URL_PHOTOS, MAX_URL_PHOTOS) + '.jpg',
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomIntIncl(MIN_LIKES, MAX_LIKES),
    comments: createComments(MAX_NUMBER_OF_COMMENTS),
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

const descriptionArray = createPhotos(PHOTOS);

/* eslint-disable no-console */
console.log(descriptionArray);
