//Импорт
import './big-picture.js';
import './preview.js';
import { closeModal, showModal, uploadButton, uploadUserPhoto } from './edit-modal.js';
import './form-validation.js';
import './api.js';
import { renderUserImages } from './user-upload.js';
import './status.js';

const openModal = (evt) => {
  evt.preventDefault();
  showModal();
  uploadUserPhoto();
};

renderUserImages();

uploadButton.addEventListener('change', openModal);

closeModal ();
