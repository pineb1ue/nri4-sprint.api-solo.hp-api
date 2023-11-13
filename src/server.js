const express = require('express')
const hpData = require('./data/characters.json')

const setupServer = () => {
    const app = express()
    app.use(express.json())
    app.use(express.text())

    /** GET /api/characters */
    app.get('/characters', (req, res) => {
        let characters
        if (req.query.limit) {
            characters = hpData.characters.slice(0, req.query.limit)
        } else {
            characters = hpData.characters
        }
        res.json({
            total_count: characters.length,
            items: characters,
        })
    })

    /** GET /api/characters/search */
    app.get('/characters/search', (req, res) => {
        const query = req.query.q
        const results = hpData.characters.filter((character) => {
            return character.name.toLowerCase().includes(query.toLowerCase())
        })
        res.json({ total_count: results.length, items: results })
    })

    return app
}

module.exports = { setupServer }
