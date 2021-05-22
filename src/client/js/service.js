// // for using async/await in babel
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

import axios from 'axios';

export const fetchData = async (url = '', country, location, departure) => {
    const response = await fetch(`${url}?country=${country}&location=${location}&departure=${departure}`);

    try {
        const fetchData = await response.json();
        return fetchData;
    } catch (error) {
        console.log("error", error);
    }
}

export const getCountryList = async () => {
    try {
        const res = await axios.get('/allCountries');
        return res.data.countries;
    } catch (error) {
        console.log(error);
    }
}

export const getCityList = async (code) => {
    try {
        const res = await axios.get(`/allCitiesByCountry?ciso=${code}`);
        return res.data.cities;
    } catch (error) {
        console.log(error);
    }
}