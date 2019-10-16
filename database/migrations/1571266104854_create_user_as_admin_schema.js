'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateUserAsAdminSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.boolean('admin').defaultTo(false)
    })
  }

  down () {
    this.alter('users', (table) => {
      table.dropColumn('admin')
    })
  }
}

module.exports = CreateUserAsAdminSchema
