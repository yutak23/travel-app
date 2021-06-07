const request = require('supertest')

const { allCountries } = require('../../../src/server/controllers/controller')
const app = require('../../../src/server/app')

const axios = require('axios')
jest.mock('axios')

describe('axiosをmock化＆supertestでrequestを飛ばしてテスト', () => {

    it('/allCountries', async () => {
        const resp = { data: [{ name: 'test' }] };
        axios.get.mockResolvedValue(resp); // https://jestjs.io/docs/mock-function-api#mockfnmockresolvedvaluevalue

        const res = await request(app).get('/allCountries')
        expect(res.status).toEqual(200)
        expect(res.body.countries[0].name).toEqual('test')
    })

    it('Abnormal pattern test of API /allCountries', async () => {
        const resp = new Error('error test');
        axios.get.mockRejectedValue(resp);

        const res = await request(app).get('/allCountries')
        expect(res.status).toEqual(500)
        expect(res.body.errorMsg).toEqual('error test')
    })
})

describe('axiosはmock化＆関数のテストとしてテスト', () => {
    it('/allCountries', async () => {
        const resp = { data: [{ name: 'not use superttest' }] };
        axios.get.mockResolvedValue(resp);

        const req = {}
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis()
        }

        await allCountries(req, res)
        expect(res.status.mock.calls[0][0]).toBe(200)
        expect(res.send.mock.calls[0][0].countries[0].name).toEqual('not use superttest')
    })

    it('Abnormal pattern test of API /allCountries', async () => {
        const resp = new Error('error test');
        axios.get.mockRejectedValue(resp);

        const req = {}
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis()
        }

        await allCountries(req, res)
        expect(res.status.mock.calls[0][0]).toBe(500)
        expect(res.send.mock.calls[0][0].errorMsg).toEqual('error test')
    })
})