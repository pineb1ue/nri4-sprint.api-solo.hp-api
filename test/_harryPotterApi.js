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
        it('should return harry potter all characters', async () => {
            const res = await request.get('/characters')
            const expected = {
                total_count: hpData.characters.length,
                items: hpData.characters,
            }
            JSON.parse(res.text).should.deep.equal(expected)
        })

        it('should return harry potter 5characters', async () => {
            const res = await request.get('/characters').query({ limit: 5 })
            const expected = {
                total_count: 5,
                items: hpData.characters.slice(0, 5),
            }
            JSON.parse(res.text).should.deep.equal(expected)
        })
    })

    describe('GET /characters/search - returning characters by query', () => {
        const expected = {
            total_count: 1,
            items: [
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
            ],
        }
        it('should return Hermione Granger', async () => {
            const res = await request.get('/characters/search').query({ q: 'Hermione' })
            JSON.parse(res.text).should.deep.equal(expected)
        })

        it('should return Hermione Granger', async () => {
            const res = await request.get('/characters/search').query({ q: 'hermione' })
            JSON.parse(res.text).should.deep.equal(expected)
        })
    })

    describe('POST /characters - registering harry potter character', () => {
        it('should return registered character', async () => {
            const expected = {
                id: '9e3f7ce4-b9a7-4244-b709-dae5c1f1d4a8',
                name: 'Test',
            }
            const res = await request.post('/characters').send(expected)
            JSON.parse(res.text).should.deep.equal(expected)
        })
    })
})
