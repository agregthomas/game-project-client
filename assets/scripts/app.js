'use strict'

const authEvents = require('./auth/events.js')
const gameEvents = require('./game/events.js')

$(() => {
  // Login/Logout handlers!
  $('#sign-up-button').on('click', authEvents.onSignUp)
  $('#sign-in-button').on('click', authEvents.onSignIn)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#sign-out').on('click', authEvents.onSignOut)
  $('#quick-sign-in').on('submit', authEvents.onQuickSignIn)

  // Game handlers!
  $('#new-game').on('click', gameEvents.onCreateGame)
  $('#board').on('click', gameEvents.onMove)
})
