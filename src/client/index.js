// for using async/await in babel
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// js module
import { fetchData, getCountryList, getCityList } from './js/service';
import { renderCurrentWeather, renderForecastWeather } from './js/display';
import { viewBadSearch, drewSubmittingBtn, drewSubmitBtn } from './js/form';

import 'bootstrap-suggest';

// import all img
const importAll = (r) => r.keys().forEach(r);
importAll(require.context('../', true, /\.png$/));

// css
import "toastify-js/src/toastify.css"

// Sass
import './styles/base.scss';

// const definition
const subEl = document.querySelector('.btn-primary');
const countryEl = document.querySelector('[name="country"]');
const locationEl = document.querySelector('[name="location"]');
const departure = document.querySelector('[name="departure"]');
const endDate = document.querySelector('[name="end-date"]');

const pageData = {};

// Event handler
subEl.addEventListener('click', async () => {
    drewSubmittingBtn();
    pageData.departure = departure.value;
    pageData.endDate = endDate.value;
    const res = await fetchData('/fetchData', pageData.countryCode, pageData.countryName, pageData.location);

    drewSubmitBtn();
    if (res.status !== 200) {
        viewBadSearch();
    } else {
        const compareDate = addDays(Date.now(), 6);
        if (new Date(departure.value).getTime() <= new Date(compareDate).getTime()) renderCurrentWeather(res, pageData);
        else renderForecastWeather(res, pageData);
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    countrySuggest();
})

const countrySuggest = async () => {
    $('[name="country"]').suggest('#', {
        data: await getCountryList(),
        map: function (country) {
            return {
                value: `{"name" : "${country.name}", "code" : "${country.iso2}"}`,
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

const citySuggest = async (code) => {
    $('[name="location"]').suggest('#', {
        data: await getCityList(code),
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

const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}