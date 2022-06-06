import axios from 'axios';

/**
 * Get weather forecasts and images of country or city
 * @param {string} url api end point
 * @param {string} countryCode ISO country code
 * @param {string} countryName country name used for searching with pixabay API
 * @param {string} location city name used for searching with pixabay API
 * @returns json object(key is currentWeatherBit, forecastWeatherBit, pixabay, pixabayResOp)
 */
export const fetchData = async (url, countryCode, countryName, location) => {
	const response = await fetch(
		`${url}?countryCode=${countryCode}&countryName=${countryName}&location=${location}`
	);

	try {
		const fetchData = await response.json();
		return { status: response.status, data: fetchData };
	} catch (error) {
		return { error: error };
	}
};

/**
 * Get a list of countries from https://countrystatecity.in/docs/api/all-countries
 * @returns json object(key is countries)
 */
export const getCountryList = async () => {
	try {
		const res = await axios.get('/allCountries');
		return res.data.countries;
	} catch (error) {
		if (error.response) {
			console.log('response.data', error.response.data);
			console.log('response.status', error.response.status);
		}
		console.log(error.message);
		return [];
	}
};

/**
 * Get a list of cities from https://countrystatecity.in/docs/api/cities-by-country
 * @param {string} code ISO country code
 * @returns json object(key is cities)
 */
export const getCityList = async (code) => {
	try {
		const res = await axios.get(`/allCitiesByCountry?ciso=${code}`);
		return res.data.cities;
	} catch (error) {
		return { error: error };
	}
};
