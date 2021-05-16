// js module
import { fetchData, getCountryList, getCityList } from './js/service';

import 'bootstrap-suggest';

// Sass
import './styles/resets.scss';
import './styles/base.scss';
import './styles/header.scss'

// const definition
const subEl = document.querySelector('.btn-primary');
const countryEl = document.querySelector('[name="country"]');
const locationEl = document.querySelector('[name="location"]');
const departure = document.querySelector('[name="departure"]')

const pageData = {};

// Event handler
subEl.addEventListener('click', async (event) => {
    console.log('Event')
    console.log(data);
    event.stopPropagation();
    event.preventDefault();

    const data = await fetchData('/fetchData', pageData.countryCode, pageData.location, departure.value);
    console.log(data)
});

document.addEventListener('DOMContentLoaded', async () => {
    countrySuggest();
})

const countrySuggest = () => {
    $('[name="country"]').suggest('#', {
        data: getCountryList(),
        map: function (country) {
            return {
                value: `{"name" : "${country.name}", "code" : "${country.isoCode}"}`,
                text: '<strong>' + country.name + '</strong>'
            }
        },
        onselect(e, item) {
            const jsonObj = JSON.parse(item.value);
            pageData.countryName = jsonObj.name;
            pageData.countryCode = jsonObj.code;
            countryEl.value = pageData.countryName;
            citySuggest(pageData.countryCode);
        }
    })
}

const citySuggest = (code) => {
    $('[name="location"]').suggest('#', {
        data: getCityList(code),
        map: function (city) {
            return {
                value: city.name,
                text: '<strong>' + city.name + '</strong>'
            }
        },
        onselect(e, item) {
            pageData.location = item.value;
            locationEl.value = pageData.location;
        }
    })
}