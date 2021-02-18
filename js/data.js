//Импорты
import { getRandomIntIncl, getRandomElement } from './util.js';

// Константы

const Id = {
  MIN: 1,
  MAX: 25,
}

const photos = {
  MIN_URL: 1,
  MAX_URL: 25,
  COUNT: 25,
}

const avatar = {
  MIN: 1,
  MAX: 6,
}

const likes = {
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
let descriptionIDs =[];                                       // Глобальный массив идентификаторов
let photoIDs =[];                                             // Глобальный массив идентификаторов

const getIdCounter = () => {
  let count = 1;
  return function() {
    return count++;
  }
}

let getID = getIdCounter();

const getRandomIntID = (idArrayName, min, max) => {
  let randomIntID = getRandomIntIncl(min, max);                // создаем случайное число

  while(idArrayName.includes(randomIntID)){                    // проверяем есть ли в массиве идентификатров такое число, если есть
    randomIntID = getRandomIntIncl(min, max);                   // создаем еще одно случайное число пока не появится такое число, которого нет в массиве
  }

  idArrayName.push(randomIntID);                               // пушим число в массив
  return randomIntID;
};

const getMessage = () => {                                  // создаем комментарии
  let messages = MESSAGES.filter(() => getRandomIntIncl(0, 1)).slice(0, 2).join(' ');
  return messages;
}

const getAvatarUrl = (id) => {                                  // создаем аватар
  return `img/avatar-${id}.svg`;
}

const getPhotoUrl = (id) => {                                  // создаем URL
  return `photos/${id}.jpg`;
}

// Cоздаем один коментарий
const getComment = () => {

  return {
    id: getID(),
    avatar: getAvatarUrl(getRandomIntIncl(avatar.MIN, avatar.MAX)),
    message: getMessage(),
    name: getRandomElement(NAMES),
  };
};

// Создаем одно описание одной фотографии
const createPhotoDescription = () => {

  return {
    id: getRandomIntID(descriptionIDs, Id.MIN, Id.MAX),
    url: getPhotoUrl(getRandomIntID(photoIDs, photos.MIN_URL, photos.MAX_URL)),
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandomIntIncl(likes.MIN, likes.MAX),
    comments: getComment(),
  };
};

// Создаем массив описаний  фотографий
const createPhotos = (numberOfPhotos) => {
  let photoDescriptionArray = [];

  for (let i = 0; i < numberOfPhotos; i++) {
    let photoDescriptions = createPhotoDescription();
    photoDescriptionArray.push(photoDescriptions);
  }
  return photoDescriptionArray;
}

const photoDescriptions = createPhotos(photos.COUNT);

/* eslint-disable no-console */
console.log(photoDescriptions);

//Экспорт
export { photoDescriptions };
