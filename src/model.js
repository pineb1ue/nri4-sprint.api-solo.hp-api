const knex = require('./knex')
const CHARACTER_TABLE = 'characters'

module.exports = {
    getAll(limit) {
        if (limit) {
            return knex.select('*').from(CHARACTER_TABLE).limit(limit)
        }
        return knex.select('*').from(CHARACTER_TABLE)
    },
}
