const bigPicture = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const bigPIctureCommentsList = bigPicture.querySelector('.social__comments');

const clearComments = (comments) => {
  while (comments.firstChild) {
    comments.removeChild(comments.firstChild);
  }
}

const renderBigPictureComment = (commentData) => {
  let comment = commentTemplate.cloneNode(true); // клонируем содержание шаблона комменнтария
  comment.querySelector('.social__picture').src = commentData.avatar;
  comment.querySelector('.social__picture').alt = commentData.name;
  comment.querySelector('.social__text').innerText = commentData.message;

  return comment;
};

const renderBigPictureComments = (commentsData) => {
  let fragment = document.createDocumentFragment(); // создаем "корзину" для готовых комментов
  let newCommentElement = renderBigPictureComment(commentsData.comments);
  fragment.appendChild(newCommentElement); //  добавляем готовые комменты в корзину

  return fragment;
};

const placeBigPictureComments = (bigPictureComments) => {
  clearComments(bigPIctureCommentsList);
  bigPIctureCommentsList.appendChild(renderBigPictureComments(bigPictureComments));
}

export { placeBigPictureComments, bigPicture }
