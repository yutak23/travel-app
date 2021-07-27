const express = require('express');
const routes = require('../router');
const app = express();

/* Middleware */
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use('/', routes);

module.exports = app;