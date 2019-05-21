'use strict'

const config = require('../config.js')
const store = require('../store.js')

const all = () => {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  })
}

const newGame = () => {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  })
}

const move = (boxData) => {
  return $.ajax({
    url: config.apiUrl + '/games/' + store.curGame.id,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: boxData
  })
}

const complete = (boxData, id) => {
  return $.ajax({
    url: config.apiUrl + '/games/' + id,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: boxData
  })
}

module.exports = {
  all,
  newGame,
  move,
  complete
}
