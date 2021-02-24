
const PICTURE_LIST = document.querySelector('pictures'); // находим блок где должны быть изображения
const PICTURE_TEMPLATE = document.querySelector('#picture').content.querySelector('.picture'); //получаем шаблон изобраэения

const renderPictures = (pictures) => {
  const fragment = document.createDocumentFragment(); // создаем "корзину" для готовых изображений

  pictures.forEach((picture) => {
    const newPictureElement = PICTURE_TEMPLATE.cloneNode(true); // клонируем полностью содержание шаблона
    const newPictureImage = newPictureElement.querySelector('.picture__img'); // изображение записываем в переменную
    const newPictureLikes = newPictureElement.querySelector('.picture__likes'); // likes записываем в переменную
    const newPictureComments = newPictureElement.querySelector('.picture__comments'); // комментарии записываем в переменную

    newPictureImage.src = picture.url;
    newPictureComments.textContent = picture.comments.length;
    newPictureLikes.textContent = picture.likes;

    fragment.appendChild(newPictureElement); //добавляем готовое изображение в корзину
  });
  PICTURE_LIST.appendChild(fragment); // добавляем корзину для изображений в в блок .pictures
};

export { renderPictures };
