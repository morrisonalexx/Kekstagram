import { isEscEvent } from './util.js';
import { isValidComment } from './util.js';

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = isValidComment;

const hashtags = document.querySelector('.text__hashtags');
const description = document.querySelector('.text__description');
const uploadText = document.querySelector('.img-upload__text');

//Отмена обработчика Esc при фокусе
const onCancelEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
};

//Валидация хештегов
const onHashTagValidation = (evt) => {
  const input = evt.target;
  input.classList.add('input-invalid');

  if (!input.value) {
    input.setCustomValidity('');
  }

  const hashtagsBox = input.value.trim().toLowerCase().split(' ').filter(string => string);

  const checkDuplicateHashtags = (hashtagsBox) => {
    return new Set(hashtagsBox).size !== hashtagsBox.length
  }

  // проверки
  if (checkDuplicateHashtags(hashtagsBox)) {
    input.setCustomValidity('Не допускается использование дублирующих хештегов');
  } else if (hashtagsBox.length > MAX_HASHTAG_COUNT) {
    input.setCustomValidity('Допускается использование не более 5 хештегов');
  } else {
    hashtagsBox.forEach(hashtag => {
      if (hashtag.length === 1 || hashtag.charAt(0) !== '#') {
        input.setCustomValidity('Хэштег должен начинается с символа #, и не может состоять только из него одного');
      } else if (hashtag.length > MAX_HASHTAG_LENGTH) {
        input.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
      } else if (!(/^[а-яА-ЯёЁa-zA-Z0-9]+$/).test(hashtag.substring(1))) {
        input.setCustomValidity('Строка после символа # должна состоять из букв и чисел и не может содержать другие символы и пробелы');
      } else {
        input.setCustomValidity('');
        input.classList.remove('input-invalid');
      }
    })
  }

  input.reportValidity();
};

//Валидация комментариев
const onCommentValidation = (evt) => {
  const input = evt.target;
  input.classList.add('input-invalid');

  if (!input.value) {
    input.setCustomValidity('');
  } else if (input.value.length > MAX_COMMENT_LENGTH) {
    input.setCustomValidity('Длина комментария не может составлять больше 140 символов')
  } else {
    input.setCustomValidity('');
    input.classList.remove('input-invalid')
  }

  input.reportValidity();
};

//фокус/блюр на полях хештегов и комментария
uploadText.addEventListener('focus', () => {
  document.body.addEventListener('keydown', onCancelEscKeydown);
  description.addEventListener('input', onCommentValidation);
  hashtags.addEventListener('input', onHashTagValidation);
}, true);

uploadText.addEventListener('blur', () => {
  document.body.removeEventListener('keydown', onCancelEscKeydown);
  description.removeEventListener('input', onCommentValidation);
  hashtags.removeEventListener('input', onHashTagValidation);
}, true);

export { uploadText };
