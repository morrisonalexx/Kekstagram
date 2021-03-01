//Импорт
/*eslint no-unused-vars:*/
import { placeBigPictureComments } from './comments.js';
import { createPhotos } from './data.js';
import { placeRenderPreviews } from './preview.js';

const PICTURES = createPhotos(25);
placeRenderPreviews(PICTURES);
