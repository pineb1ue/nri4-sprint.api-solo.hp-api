const express = require('express')
const cors = require('cors')
const controller = require('./controller')

const setupServer = () => {
    const app = express()
    app.use(express.json())
    app.use(express.text())
    app.use(cors())

    /** GET /characters */
    app.get('/characters', async (req, res) => {
        let characters
        if (req.query.limit) {
            characters = await controller.getAll(req.query.limit)
        } else {
            characters = await controller.getAll()
        }
        res.json({
            total_count: characters.length,
            items: characters,
        })
    })

    /** GET /characters/:id */
    app.get('/characters/:id', async (req, res) => {
        const selectedCharacter = await controller.getById(req.params.id)
        res.send(selectedCharacter)
    })

    /** GET /search/characters */
    app.get('/search/characters', async (req, res) => {
        const query = req.query.q
        const results = await controller.search(query)
        res.json({ total_count: results.length, items: results })
    })

    /** POST /characters */
    app.post('/characters', async (req, res) => {
        const reqBody = req.body
        await controller.create(reqBody)
        res.send(reqBody)
    })

    /** PATCH /characters/:id */
    app.patch('/characters/:id', async (req, res) => {
        const reqBody = req.body
        const columns = await controller.getColumnNames()
        const columnNames = Object.keys(columns)
        const selectedCharacter = await controller.update(req.params.id, reqBody, columnNames)
        res.send(selectedCharacter[0])
    })

    /** DELETE /characters/:id */
    app.delete('/characters/:id', async (req, res) => {
        const deletedCharacter = await controller.delete(req.params.id)
        if (deletedCharacter > 0) {
            res.status(200).send()
        } else {
            res.status(404).json({ error: 'Character not found' })
        }
    })

    return app
}

module.exports = { setupServer }
