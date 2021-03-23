//Импорт
import { renderBigPicture } from './big-picture.js';
import { createPhotos } from './data.js';
import { placePreviews } from './preview.js';
import { closeModal, showModal, uploadButton } from './edit-modal.js';
import './form-validation.js';

const PICTURES = createPhotos(25);

const clickHandler = (id) => {
  const picture = PICTURES.find(item => item.id === Number(id));

  renderBigPicture(picture);
}

const openModal = (evt) => {
  evt.preventDefault();
  showModal();
}

placePreviews(PICTURES, clickHandler);

uploadButton.addEventListener('change', openModal);

closeModal ();

