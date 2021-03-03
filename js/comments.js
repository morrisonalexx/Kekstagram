const BIG_PICTURE = document.querySelector('.big-picture');
const COMMENT_TEMPLATE = document.querySelector('#comment').content.querySelector('.social__comment');
const bigPIctureCommentsList = BIG_PICTURE.querySelector('.social__comments');

const clearComments = (comments) => {
  comments.textContent = '';
}

const renderBigPictureComment = (commentData) => {
  const comment = COMMENT_TEMPLATE.cloneNode(true); // клонируем содержание шаблона комменнтария
  const element = comment.querySelector('.social__picture');

  element.src = commentData.avatar;
  element.alt = commentData.name;
  comment.querySelector('.social__text').innerText = commentData.message;

  return comment;
};

const renderBigPictureComments = (commentsData) => {
  const fragment = document.createDocumentFragment(); // создаем "корзину" для готовых комментов
  const newCommentElement = renderBigPictureComment(commentsData.comments);
  fragment.appendChild(newCommentElement); //  добавляем готовые комменты в корзину

  return fragment;
};

const placeBigPictureComments = (bigPictureComments) => {
  clearComments(bigPIctureCommentsList);
  bigPIctureCommentsList.appendChild(renderBigPictureComments(bigPictureComments));
}

export { placeBigPictureComments, BIG_PICTURE }
