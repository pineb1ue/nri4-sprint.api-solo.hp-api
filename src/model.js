const knex = require('./knex')
const CHARACTER_TABLE = 'characters'

module.exports = {
    getAll(limit) {
        if (limit) {
            return knex.select('*').from(CHARACTER_TABLE).limit(limit)
        }
        return knex.select('*').from(CHARACTER_TABLE).orderBy('id')
    },

    getById(id) {
        return knex.select('*').from(CHARACTER_TABLE).where('id', '=', id).first()
    },

    search(query) {
        return knex.select('*').from(CHARACTER_TABLE).where('name', 'ilike', `%${query}%`)
    },

    create(character) {
        return knex(CHARACTER_TABLE).insert(character)
    },

    getColumnNames() {
        return knex(CHARACTER_TABLE).columnInfo()
    },

    update(id, character, columnNames) {
        return knex(CHARACTER_TABLE).where('id', '=', id).update(character, columnNames)
    },

    delete(id) {
        return knex(CHARACTER_TABLE).where('id', '=', id).del()
    },
}
