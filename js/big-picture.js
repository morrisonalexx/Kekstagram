import { isEscEvent } from './util.js';
import { placeComments } from './comments.js';

const BODY = document.querySelector('body');
const BIG_PICTURE = BODY.querySelector('.big-picture');
const CLOSE_BUTTON = BIG_PICTURE.querySelector('#picture-cancel');
const IMG = BIG_PICTURE.querySelector('.big-picture__img img');
const LIKES = BIG_PICTURE.querySelector('.likes-count');
const DESCRIPTION = BIG_PICTURE.querySelector('.social__caption');
const COMMENTS_LIST = BIG_PICTURE.querySelector('.social__comments');
const COMMENTS_LOADER = BIG_PICTURE.querySelector('.comments-loader');
const COMMENTS_COUNT = BIG_PICTURE.querySelector('.social__comment-count');
const COMMENTS = BIG_PICTURE.querySelector('.comments-count');

const closeBigPicture = () => {
  BIG_PICTURE.classList.add('hidden');
  BODY.classList.remove('modal-open');
  COMMENTS_LOADER.classList.remove('hidden');
  COMMENTS_COUNT.classList.remove('hidden');
}

const clickHandler = evt => {
  evt.preventDefault();
  closeBigPicture();
}

const renderBigPicture = (data) => {
  BIG_PICTURE.classList.remove('hidden');
  BODY.classList.add('modal-open');
  COMMENTS_LOADER.classList.add('hidden');
  COMMENTS_COUNT.classList.add('hidden');
  IMG.src = data.url;
  COMMENTS.textContent = data.comments.length;
  LIKES.textContent = data.likes;
  DESCRIPTION.textContent = data.description;
  placeComments(COMMENTS_LIST, data);
}

CLOSE_BUTTON.addEventListener('click', clickHandler);

// Закрытие модала ESC
document.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
});

export { renderBigPicture };
