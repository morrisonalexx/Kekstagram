import { isEscEvent } from './util.js';
import { placeBigPictureComments, BIG_PICTURE } from './comments.js';

const CLOSE_BUTTON = BIG_PICTURE.querySelector('#picture-cancel');
const BODY = document.querySelector('body');
const bigPictureImg = BIG_PICTURE.querySelector('.big-picture__img');
const bigPIctureLikes = BIG_PICTURE.querySelector('.likes-count');
const bigPIctureDescription = BIG_PICTURE.querySelector('.social__caption');
const COMMENTS_LOADER = BIG_PICTURE.querySelector('.comments-loader');
const COMMENTS_COUNT = BIG_PICTURE.querySelector('.social__comment-count');
const bigPicureComments = BIG_PICTURE.querySelector('.comments-count');

const clickHandler = evt => {
  evt.preventDefault();
  closeBigPicture();
}

const renderBigPictureData = (bigPictureData) => {
  BIG_PICTURE.classList.remove('hidden');
  BODY.classList.add('modal-open');
  COMMENTS_LOADER.classList.add('hidden');
  COMMENTS_COUNT.classList.add('hidden');

  bigPictureImg.src = bigPictureData.url;
  bigPicureComments.textContent = bigPictureData.comments.length;
  bigPIctureLikes.textContent = bigPictureData.likes;
  bigPIctureDescription.textContent = bigPictureData.description;
  placeBigPictureComments(bigPictureData);
}

CLOSE_BUTTON.addEventListener('click', clickHandler);

const closeBigPicture = () => {
  BIG_PICTURE.classList.add('hidden');
  BODY.classList.remove('modal-open');
  COMMENTS_LOADER.classList.remove('hidden');
  COMMENTS_COUNT.classList.remove('hidden');
}

// Закрытие модала ESC
document.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
});

export { renderBigPictureData };
