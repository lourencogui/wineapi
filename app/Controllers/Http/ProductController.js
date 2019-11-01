const crypto = require('crypto')
const Helpers = use('Helpers')
const Product = use('App/Models/Product')
const Drive = use('Drive')
const Database = use('Database')
const Sentry = use('Sentry')

class ProductController {
  async store ({ request, response }) {
    let data, result
    request.multipart.field(async (name, value) => {
      data = JSON.parse(value)
    })

    request.multipart.file('avatar', {}, async (f) => {
      try {
        const random = Helpers.promisify(crypto.randomBytes)
        const fileName = await random(16)
        const fullName = `${fileName.toString('hex')}.png`
        const ContentType = f.headers['content-type']
        const ACL = 'public-read'

        const url = await Drive.disk('s3').put(fullName, f.stream, {
          ContentType,
          ACL
        })
        // url = await Drive.getUrl(fullName)
        // url = 'teste'

        const trx = await Database.beginTransaction()
        const product = await Product.create({ ...data, avatar: url }, trx)
        await trx.commit()
        result = product
      } catch (error) {
        Sentry.captureException(error)
        return response.status(error.status).json({
          error: {
            message: 'Não foi possível processar o arquivo v2',
            errorMessage: error.message
          }
        })
      }
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
