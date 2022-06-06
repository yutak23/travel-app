const { Router } = require('express');
const router = Router();
const controller = require('../controllers/controller');

router.get('/allCountries', controller.allCountries);
router.get('/allCitiesByCountry', controller.allCitiesByCountry);
router.get('/fetchData', controller.fetchData);

module.exports = router;

// router.get('/allCountries', async (req, res) => {
//     try {
//         // const countries = await instance.get('countries')
//         const countries = await axios.get('countries', {
//             baseURL: 'https://api.countrystatecity.in/v1/',
//             timeout: 2500,
//             headers: { 'X-CSCAPI-KEY': `${process.env.COUNTRYSTATECITY_API_KRY}` }
//         })
//         // console.log(countries) <-これで見た感じjest.mock()はうまくいっている
//         res.status(200).send({ countries: countries.data })　// return がなくても合ってもダイジョブなのはなぜ？
//         // return res.send({ countries: countries.data }) テスト実行できる＝正しいのは.status(200)がある方
//     } catch (error) {
//         errorHandler(res, error)
//     }
// })
// const allCountries =
