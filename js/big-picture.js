import { isEscEvent } from './util.js'

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('#picture-cancel');
const body = document.querySelector('body');

const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const bigPIctureLikes = bigPicture.querySelector('.likes-count');
const bigPicureComments = bigPicture.querySelector('.comments-count');
const bigPIctureCommentsList = bigPicture.querySelector('#picture-cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comments');
const bigPIctureDescription = bigPicture.querySelector('.social__caption');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsCount = bigPicture.querySelector('.social__comment-count');

const renderBigPictureComments = () => {

}

const renderBigPictureData = (bigPictureData) => {
  bigPictureImg.src = bigPictureData.url;
  bigPicureComments.textContent = bigPictureData.comments.length;
  bigPIctureLikes.textContent = bigPictureData.likes;
  bigPIctureDescription.textContent = bigPictureData.description;
}

const openBigPicture = (bigPictureData) => {
  bigPicture.classList.remove('.hidden');
  body.classList.add('modal-open');
  commentsLoader.classList.add('.hidden');
  commentsCount.classList.add('.hidden');
  renderBigPictureData(bigPictureData);
}

closeButton.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsLoader.classList.remove('.hidden');
  commentsCount.classList.remove('.hidden');
});

document.addEventListener('keydown', (evt) => {
  if (isEscEvent) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
});

export { openBigPicture };
