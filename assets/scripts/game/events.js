'use strict'

const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')

const onBomb = (event) => {
  event.preventDefault()

  const int = Math.floor(Math.random() * Math.floor(8))

  store.bomb = int.toString()

  $('#bomb').prop('hidden', true)
}

const getAll = (event) => {
  event.preventDefault()

  api.all()
    .then(ui.onSignInSuccess)
    .catch()
}

const win = (event) => {
  event.preventDefault()

  api.all()
    .then(ui.onWin)
    .catch()
}

const onCreateGame = (event) => {
  event.preventDefault()

  if (store.user === undefined) {
    ui.onNewGameFail()
  } else {
    const boxOver = {
      game: {
        over: true
      }
    }

    api.newGame()
      .then((responseData) => {
        ui.onNewGameSuccess(responseData)
        getAll(event)
      })
      .catch()

    api.move(boxOver)
      .then()
      .catch()
  }
}

const onMove = (event) => {
  event.preventDefault()

  const box = event.target
  const boxIndex = box.getAttribute('data-index')

  const bombCheck = ui.bombCheck(boxIndex)

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
      over: true
    }
  }

  if (box.innerHTML === 'x' || box.innerHTML === 'o' || store.winner !== '') {
    ui.onMoveFail()
  } else {
    api.move(boxOngoing)
      .then((responseData) => {
        box.innerHTML = store.curValue
        ui.onMoveSuccess(responseData, bombCheck)

        const winCheck = ui.winCheck(bombCheck)

        if (winCheck !== undefined) {
          api.move(boxOver)
            .then((responseData) => {
              win(event)
            })
        }
      })
      .catch(ui.onMoveFail)
  }
}

const onMouseIn = (event) => {
  event.preventDefault()

  const box = $(event.target)

  box.addClass('hover')
}

const onMouseOut = (event) => {
  event.preventDefault()

  const box = $(event.target)

  box.removeClass('hover')
}

const completeAll = (event) => {
  event.preventDefault()

  api.all(event)
    .then((responseData) => {
      const games = responseData.games.filter((game) => !game.over)

      games.forEach((game) => {
        const id = game.id
        const boxData = {
          game: {
            over: true
          }
        }

        api.complete(boxData, id)
          .then()
          .catch()
      })
    })
    .catch()
}

module.exports = {
  onMove,
  onCreateGame,
  getAll,
  onMouseIn,
  onMouseOut,
  completeAll,
  onBomb
}
