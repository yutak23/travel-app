const axios = require('axios').default;

// dotenv
const dotenv = require('dotenv')
dotenv.config();

// instance for get countries and cities
const instance = axios.create({
    baseURL: 'https://api.countrystatecity.in/v1/',
    timeout: 3000,
    headers: { 'X-CSCAPI-KEY': `${process.env.COUNTRYSTATECITY_API_KRY}` }
})

const allCountries = async (req, res) => {
    try {
        const countries = await instance.get('countries')
        res.send({ countries: countries.data })
    } catch (error) {
        errorHandler(res, error)
    }
}

const allCitiesByCountry = async (req, res) => {
    try {
        const cities = await instance.get(`countries/${req.query.ciso}/cities`)
        res.send({ cities: cities.data })
    } catch (error) {
        errorHandler(res, error)
    }
}

const fetchData = async (req, res) => {
    console.log(req.query)
    try {
        let pixabay
        let pixabayResOp = 'location'

        const geoNames = await axios.get(`http://api.geonames.org/searchJSON?country=${req.query.countryCode}&name_equals=${req.query.location}&maxRows=1&username=${process.env.GEO_NAME_USERNAME}`)
        const currentWeatherBit = await axios.get(`https://api.weatherbit.io/v2.0/current?key=${process.env.WAETHERBIT_API_KEY}&lat=${geoNames.data.geonames[0].lat}&lon=${geoNames.data.geonames[0].lng}`)
        const forecastWeatherBit = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WAETHERBIT_API_KEY}&lat=${geoNames.data.geonames[0].lat}&lon=${geoNames.data.geonames[0].lng}`)
        pixabay = await axios.get(`https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${req.query.location}&category=travel&&image_type=photo&orientation=horizontal`)

        if (!pixabay.data.hits.length) {
            pixabayResOp = 'country'
            pixabay = await axios.get(`https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${req.query.countryName}&category=travel&&image_type=photo&orientation=horizontal`)
        }

        res.send({
            currentWeatherBit: currentWeatherBit.data.data,
            forecastWeatherBit: forecastWeatherBit.data.data,
            pixabay: pickUpRandomImg(pixabay.data.hits),
            pixabayResOp: pixabayResOp
        })
    } catch (error) {
        errorHandler(res, error)
    }
}

const pickUpRandomImg = (data) => {
    const randomInt = getRandomInt(0, data.length - 1)
    if (!data.length) return 'nothing'
    else return data[randomInt].webformatURL
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

const errorHandler = (res, error) => {
    if (error.response) {
        console.log('response.data', error.response.data)
        console.log('response.status', error.response.status)
        console.log('response.statusText', error.response.statusText)
        res.status(error.response.status).send({
            error: error.response.data,
            errorMsg: error.message
        })
    } else {
        res.status(500).send({ errorMsg: error.message })
    }
}

module.exports = {
    allCountries,
    allCitiesByCountry,
    fetchData
};