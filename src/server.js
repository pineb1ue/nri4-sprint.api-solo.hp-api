const express = require('express')
const hpData = require('./data/characters.json')

const setupServer = () => {
    const app = express()
    app.use(express.json())
    app.use(express.text())

    const hpCharacters = hpData.characters

    /** GET /api/characters */
    app.get('/characters', (req, res) => {
        let characters
        if (req.query.limit) {
            characters = hpCharacters.slice(0, req.query.limit)
        } else {
            characters = hpCharacters
        }
        res.json({
            total_count: characters.length,
            items: characters,
        })
    })

    /** GET /api/characters/search */
    app.get('/characters/search', (req, res) => {
        const query = req.query.q
        const results = hpCharacters.filter((character) => {
            return character.name.toLowerCase().includes(query.toLowerCase())
        })
        res.json({ total_count: results.length, items: results })
    })

    /** POST /api/characters */
    app.post('/characters', (req, res) => {
        hpCharacters.push(req.body)
        res.send(req.body)
    })

    return app
}

module.exports = { setupServer }
