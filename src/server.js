const express = require('express')
const hpData = require('./data/characters.json')

const setupServer = () => {
    const app = express()
    app.use(express.json())
    app.use(express.text())

    /** GET /api/characters */
    app.get('/characters', (req, res) => {
        if (req.query.limit) {
            res.json({ result: hpData.characters.slice(0, req.query.limit) })
        } else {
            res.json({ result: hpData.characters })
        }
    })

    /** GET /api/characters/search */
    app.get('/characters/search', (req, res) => {
        const query = req.query.q
        const results = hpData.characters.filter((character) => {
            return character.name.toLowerCase().includes(query.toLowerCase())
        })
        res.json({ result: results })
    })

    return app
}

module.exports = { setupServer }
