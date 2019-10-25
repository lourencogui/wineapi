'use strict'
const Antl = use('Antl')

class Product {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required|unique:products',
      size: 'required|integer',
      price: 'required|number',
      available: 'required|integer'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Product
