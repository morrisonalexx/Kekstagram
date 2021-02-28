import { isEscEvent } from './util.js'

const BIG_PICTURE = document.querySelector('.big-picture');
const CLOSE_BUTTON = BIG_PICTURE.querySelector('#picture-cancel');
const BODY = document.querySelector('body');

const bigPictureImg = BIG_PICTURE.querySelector('.big-picture__img');
const bigPIctureLikes = BIG_PICTURE.querySelector('.likes-count');
const bigPicureComments = BIG_PICTURE.querySelector('.comments-count');
const bigPIctureCommentsList = BIG_PICTURE.querySelector('#picture-cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const bigPIctureDescription = BIG_PICTURE.querySelector('.social__caption');

const openBigPicture = () => {
  BIG_PICTURE.addEventListener('click', () => {
    BIG_PICTURE.classList.remove('.hidden')
  });

  BODY.classList.add('modal-open');
}

CLOSE_BUTTON.addEventListener('click', () => {
  BIG_PICTURE.classList.add('hidden')
});


document.addEventListener('keydown', (evt) => {
  if (isEscEvent) {
    evt.preventDefault();
    BIG_PICTURE.classList.add('hidden');
  }
})
