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

    describe('GET /characters/search - returning characters by query', () => {
        const expected = [
            {
                id: '4c7e6819-a91a-45b2-a454-f931e4a7cce3',
                name: 'Hermione Granger',
                alternate_names: [],
                species: 'human',
                gender: 'female',
                house: 'Gryffindor',
                dateOfBirth: '19-09-1979',
                yearOfBirth: 1979,
                wizard: true,
                ancestry: 'muggleborn',
                eyeColour: 'brown',
                hairColour: 'brown',
                wand: {
                    wood: 'vine',
                    core: 'dragon heartstring',
                    length: 10.75,
                },
                patronus: 'otter',
                hogwartsStudent: true,
                hogwartsStaff: false,
                actor: 'Emma Watson',
                alternate_actors: [],
                alive: true,
                image: 'https://ik.imagekit.io/hpapi/hermione.jpeg',
            },
        ]
        it('should return Hermione Granger', async () => {
            const res = await request.get('/characters/search').query({ q: 'Hermione' })
            JSON.parse(res.text).result.should.deep.equal(expected)
        })

        it('should return Hermione Granger', async () => {
            const res = await request.get('/characters/search').query({ q: 'hermione' })
            JSON.parse(res.text).result.should.deep.equal(expected)
        })
    })
})
