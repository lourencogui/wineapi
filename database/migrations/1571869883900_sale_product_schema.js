'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SaleProductSchema extends Schema {
  up () {
    this.create('sale_product', (table) => {
      table.increments()
      table
        .integer('sale_id')
        .unsigned()
        .references('id')
        .inTable('sales')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .notNullable()
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .notNullable()
      table.integer('quantity').notNullable()
    })
  }

  down () {
    this.drop('sale_product')
  }
}

module.exports = SaleProductSchema
