'use strict'
const User = use('App/Models/User')
class SessionController {
  async store ({ request, response, auth }) {
    const { email, password } = request.all()

    const { token, type } = await auth.attempt(email, password)
    const { admin } = await User.findBy({ email })

    return { token, type, admin }
  }
}

module.exports = SessionController
