//Импорт
import { renderBigPicture } from './big-picture.js';
import { createPhotos } from './data.js';
import { placePreviews } from './preview.js';

const PICTURES = createPhotos(25);

const clickHandler = (id) => {
  const picture = PICTURES.find(item => item.id === Number(id));

  renderBigPicture(picture);
}

placePreviews(PICTURES, clickHandler);
