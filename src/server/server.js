const axios = require('axios').default;

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware */
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'))

// dotenv
const dotenv = require('dotenv')
dotenv.config();

// Setup Server
app.listen(8081, function () {
    console.log('listening on port 8081!')
})

// instance for get countries and cities
const instance = axios.create({
    baseURL: 'https://api.countrystatecity.in/v1/',
    timeout: 2000,
    headers: { 'X-CSCAPI-KEY': process.env.COUNTRYSTATECITY_API_KRY }
})

app.get('/allCountries', async (req, res) => {
    try {
        const countries = await instance.get('countries')
        res.send({ countries: countries.data })
    } catch (error) {
        console.log(error)
        res.send({ error: error })
    }
})

app.get('/allCitiesByCountry', async (req, res) => {
    try {
        const cities = await instance.get(`countries/${req.query.ciso}/cities`)
        res.send({ cities: cities.data })
    } catch (error) {
        console.log(error)
        res.send({ error: error })
    }
})

app.get('/fetchData', async (req, res) => {
    console.log(req.query)
    try {
        const geoNames = await axios.get(`http://api.geonames.org/searchJSON?country=${req.query.country}&name_equals=${req.query.location}&maxRows=1&username=${process.env.GEO_NAME_USERNAME}`)
        const currentWeatherBit = await axios.get(`https://api.weatherbit.io/v2.0/current?key=${process.env.WAETHERBIT_API_KEY}&lat=${geoNames.data.geonames[0].lat}&lon=${geoNames.data.geonames[0].lng}`)
        const forecastWeatherBit = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WAETHERBIT_API_KEY}&lat=${geoNames.data.geonames[0].lat}&lon=${geoNames.data.geonames[0].lng}`)
        const pixabay = await axios.get(`https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${req.query.location}&category=travel&&image_type=photo&orientation=horizontal`)
        res.send({
            currentWeatherBit: currentWeatherBit.data.data,
            forecastWeatherBit: forecastWeatherBit.data.data,
            pixabay: pickUpRandomImg(pixabay.data.hits)
        })
    } catch (error) {
        console.log(error);
        const { status, statusText, data } = error.response;
        console.log(`Error! HTTP Status: ${status} ${statusText}`);
        console.log('Return error message is below :');
        // console.log(data);
        res.send(error)
    }
})

const pickUpRandomImg = (data) => {
    const randomInt = getRandomInt(0, data.length - 1)
    console.log(data.length)
    console.log(randomInt)
    if (!data.length) return 'nothing'
    else return data[randomInt].webformatURL
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}