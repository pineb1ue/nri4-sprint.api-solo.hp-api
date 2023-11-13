const express = require('express')
const model = require('./model')

const setupServer = () => {
    const app = express()
    app.use(express.json())
    app.use(express.text())

    /** GET /characters */
    app.get('/characters', async (req, res) => {
        let characters
        if (req.query.limit) {
            characters = await model.getAll(req.query.limit)
        } else {
            characters = await model.getAll()
        }
        res.json({
            total_count: characters.length,
            items: characters,
        })
    })

    /** GET /characters/:id */
    app.get('/characters/:id', async (req, res) => {
        const selectedCharacter = await model.getById(req.params.id)
        res.send(selectedCharacter)
    })

    /** GET /search/characters */
    app.get('/search/characters', async (req, res) => {
        const query = req.query.q
        const results = await model.search(query)
        res.json({ total_count: results.length, items: results })
    })

    /** POST /characters */
    app.post('/characters', async (req, res) => {
        const reqBody = req.body
        await model.create(reqBody)
        res.send(reqBody)
    })

    /** PATCH /characters/:id */
    app.patch('/characters/:id', async (req, res) => {
        const reqBody = req.body
        const columns = await model.getColumnNames()
        const columnNames = Object.keys(columns)
        const selectedCharacter = await model.update(req.params.id, reqBody, columnNames)
        res.send(selectedCharacter[0])
    })

    /** DELETE /characters/:id */
    app.delete('/characters/:id', async (req, res) => {
        const deletedCharacter = await model.delete(req.params.id)
        if (deletedCharacter > 0) {
            res.status(200).send()
        } else {
            res.status(404).json({ error: 'Character not found' })
        }
    })

    return app
}

module.exports = { setupServer }
