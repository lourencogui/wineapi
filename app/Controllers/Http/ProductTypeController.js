'use strict'

const ProductType = use('App/Models/ProductType')

const Database = use('Database')

class ProductTypeController {
  async store ({ request, response }) {
    const data = request.only(['name'])
    const trx = await Database.beginTransaction()

    const productType = await ProductType.create(data, trx)
    await trx.commit()
    return productType
  }

  async index ({ request, response, view }) {
    const productTypes = await ProductType.all()
    return productTypes
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = ProductTypeController
