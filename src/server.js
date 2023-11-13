const express = require('express')

const setupServer = () => {
    const app = express()
    app.use(express.json())
    app.use(express.text())

    return app
}

module.exports = { setupServer }
