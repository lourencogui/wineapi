'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sale extends Model {
  static boot () {
    super.boot()

    // this.addHook('afterCreate', 'SaleHook.sendSaleEmail')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  // wines () {
  //   return this.belongsToMany('App/Models/Wine')
  //     .withPivot(['quantity'])
  // }

  products () {
    return this.belongsToMany('App/Models/Product')
      .pivotTable('sale_product')
      .withPivot(['quantity'])
  }
}

module.exports = Sale
