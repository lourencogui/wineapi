'use strict'

const Route = use('Route')

Route.get('/', () => { return { ok: true } })
// USER
Route.get('users', 'UserController.index')
Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')

// PASSWORD
Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update').validator('ForgotPassword')

// WINE
Route.group(() => {
  Route.resource('wines', 'WineController').apiOnly().validator(new Map([
    [['wines.store'], ['Wine']]
  ]))
  Route.resource('sales', 'SaleController').apiOnly().validator(new Map([
    [['sales.store'], ['Sale']]
  ]))
  Route.resource('productTypes', 'ProductTypeController').apiOnly().validator(new Map([
    [['productTypes.store'], ['ProductType']]
  ]))
  Route.resource('products', 'ProductController').apiOnly()
  // .validator(new Map([
  //   [['products.store'], ['Product']]
  // ]))
}).middleware(['auth'])
