import { createPhotos } from './data.js';

const PICTURES_COUNT = 25;
const PICTURE_TEMPLATE = document.querySelector('#picture').content.querySelector('.picture'); //получаем шаблон изобраэения
const PICTURES_LIST = document.querySelector('.pictures');
const fragment = document.createDocumentFragment(); // создаем "корзину" для готовых изображений
const renderPreviews = createPhotos(PICTURES_COUNT);

renderPreviews.forEach(({id, url, comments, likes}) => {
  const newPictureElement = PICTURE_TEMPLATE.cloneNode(true); // клонируем полностью содержание шаблона
  const newPictureUrl = newPictureElement.querySelector('.picture__img');
  const newPictureLikes = newPictureElement.querySelector('.picture__likes');
  const newPictureComments = newPictureElement.querySelector('.picture__comments');

  newPictureElement.dataset.id = id;
  newPictureUrl.src = url;
  newPictureComments.textContent = comments.length;
  newPictureLikes.textContent = likes;
  fragment.appendChild(newPictureElement); //добавляем готовое изображение в корзину
});
PICTURES_LIST.appendChild(fragment);

renderPreviews();
export { renderPreviews };
