import { renderBigPictureData } from './big-picture.js';

const PICTURE_TEMPLATE = document.querySelector('#picture').content.querySelector('.picture'); //получаем шаблон изобраэения
const PICTURES_LIST = document.querySelector('.pictures');

const clickHandler = () => {
  renderBigPictureData();
}

const renderPreview = (data) => {
  const newPictureElement = PICTURE_TEMPLATE.cloneNode(true); // клонируем полностью содержание шаблона
  const elementImg = newPictureElement.querySelector('.picture__img');

  elementImg.dataset.id = data.id;
  elementImg.src = data.url;
  newPictureElement.querySelector('.picture__likes').textContent = data.comments.length;
  newPictureElement.querySelector('.picture__comments').textContent = data.likes;
  PICTURES_LIST.addEventListener('click', clickHandler);

  return newPictureElement;
}

const renderAllPreviews = (pictures) => {
  const fragment = document.createDocumentFragment(); // создаем "корзину" для готовых изображений
  pictures.forEach((pictureData) => {
    const newPictureElement = renderPreview(pictureData);
    fragment.appendChild(newPictureElement); //добавляем готовое изображение в корзину
  });

  return fragment;
};

const removeChildren = (parent, selector) => {
  let children = parent.querySelectorAll(selector);
  children.forEach(child => parent.removeChild(child));
}

const placeRenderPreviews = (pictures) => {
  removeChildren(PICTURES_LIST, '.picture');
  PICTURES_LIST.appendChild(renderAllPreviews(pictures));
}



export { placeRenderPreviews };
