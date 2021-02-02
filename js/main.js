'use strict';

const getRandomIntIncl = (min, max) => {

  if (min < 0 || max < 0 ) {
    return -1;
  }

  min = Math.ceil(min); // получаем минимальное число, округленное в большую сторону
  max = Math.floor(max); // получаем максимальное число, округленное в меньшую сторону, либо равное заданному

  if (max < min) {
    [min, max] = [max, min]
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomIntIncl(5, 21);

// проверка
// for (let i = 0; i<20; i++) {
//   let randomResult = getRandomIntIncl(5, 13)
//   if (randomResult === -1) {
//     console.log("ошибка");
//   } else console.log(randomResult);
// }

// проверка длины комментария
const isCommentOverLimit = (comment, maxLength) => {
  return comment.length > maxLength;
}

isCommentOverLimit('Мой комментарий', 140);
