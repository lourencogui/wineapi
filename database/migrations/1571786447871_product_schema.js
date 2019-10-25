'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table
        .integer('product_type_id')
        .references('id')
        .inTable('product_types')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .notNullable()
      table.string('name').notNullable()
      table.string('description')
      table.integer('size').notNullable()
      table.double('price').notNullable()
      table.integer('available').notNullable()
      table.text('avatar')
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
