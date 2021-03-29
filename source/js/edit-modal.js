// eslint-disable-next-line no-unused-vars
/* global noUiSlider:readonly */
import { isEscEvent } from './util.js';
import noUiSlider from 'nouislider';

const imageOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const previewImageElement = document.querySelector('.img-upload__preview').querySelector('img');
const cancelUpload = document.querySelector('#upload-cancel');
const uploadForm = document.querySelector('.img-upload__form');
const uploadButton = document.querySelector('.img-upload__input');
const scaleButton = document.querySelector('.img-upload__scale');
const controlValue = document.querySelector('.scale__control--value');
const scaleBigger = document.querySelector('.scale__control--bigger');
const effectSlider = document.querySelector('.effect-level__slider');
const effectList = document.querySelector('.effects__list');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const MIN_SIZE_VALUE = 25;
const MAX_SIZE_VALUE = 100;
const STEP_SIZE = 25;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const effectsPreview = document.querySelectorAll('.effects__preview');
let photoSize = controlValue.value;

const SLIDER_FILTERS = {
  none: {
    options: {},
    effect: 'none',
    measurement: '',
  },
  chrome: {
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    effect: 'grayscale',
    measurement: '',
  },
  sepia: {
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    effect: 'sepia',
    measurement: '',
  },
  marvin: {
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    effect: 'invert',
    measurement: '%',
  },
  phobos: {
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    effect: 'blur',
    measurement: 'px',
  },
  heat: {
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    effect: 'brightness',
    measurement: '',
  },
};

//форма по умолчанию
const resetForm = () => {
  const inputs = [...uploadForm.querySelectorAll('.input-invalid')]

  previewImageElement.style = {};
  previewImageElement.className = '';
  photoSize = 100;

  inputs.forEach(input => input.classList.remove('input-invalid'))
  uploadForm.reset();
};

///Открыть - Закрыть форму
const handleEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const onCloseClick = () => {
  closeModal();
};

const showModal = () => {
  effectLevel.classList.add('hidden');
  imageOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', handleEscKeydown);
  cancelUpload.addEventListener('click', onCloseClick);
};

const closeModal = () => {
  imageOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  resetForm();
  document.removeEventListener('keydown', handleEscKeydown);
  cancelUpload.removeEventListener('click', onCloseClick);
};

//Уменьшение - увеличение картинки
const reduceSize = () => {
  if (photoSize > MIN_SIZE_VALUE) {
    photoSize -= STEP_SIZE;
    previewImageElement.style.transform = `scale(0.${photoSize})`;
    scaleBigger.removeAttribute('disabled', 'disabled');
  }

  controlValue.value = `${photoSize}%`;
};

const increaseSize = () => {
  if (photoSize < MAX_SIZE_VALUE) {
    photoSize += STEP_SIZE;
  }

  if (photoSize === MAX_SIZE_VALUE) {
    scaleBigger.setAttribute('disabled', 'disabled');
  }

  previewImageElement.style.transform = `scale(${photoSize/100})`;
  controlValue.value = `${photoSize}%`;
};

const handleScaleClick = (evt) => {
  const className = evt.target.classList[1];
  if (className === 'scale__control--smaller') {
    reduceSize();
  }

  if (className === 'scale__control--bigger') {
    increaseSize();
  }
};

//Наложение эффекта на изображение
const handleCheckName = (evt) => {
  if (evt.target.tagName === 'SPAN') {
    const className = evt.target.classList[1];
    const modifier = className.split('--')[1];
    const isModifierNone = modifier === 'none';
    const filter = SLIDER_FILTERS[modifier];


    const filterValue = (value, handle) => {
      effectLevelValue.value = value[handle];
      const effectStrength = `(${effectLevelValue.value}${filter.measurement})`;
      previewImageElement.style.filter = `${filter.effect}${(isModifierNone ? '' : effectStrength)}`;
    };

    previewImageElement.className = '';
    previewImageElement.classList.add(className);
    isModifierNone ? effectLevel.classList.add('hidden') : effectLevel.classList.remove('hidden');

    effectSlider.noUiSlider.updateOptions(filter.options);
    effectSlider.noUiSlider.on('update', filterValue);
  }
};

const formatValueTo = (value) => {
  if (Number.isInteger(value)) {
    return value.toFixed(0);
  }
  return value.toFixed(1);
};

const formatValueFrom = (value) => {
  return parseFloat(value);
};

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
  format: {
    to: formatValueTo,
    from: formatValueFrom,
  },
});

//загружаем собственное фото
const uploadUserPhoto = (evt) => {
  const file = uploadButton.files[0];
  const fileName = file.name.toLowerCase();
  const reader = new FileReader();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  })

  if (evt.target.value !== '' && matches) {
    imageOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    effectLevel.classList.add('hidden');

    reader.addEventListener('load', () => {
      previewImageElement.src = reader.result;
      for (let i = 0; i < effectsPreview.length; i++) {
        effectsPreview[i].style.background = `url(${reader.result})`;
        effectsPreview[i].style.backgroundSize = 'contain';
        effectsPreview[i].style.backgroundPosition = 'center';
        effectsPreview[i].style.backgroundRepeat = 'no-repeat';
      }
    })

    cancelUpload.addEventListener('click', onCloseClick);
    document.addEventListener('keydown', handleEscKeydown);
  }

  reader.readAsDataURL(file);
};

uploadButton.addEventListener('change', uploadUserPhoto);
scaleButton.addEventListener('click', handleScaleClick);
effectList.addEventListener('click', handleCheckName);

export { closeModal, showModal, uploadButton, imageOverlay, uploadUserPhoto};
