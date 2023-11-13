const chai = require('chai')
const chaiHttp = require('chai-http')
const { setupServer } = require('../src/server')

chai.use(chaiHttp)
chai.should()

const server = setupServer()
describe('Harry Potter API Server', () => {
    let request
    beforeEach(() => {
        request = chai.request(server)
    })
})
