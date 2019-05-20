'use strict'

const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')

const getAll = (event) => {
  event.preventDefault()

  api.all()
    .then(ui.onSignInSuccess)
    .catch()
}

const onCreateGame = (event) => {
  event.preventDefault()

  if (store.user === undefined) {
    ui.onNewGameFail()
  } else {
    api.newGame()
      .then((responseData) => {
        ui.onNewGameSuccess(responseData)
        getAll(event)
      })
      .catch()
  }
}

const onMove = (event) => {
  event.preventDefault()

  const box = event.target
  const boxIndex = box.getAttribute('data-index')

  const boxOngoing = {
    game: {
      cell: {
        index: boxIndex,
        value: store.curValue
      },
      over: false
    }
  }

  const boxOver = {
    game: {
      cell: {
        index: boxIndex,
        value: store.curValue
      },
      over: true
    }
  }

  if (store.winner === '') {
    api.move(boxOngoing)
      .then((responseData) => {
        box.innerHTML = store.curValue
        ui.onMoveSuccess(responseData)
        getAll(event)
      })
      .catch(ui.onMoveFail)
  } else {
    api.move(boxOver)
      .then((responseData) => {
        ui.onMoveFail()
        getAll(event)
      })
  }
}

module.exports = {
  onMove,
  onCreateGame,
  getAll
}
