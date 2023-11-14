const chai = require('chai')
const chaiHttp = require('chai-http')

const { setupServer } = require('../server/route')
const hpData = require('../data/testCharacters.json')

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

    describe('GET /characters/:id - returning harry potter character by id', () => {
        it('should return harry potter character by id', async () => {
            const res = await request.get('/characters/2')
            const expected = {
                id: 2,
                name: 'Hermione Granger',
                species: 'human',
                gender: 'female',
                house: 'Gryffindor',
                dateOfBirth: '19-09-1979',
                yearOfBirth: 1979,
                wizard: true,
                ancestry: 'muggleborn',
                eyeColour: 'brown',
                hairColour: 'brown',
                patronus: 'otter',
                hogwartsStudent: true,
                hogwartsStaff: false,
                actor: 'Emma Watson',
                alive: true,
                image: 'https://ik.imagekit.io/hpapi/hermione.jpeg',
            }
            JSON.parse(res.text).should.deep.equal(expected)
        })
    })

    describe('GET /search/characters - returning characters by query', () => {
        const expected = {
            total_count: 1,
            items: [
                {
                    id: 2,
                    name: 'Hermione Granger',
                    species: 'human',
                    gender: 'female',
                    house: 'Gryffindor',
                    dateOfBirth: '19-09-1979',
                    yearOfBirth: 1979,
                    wizard: true,
                    ancestry: 'muggleborn',
                    eyeColour: 'brown',
                    hairColour: 'brown',
                    patronus: 'otter',
                    hogwartsStudent: true,
                    hogwartsStaff: false,
                    actor: 'Emma Watson',
                    alive: true,
                    image: 'https://ik.imagekit.io/hpapi/hermione.jpeg',
                },
            ],
        }
        it('should return Hermione Granger', async () => {
            const res = await request.get('/search/characters').query({ q: 'Hermione' })
            JSON.parse(res.text).should.deep.equal(expected)
        })

        it('should return Hermione Granger', async () => {
            const res = await request.get('/search/characters').query({ q: 'hermione' })
            JSON.parse(res.text).should.deep.equal(expected)
        })
    })

    describe('POST /characters - registering harry potter character', () => {
        it('should return registered character', async () => {
            const expected = {
                id: '11',
                name: 'Test',
            }
            const res = await request.post('/characters').send(expected)
            JSON.parse(res.text).should.deep.equal(expected)
        })
    })

    describe('PATCH /characters - Modifying harry potter character by id', () => {
        it('should return modified character', async () => {
            const expected = {
                id: 2,
                name: 'Test',
                species: 'human',
                gender: 'female',
                house: 'Gryffindor',
                dateOfBirth: '19-09-1979',
                yearOfBirth: 1979,
                wizard: true,
                ancestry: 'muggleborn',
                eyeColour: 'brown',
                hairColour: 'brown',
                patronus: 'otter',
                hogwartsStudent: true,
                hogwartsStaff: false,
                actor: 'Emma Watson',
                alive: true,
                image: 'https://ik.imagekit.io/hpapi/hermione.jpeg',
            }
            const res = await request.patch('/characters/2').send({ name: 'Test' })
            JSON.parse(res.text).should.deep.equal(expected)
        })
    })

    describe('DELETE /characters - Delete harry potter character by id', () => {
        it('should return status code', async () => {
            const res = await request.delete('/characters/1')
            res.should.have.status(200)
        })
    })
})
