const hpData = require('../../data/characters.json')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('characters').del()
    await knex('characters').insert(hpData.characters)
}
