const express = require('express')
const hpData = require('./data/characters.json')

const setupServer = () => {
    const app = express()
    app.use(express.json())
    app.use(express.text())

    let hpCharacters = hpData.characters

    /** GET /characters */
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

    /** GET /characters/:id */
    app.get('/characters/:id', (req, res) => {
        const selectedCharacter = hpCharacters.find((character) => character.id === Number(req.params.id))
        res.send(selectedCharacter)
    })

    /** GET /search/characters */
    app.get('/search/characters', (req, res) => {
        const query = req.query.q
        const results = hpCharacters.filter((character) => {
            return character.name.toLowerCase().includes(query.toLowerCase())
        })
        res.json({ total_count: results.length, items: results })
    })

    /** POST /characters */
    app.post('/characters', (req, res) => {
        hpCharacters.push(req.body)
        res.send(req.body)
    })

    /** PATCH /characters/:id */
    app.patch('/characters/:id', (req, res) => {
        const reqBody = req.body
        const selectedCharacter = hpCharacters.find((character) => character.id === Number(req.params.id))

        Object.keys(reqBody).forEach((key) => {
            if (Object.keys(selectedCharacter).includes(key)) {
                selectedCharacter[key] = reqBody[key]
            }
        })
        res.send(selectedCharacter)
    })

    /** DELETE /characters/:id */
    app.delete('/characters/:id', (req, res) => {
        hpCharacters = hpCharacters.filter((character) => character.id !== Number(req.params.id))
        res.status(200).send()
    })

    return app
}

module.exports = { setupServer }
