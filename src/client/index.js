// js module
import { fetchData } from './js/service'

// Sass
import './styles/resets.scss';
import './styles/base.scss';
import './styles/header.scss'

// const definition
const subEl = document.querySelector('.btn-primary');

// Event handler
subEl.addEventListener('click', async (event) => {
    event.preventDefault();

    const country = document.querySelector('[name="country"]').value;
    const location = document.querySelector('[name="location"]').value;
    const departure = document.querySelector('[name="departure"]').value;
    const data = await fetchData('/fetchData', country, location, departure);
    console.log(data);
});