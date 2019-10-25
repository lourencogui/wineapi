'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  type () {
    return this.belongsTo('App/Models/ProductType')
  }

  sales () {
    return this.belongsToMany('App/Models/Sale')
      .withPivot(['quantity'])
  }
}

module.exports = Product
