'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DeleteProductTypesSchema extends Schema {
  up () {
    this.drop('product_types')
  }
}

module.exports = DeleteProductTypesSchema
