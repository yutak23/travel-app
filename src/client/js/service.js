// for using async/await in babel
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import csc from 'country-state-city'

export const fetchData = async (url = '', country, location, departure) => {
    const response = await fetch(`${url}?country=${country}&location=${location}&departure=${departure}`);

    try {
        const fetchData = await response.json();
        return fetchData;
    } catch (error) {
        console.log("error", error);
    }
}

export const getCountryList = () => {
    return csc.getAllCountries();
}

export const getCityList = (code) => {
    return csc.getAllCities().filter(city => city.countryCode === code);
}