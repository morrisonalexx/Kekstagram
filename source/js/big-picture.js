import { isEscEvent } from './util.js';

const BODY = document.querySelector('body');
const BIG_PICTURE = BODY.querySelector('.big-picture');
const CLOSE_BUTTON = BIG_PICTURE.querySelector('#picture-cancel');
const IMG = BIG_PICTURE.querySelector('.big-picture__img img');
const LIKES_COUNT = BIG_PICTURE.querySelector('.likes-count');
const DESCRIPTION = BIG_PICTURE.querySelector('.social__caption');
const COMMENTS_LIST = BIG_PICTURE.querySelector('.social__comments');
const COMMENTS_LOADER = BIG_PICTURE.querySelector('.social__comments-loader');
const COMMENTS_COUNT = BIG_PICTURE.querySelector('.social__comment-count');
const COMMENTS = BIG_PICTURE.querySelector('.comments-count');
const SHOWN_COMMENTS = 5;
const COMMENT_TEMPLATE = document.querySelector('#comment').content.querySelector('.social__comment');

const renderComment = (comment) => {
  const commentElement = COMMENT_TEMPLATE.cloneNode(true);
  const img = commentElement.querySelector('.social__picture');
  const commentText = commentElement.querySelector('.social__text');
  img.src = comment.avatar;
  img.alt = comment.name;
  commentText.textContent = comment.message;

  return commentElement;
}

let start = 0;

const renderComments = (comments) => {
  let i = start;
  while (i < start + SHOWN_COMMENTS && i < comments.length) {
    COMMENTS_LIST.appendChild(renderComment(comments[i]));
    i++;
  }

  start += SHOWN_COMMENTS;
  if (start >= comments.length) {
    COMMENTS_COUNT.childNodes[0].textContent = `${comments.length} из `;
    COMMENTS_LOADER.classList.add('hidden');
  } else {
    COMMENTS_COUNT.childNodes[0].textContent = `${start} из `;
  }
};

const renderBigPicture = (image) => {
  IMG.src = image.url;
  LIKES_COUNT.textContent = image.likes;
  COMMENTS.textContent = image.comments.length;
  DESCRIPTION.textContent = image.description;
  COMMENTS_LIST.innerHTML = '';
  start = 0;

  if (image.comments.length > SHOWN_COMMENTS) {
    COMMENTS_LOADER.classList.remove('hidden');
  }

  renderComments(image.comments);

  COMMENTS_LOADER.addEventListener('click', () => { renderComments(image.comments) });
};


const openBigPicture = (image) => {
  COMMENTS_COUNT.classList.remove('hidden');
  COMMENTS_LOADER.classList.add('hidden');
  renderBigPicture(image);
  document.body.classList.add('modal-open');
  BIG_PICTURE.classList.remove('hidden');
  document.addEventListener('keydown', onEscCloseBigPicture);
};

const closeBigPicture = () => {
  document.body.classList.remove('modal-open');
  BIG_PICTURE.classList.add('hidden');
  CLOSE_BUTTON.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onEscCloseBigPicture);
};

const clickHandler = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

// Закрытие модала ESC
const onEscCloseBigPicture = (evt) => {
  if (isEscEvent(evt)) {
    closeBigPicture();
  }
};

CLOSE_BUTTON.addEventListener('click', clickHandler);

export { openBigPicture, DESCRIPTION };
