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

app.post('/fetchMeaningCloud', (req, res) => {
    axios.get(`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&of=json&lang=en&txt=${req.body.txt}`)
        .then((apiRes) => {
            res.send(apiRes.data)
        })
        .catch((error) => {
            console.log(error)
        })
})