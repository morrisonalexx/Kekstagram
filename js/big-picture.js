import { isEscEvent } from './util.js';
import { placeBigPictureComments, bigPicture } from './comments.js';

const closeButton = bigPicture.querySelector('#picture-cancel');
const body = document.querySelector('body');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const bigPIctureLikes = bigPicture.querySelector('.likes-count');
const bigPIctureDescription = bigPicture.querySelector('.social__caption');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const bigPicureComments = bigPicture.querySelector('.comments-count');


const renderBigPictureData = (bigPictureData) => {
  bigPictureImg.src = bigPictureData.url;
  bigPicureComments.textContent = bigPictureData.comments.length;
  bigPIctureLikes.textContent = bigPictureData.likes;
  bigPIctureDescription.textContent = bigPictureData.description;
  placeBigPictureComments(bigPictureData);
}

const openBigPicture = (bigPictureData) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  commentsCount.classList.add('hidden');
  renderBigPictureData(bigPictureData);
}

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsLoader.classList.remove('hidden');
  commentsCount.classList.remove('hidden');
}

closeButton.addEventListener('click', () => {
  closeBigPicture();
});

document.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
});

export { openBigPicture };



