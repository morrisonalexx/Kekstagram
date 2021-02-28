//Импорт
/*eslint no-unused-vars:*/
import { createPhotos } from './data.js';
import { placeRenderPreviews } from './preview.js';
import './big-picture.js';

const PICTURES = createPhotos(25);
placeRenderPreviews(PICTURES)
