'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store.js')

const onSuccess = () => $('form').trigger('reset')

const onSignUpSuccess = (responseData) => {
  $('#results').html('')
  $('.confirm').toggle()

  const userHTML = `
  <p>New User ID: ${responseData.user.id}</p>
  <p>New User Login: ${responseData.user.email}</p>
  `
  $('#results').append(userHTML)
  $('#results').removeClass()
  $('#results').addClass('success')
  onSuccess()
}

const onSignUpFail = (responseData) => {
  $('#results').html('')

  // const form = $('#sign-up')
  const form = document.getElementById('sign-up')
  const formData = getFormFields(form)

  let userHTML

  if (formData.credentials.email === '') {
    userHTML = `
    <p>Please enter a valid email to sign-up.</p>
    `
  } else if (formData.credentials.password === '') {
    userHTML = `
    <p>Please enter a password to sign-up.</p>
    `
  } else if (formData.credentials.password_confirmation === '') {
    userHTML = `
    <p> Please confirm your password to sign-up.</p>
    `
  } else {
    userHTML = `User with email ${formData.credentials.email} already exists.`
  }

  $('#results').append(userHTML)
  $('#results').removeClass()
  $('#results').addClass('failure')
}

const onSignInSuccess = (responseData) => {
  $('#results').html('')
  $('.logged-in').toggle()
  $('.logged-out').toggle()

  const userHTML = `
  <p>Logged in User ID: ${responseData.user.id}</p>
  <p>Welcome!</p>
  `
  $('#results').append(userHTML)
  $('#results').removeClass()
  $('#results').addClass('success')
  onSuccess()

  store.user = responseData.user
}

const onSignInFail = (responseData) => {
  $('#results').html('')
  const userHTML = `
  <p>Invalid username or password.</p>
  `
  $('#results').append(userHTML)
  $('#results').removeClass()
  $('#results').addClass('failure')
}

const onChangePasswordSuccess = (responseData) => {
  $('#results').html('')
  const userHTML = `
  <p>Password changed!</p>`
  $('#results').append(userHTML)
  $('#results').removeClass()
  $('#results').addClass('success')
  onSuccess()
}

const onChangePasswordFail = (responseData) => {
  $('#results').html('')
  const userHTML = `
  <p>Failure!!</p>`
  $('#results').append(userHTML)
  $('#results').removeClass()
  $('#results').addClass('failure')
}

const onSignOutSuccess = (responseData) => {
  $('#results').html('')
  $('#history').html('')
  $('.logged-in').toggle()
  $('.logged-out').toggle()

  const userHTML = `
  <p>${store.user.email} successfully logged out</p>`
  $('#results').append(userHTML)
  $('#results').removeClass()
  $('#results').addClass('success')
  onSuccess()
}

const onSignOutFail = (responseData) => {
  $('#results').html('')
  const userHTML = `
  <p>Failed to logout ${store.user.email}</p>`
  $('#results').append(userHTML)
  $('#results').removeClass()
  $('#results').addClass('failure')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFail,
  onSignInSuccess,
  onSignInFail,
  onChangePasswordSuccess,
  onChangePasswordFail,
  onSignOutSuccess,
  onSignOutFail
}
