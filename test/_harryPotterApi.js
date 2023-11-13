const chai = require('chai')
const chaiHttp = require('chai-http')

const { setupServer } = require('../src/server')
const hpData = require('../src/data/characters.json')

chai.use(chaiHttp)
chai.should()

const server = setupServer()
describe('Harry Potter API Server', () => {
    let request
    beforeEach(() => {
        request = chai.request(server)
    })

    describe('GET /characters - returning harry potter characters', () => {
        it('should return harry potter characters', async () => {
            const res = await request.get('/characters')
            const expected = hpData.characters
            JSON.parse(res.text).result.should.deep.equal(expected)
        })

        it('should return harry potter characters', async () => {
            const res = await request.get('/characters').query({ limit: 5 })
            const expected = hpData.characters
            JSON.parse(res.text).result.should.deep.equal(expected.slice(0, 5))
        })
    })
})
