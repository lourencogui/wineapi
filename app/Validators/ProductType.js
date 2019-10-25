const Antl = use('Antl')

class ProductType {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = ProductType
