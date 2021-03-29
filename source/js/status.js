import { isEscEvent } from './util.js';
import { imageOverlay } from './edit-modal.js';
import { request } from './api.js';

const UPLOAD_FILE = document.querySelector('#upload-file');
const IMG_UPLOAD_FORM = document.querySelector('.img-upload__form');
const SUCCESS_TEMPLATE = document.querySelector('#success').content.querySelector('.success');

const closeSuccesModalOnClick = (evt) => {
  if (evt.currentTarget) {
    const successSection = document.querySelector('.success');
    if (successSection) {
      successSection.remove();
    }
  }
};

const closeSuccesModalOnEsc = (evt) => {
  if (isEscEvent(evt)) {
    const successSection = document.querySelector('.success');
    if (successSection) {
      successSection.remove();
    }
    document.body.removeEventListener('keydown', closeSuccesModalOnEsc);
  }
};

const closeErrorModalOnClick = (evt) => {
  if (evt.currentTarget) {
    const errorSection = document.querySelector('.error');
    if (errorSection) {
      errorSection.remove();
    }
  }
};

const closeErrorModalOnEsc = (evt) => {
  if (isEscEvent(evt)) {
    const errorSection = document.querySelector('.error');
    if (errorSection) {
      errorSection.remove();
    }
    document.removeEventListener('keydown', closeErrorModalOnEsc);
  }
};

const showSuccessMessage = () => {
  const SUCCESS_TEMPLATE_BOX = SUCCESS_TEMPLATE.cloneNode(true);
  document.body.appendChild(SUCCESS_TEMPLATE_BOX);
  const successDiv = SUCCESS_TEMPLATE_BOX.querySelector('.success__inner');
  const successButton = SUCCESS_TEMPLATE_BOX.querySelector('.success__button');
  successDiv.tabIndex = 1;
  successDiv.style.outline = 'none';
  successDiv.focus();
  imageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  successButton.addEventListener('click', closeSuccesModalOnClick);
  document.body.addEventListener('keydown', closeSuccesModalOnEsc);
  UPLOAD_FILE.value = '';
};

const showErrorMessage = () => {
  const ERROR_TEMPLATE = document.querySelector('#error').content.querySelector('.error');
  const ERROR_TEMPLATE_BOX = ERROR_TEMPLATE.cloneNode(true);
  document.body.appendChild(ERROR_TEMPLATE_BOX);
  const errorButton = ERROR_TEMPLATE_BOX.querySelector('.error__button');
  const errorDiv = ERROR_TEMPLATE_BOX.querySelector('.error__inner');
  errorDiv.tabIndex = 1;
  errorDiv.style.outline = 'none';
  errorDiv.focus();
  imageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  errorButton.addEventListener('click', closeErrorModalOnClick);
  document.body.addEventListener('keydown', closeErrorModalOnEsc);
  errorDiv.addEventListener('blur', closeErrorModalOnClick);
  UPLOAD_FILE.value = '';
};

IMG_UPLOAD_FORM.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(IMG_UPLOAD_FORM);
  request((response) => {
    if (response) {
      showSuccessMessage();
    }
  }, () => {
    showErrorMessage();
  }, 'POST', formData);
});
