/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('characters', function (table) {
        table.increments('id').primary()
        table.string('name', 32).notNullable()

        table.string('species', 32)
        table.string('gender', 32)
        table.string('house', 32)
        table.string('dateOfBirth', 32)
        table.integer('yearOfBirth', 32)
        table.boolean('wizard')
        table.string('ancestry', 32)
        table.string('eyeColour', 32)
        table.string('hairColour', 32)
        table.string('patronus', 32)
        table.boolean('hogwartsStudent')
        table.boolean('hogwartsStaff')
        table.string('actor', 32)
        table.boolean('alive')
        table.string('image', 256)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('characters')
}
