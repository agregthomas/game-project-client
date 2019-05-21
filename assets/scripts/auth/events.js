'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')
const gameEvents = require('../game/events.js')

const onSignUp = (event) => {
  event.preventDefault()

  $('.confirm').removeAttr('hidden')

  const form = event.target.parentNode
  const formData = getFormFields(form)

  api.signUp(formData)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFail)
}

const onSignIn = (event) => {
  event.preventDefault()

  const form = event.target.parentNode
  const formData = getFormFields(form)

  api.signIn(formData)
    .then((responseData) => {
      ui.onSignInSuccess(responseData)
      gameEvents.getAll(event)
    })
    .catch(ui.onSignInFail)
}

const onChangePassword = (event) => {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)

  api.changePassword(formData)
    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordFail)
}

const onSignOut = (event) => {
  event.preventDefault()

  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignoutFail)
}

const onQuickSignIn = (event) => {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)

  api.quickSignIn(formData)
    .then((responseData) => {
      ui.onSignInSuccess(responseData)
      gameEvents.getAll(event)
    })
    .catch(ui.onSignInFail)
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onQuickSignIn
}
