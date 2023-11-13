/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('characters', function (table) {
        table.increments('id').primary()
        table.string('name', 32).notNullable()

        table.string('species', 16)
        table.string('gender', 16)
        table.string('house', 16)
        table.date('dateOfBirth', 32)
        table.integer('yearOfBirth', 32)
        table.boolean('wizard')
        table.string('ancestry', 16)
        table.string('eyeColour', 16)
        table.string('hairColour', 16)
        table.string('patronus', 16)
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
