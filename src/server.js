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

    return app
}

module.exports = { setupServer }
