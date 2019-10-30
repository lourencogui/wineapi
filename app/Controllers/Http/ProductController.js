const crypto = require('crypto')
const Helpers = use('Helpers')
const Product = use('App/Models/Product')
const Drive = use('Drive')
const Database = use('Database')
class ProductController {
  async store ({ request, response }) {
    let data, url, result
    request.multipart.field(async (name, value) => {
      data = JSON.parse(value)
    })

    request.multipart.file('avatar', {}, async (f) => {
      const random = Helpers.promisify(crypto.randomBytes)
      const fileName = await random(16)
      const fullName = `${fileName.toString('hex')}.png`

      await Drive.disk('s3').put(fullName, f.stream)
      url = await Drive.disk('s3').getUrl(fullName)

      const trx = await Database.beginTransaction()
      const product = await Product.create({ ...data, avatar: url }, trx)
      await trx.commit()
      result = product
    })
    await request.multipart.process()
    return result
  }

  async index (req, res) {
    const products = await Product.all()
    return products
  }
}

module.exports = ProductController
