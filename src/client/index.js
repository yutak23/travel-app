// js module
import { fetchData } from './js/service';
import { countrySuggest } from './js/form'

import 'bootstrap-suggest';
import $ from 'jquery';

// Sass
import './styles/resets.scss';
import './styles/base.scss';
import './styles/header.scss'

// const definition
const subEl = document.querySelector('#btn');

// Event handler
document.querySelector('#btn').addEventListener('click', async (event) => {
    console.log('Event')
    event.stopPropagation();
    event.preventDefault();

    const country = document.querySelector('[name="country"]').value;
    const location = document.querySelector('[name="location"]').value;
    const departure = document.querySelector('[name="departure"]').value;
    const data = await fetchData('/fetchData', country, location, departure);
    console.log(data);
});

document.addEventListener('DOMContentLoaded', async () => {
    countrySuggest();
})



