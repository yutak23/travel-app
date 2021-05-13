// js module
import { validate } from './js/validate';
import { sentimentAnalysis } from './js/sentiment-analysis';

// Sass
import './styles/resets.scss';
import './styles/base.scss';
import './styles/header.scss'

// const definition
const subEl = document.querySelector('.btn-primary');

// Event handler
subEl.addEventListener('click', (event) => {
    validate(event);
    sentimentAnalysis(event);
});

export {
    sentimentAnalysis,
    validate
};