'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with sales
 */
const Sale = use('App/Models/Sale')
const Product = use('App/Models/Product')
const Kue = use('Kue')
const Job = use('App/Jobs/SendNewSaleEmail')
const Database = use('Database')

class SaleController {
  /**
   * Show a list of all sales.
   * GET sales
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  async store ({ request, response, auth }) {
    const data = request.input('products')
    const { user } = auth
    let total = 0

    // VALIDA SE POSSUI ESTOQUE
    for (let i = 0; i < data.length; i++) {
      const { id, quantity } = data[i]
      const product = await Product.findByOrFail('id', id)
      if (product.available < quantity) return response.json({ message: 'Não possui estoque' })

      total += (quantity * product.price)
    }

    const trx = await Database.beginTransaction()
    const sale = await Sale.create({ user_id: auth.user.id, total }, trx)

    // RELACIONA OS PRODUTOS COM A COMPRA
    for (let i = 0; i < data.length; i++) {
      const { id, quantity } = data[i]
      await sale.products().attach([id], (row) => {
        row.quantity = quantity
      }, trx)
    }

    // ATUALIZANDO QUANTIDADE DISPONIVEL
    for (let i = 0; i < data.length; i++) {
      const { id, quantity } = data[i]
      const product = await Product.findByOrFail('id', id)

      const newQuantity = product.available - quantity

      product.merge({ available: newQuantity })
      await product.save(trx)
    }
    await trx.commit()

    const products = await sale.products().fetch()
    // console.log(wines.rows)
    Kue.dispatch(Job.key, { products, user, sale }, { attempts: 3 })

    return response.json({ success: true })
  }

  /**
   * Display a single sale.
   * GET sales/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update sale details.
   * PUT or PATCH sales/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a sale with id.
   * DELETE sales/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = SaleController
