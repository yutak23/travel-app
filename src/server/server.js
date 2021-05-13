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

app.get('/fetchData', async (req, res) => {
    console.log(req.query)
    try {
        const data = await axios.get(`http://api.geonames.org/searchJSON?country=${req.query.country}&name_equals=${req.query.location}&maxRows=1&username=${process.env.GEO_NAME_USERNAME}`)
        console.log(data)
    } catch (error) {
        const { status, statusText, data } = error.response;
        console.log(`Error! HTTP Status: ${status} ${statusText}, errMsg : ${data.status.message}`);
    }
})