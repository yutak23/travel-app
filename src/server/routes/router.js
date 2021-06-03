const { Router } = require('express');
const router = Router();
const controller = require('../controllers/controller')

router.get('/allCountries', controller.allCountries)
router.get('/allCitiesByCountry', controller.allCitiesByCountry)
router.get('/fetchData', controller.fetchData)

module.exports = router;