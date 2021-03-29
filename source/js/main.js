//Импорт
import './big-picture.js';
import './data.js';
import './preview.js';
import { closeModal, showModal, uploadButton } from './edit-modal.js';
import './form-validation.js';
import './api.js';
import './user-upload.js';
import './status.js';

const openModal = (evt) => {
  evt.preventDefault();
  showModal();
}

uploadButton.addEventListener('change', openModal);

closeModal ();
