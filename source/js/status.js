import { isEscEvent } from './util.js';
import { imageOverlay, resetForm, uploadUserPhoto } from './edit-modal.js';
import { request } from './api.js';

const UPLOAD_FILE = document.querySelector('#upload-file');
const IMG_UPLOAD_FORM = document.querySelector('.img-upload__form');
const ERROR_TEMPLATE = document.querySelector('#error').content.querySelector('.error');
const SUCCESS_TEMPLATE = document.querySelector('#success').content.querySelector('.success');
const successButton = SUCCESS_TEMPLATE.querySelector('.success__button');
const errorButton = ERROR_TEMPLATE.querySelector('.error__button');

const successModalSection = () => {
  const successSection = document.querySelector('.success');
  if (successSection) {
    successSection.remove();
  }
};

const closeSuccesModalOnClick = (evt) => {
  if (evt.currentTarget) {
    successModalSection();
    successButton.removeEventListener('keydown', closeErrorModalOnClick);
  }
};

const closeSuccesModalOnEsc = (evt) => {
  if (isEscEvent(evt)) {
    successModalSection();
    document.body.removeEventListener('keydown', closeSuccesModalOnEsc);
  }
};

const errorModalSection = () => {
  const errorSection = document.querySelector('.error');
  if (errorSection) {
    errorSection.remove();
  }
};

const closeErrorModalOnClick = (evt) => {
  if (evt.currentTarget) {
    errorModalSection();
    errorButton.removeEventListener('keydown', closeErrorModalOnClick);
  }
};

const closeErrorModalOnEsc = (evt) => {
  if (isEscEvent(evt)) {
    errorModalSection();
    document.body.removeEventListener('keydown', closeErrorModalOnEsc);
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

  resetForm();
};

const showErrorMessage = () => {
  const ERROR_TEMPLATE_BOX = ERROR_TEMPLATE.cloneNode(true);
  document.body.appendChild(ERROR_TEMPLATE_BOX);
  const errorButton = ERROR_TEMPLATE_BOX.querySelector('.error__button');
  const errorDiv = ERROR_TEMPLATE_BOX.querySelector('.error__inner');
  errorDiv.tabIndex = 1;
  errorDiv.style.outline = 'none';
  errorDiv.focus();
  imageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  errorButton.addEventListener('click', uploadUserPhoto);
  document.body.addEventListener('keydown', closeErrorModalOnEsc);
  errorDiv.addEventListener('blur', closeErrorModalOnClick);
  UPLOAD_FILE.value = '';

  resetForm();
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
