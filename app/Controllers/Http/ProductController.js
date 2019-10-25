const crypto = require('crypto')
const Helpers = use('Helpers')
const Product = use('App/Models/Product')

const Database = use('Database')
class ProductController {
  async store ({ request, response }) {
    const data = JSON.parse(request.input('product'))
    const avatar = request.file('avatar', {
      types: ['image']
    })

    const random = Helpers.promisify(crypto.randomBytes)
    const fileName = await random(16)
    await avatar.move(Helpers.publicPath('uploads'), {
      name: `${fileName.toString('hex')}.png`,
      overwrite: true
    })

    if (!avatar.moved()) {
      return avatar.error()
    }

    const trx = await Database.beginTransaction()
    const product = await Product.create({ ...data, avatar: `${Helpers.publicPath(`/uploads/${avatar.fileName}`)}` }, trx)
    await trx.commit()
    return product
  }

  async index (req, res) {
    const products = await Product.all()
    return products
  }
}

module.exports = ProductController
