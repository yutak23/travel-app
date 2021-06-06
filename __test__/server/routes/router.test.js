const request = require('supertest')

const app = require('../../../src/server/app')

describe('Get Endpoints (not mocking)', () => {
    it('/allCountries', async () => {
        const res = await request(app).get('/allCountries')
        expect(res.status).toEqual(200)
        expect(res.body.countries[0].name).toEqual('Afghanistan')
    })

    it('/allCitiesByCountry', async () => {
        const res = await request(app).get('/allCitiesByCountry?ciso=JP')
        expect(res.status).toEqual(200)
        expect(res.body.cities[0].name).toEqual('Abashiri')
    })

})