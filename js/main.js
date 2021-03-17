//Импорт
import { renderBigPicture } from './big-picture.js';
import { createPhotos } from './data.js';
import { placePreviews } from './preview.js';
import { closeModal, getModal, uploadButton } from './edit-modal.js';

const PICTURES = createPhotos(25);

const clickHandler = (id) => {
  const picture = PICTURES.find(item => item.id === Number(id));

  renderBigPicture(picture);
}

placePreviews(PICTURES, clickHandler);

uploadButton.addEventListener('change', (evt) => {
  evt.preventDefault();
  getModal();
});

closeModal ();

