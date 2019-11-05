'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DeleteProductTypesSchema extends Schema {
  up () {
    this.alter('products', (table) => {
      table.dropColumn('product_type_id')
    })
  }
}

module.exports = DeleteProductTypesSchema
