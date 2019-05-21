'use strict'

const store = require('../store.js')

// General use function to handle HTML for fail and success.
const resultCheck = (criteria, userHTML) => {
  $('#results').append(userHTML)
  $('#results').removeClass()
  $('#results').addClass(criteria)
}

const mapHTML = () => {
  const dataObj = document.querySelectorAll('[data-index]')
  const mapHTML = []

  for (let i = 0; i < dataObj.length; i++) {
    mapHTML.push(dataObj[i].innerHTML)
  }

  return mapHTML.every(cur => cur === 'x' || cur === 'o')
}

const resetStore = () => {
  store.curValue = 'x'
  store.winner = ''
  store.bomb = ''
}

const bombCheck = (boxIndex) => {
  if (store.bomb === boxIndex) {
    return true
  } else {
    return false
  }
}

const winCheck = (bombCheck) => {
  if
  // FOR BOMB!
  (bombCheck) {
    if (store.curValue === 'o') {
      store.winner = store.user.email
      store.curGame.over = true
      return `<p>Somebody set you up the bomb Player 2, ${store.user.email} wins!</p>`
    } else {
      store.winner = 'Player 2'
      store.curGame.over = true
      return `<p>Somebody set you up the bomb ${store.user.email}, Player 2 wins!</p>`
    }
  } else if (
    // FOR X'S
    // Check rows
    ($('[data-index=0]').html() === 'x' && $('[data-index=1]').html() === 'x' && $('[data-index=2]').html() === 'x') ||
    ($('[data-index=3]').html() === 'x' && $('[data-index=4]').html() === 'x' && $('[data-index=5]').html() === 'x') ||
    ($('[data-index=6]').html() === 'x' && $('[data-index=7]').html() === 'x' && $('[data-index=8]').html() === 'x') ||
    // Check columns
    ($('[data-index=0]').html() === 'x' && $('[data-index=3]').html() === 'x' && $('[data-index=6]').html() === 'x') ||
    ($('[data-index=1]').html() === 'x' && $('[data-index=4]').html() === 'x' && $('[data-index=7]').html() === 'x') ||
    ($('[data-index=2]').html() === 'x' && $('[data-index=5]').html() === 'x' && $('[data-index=8]').html() === 'x') ||
    // Check diagonals
    ($('[data-index=0]').html() === 'x' && $('[data-index=4]').html() === 'x' && $('[data-index=8]').html() === 'x') ||
    ($('[data-index=2]').html() === 'x' && $('[data-index=4]').html() === 'x' && $('[data-index=6]').html() === 'x')) {
    store.winner = store.user.email
    store.curGame.over = true
    return `<p>${store.user.email} wins!</p>`
  } else if (
    // Check rows
    ($('[data-index=0]').html() === 'o' && $('[data-index=1]').html() === 'o' && $('[data-index=2]').html() === 'o') ||
    ($('[data-index=3]').html() === 'o' && $('[data-index=4]').html() === 'o' && $('[data-index=5]').html() === 'o') ||
    ($('[data-index=6]').html() === 'o' && $('[data-index=7]').html() === 'o' && $('[data-index=8]').html() === 'o') ||
    // Check columns
    ($('[data-index=0]').html() === 'o' && $('[data-index=3]').html() === 'o' && $('[data-index=6]').html() === 'o') ||
    ($('[data-index=1]').html() === 'o' && $('[data-index=4]').html() === 'o' && $('[data-index=7]').html() === 'o') ||
    ($('[data-index=2]').html() === 'o' && $('[data-index=5]').html() === 'o' && $('[data-index=8]').html() === 'o') ||
    // Check diagonals
    ($('[data-index=0]').html() === 'o' && $('[data-index=4]').html() === 'o' && $('[data-index=8]').html() === 'o') ||
    ($('[data-index=2]').html() === 'o' && $('[data-index=4]').html() === 'o' && $('[data-index=6]').html() === 'o')) {
    store.winner = 'Player 2'
    store.curGame.over = true
    return `<p>Player 2 wins!</p>`
  } else if (mapHTML()) {
    store.winner = 'tie'
    store.curGame.over = true
    return `<p>It's a draw!</p>`
  } else store.curGame.over = false
}

// Sign-in actions to generate game tally and load latest game in progress.
const populateBoard = (curGame) => {
  const cells = curGame.cells
  for (let i = 0; i < cells.length; i++) {
    $('[data-index=' + i + ']').html(cells[i])
  }
}

const onSignInSuccess = (responseData) => {
  $('#history').html('')

  store.curGame = responseData.games.filter((game) => !game.over).sort((game1, game2) => game2.id - game1.id)[0]

  const curGame = store.curGame

  if (curGame !== undefined) {
    $('#results').append(`<p>Loaded game ID: ${curGame.id}</p>`)
    const xCount = curGame.cells.filter((cur) => cur === 'x').length
    const oCount = curGame.cells.filter((cur) => cur === 'o').length

    if (xCount > oCount) {
      store.curValue = 'o'
    } else store.curValue = 'x'
  }

  const gamesCompleted = () => {
    if (responseData.games.length === 0) {
      return 'No games played!'
    }
    return responseData.games.filter((game) => game.over).length
  }

  const userHTML = `
  <p>Total Games: ${responseData.games.length}</p>
  <p>Games Completed: ${gamesCompleted()}</p>`

  $('#history').append(userHTML)

  // const resultHTML = `<p>Loaded game ID: ${curGame.id}</p>`
  // $('#result').append(resultHTML)

  populateBoard(curGame)
}

// New-game actions
const onNewGameSuccess = (responseData) => {
  $('#results').html('')

  $('#bomb').removeAttr('hidden')
  resetStore()

  const userHTML = `
  <p>New game created with ID = ${responseData.game.id}</p>
  <p>Ready Player 1.</p>`

  resultCheck('success', userHTML)

  store.curGame = responseData.game
  store.curValue = 'x'
}

const onNewGameFail = () => {
  $('#results').html('')

  const userHTML = `
  <p>Please login in order to create a new game.</p>`

  resultCheck('failure', userHTML)
}

// Move actions
const onMoveSuccess = (responseData, bombCheck) => {
  $('#results').html('')

  winCheck(bombCheck)

  let curPlayer
  let nextPlayer

  if (store.curValue === 'x') {
    curPlayer = store.user.email
    nextPlayer = 'Player 2'
  } else {
    curPlayer = 'Player 2'
    nextPlayer = store.user.email
  }

  let userHTML

  if (store.winner === '') {
    userHTML = `<p>Good move ${curPlayer}! Ready ${nextPlayer}.</p>`
  } else {
    userHTML = winCheck(bombCheck)
    // $('#myModal').modal('show')
  }

  resultCheck('success', userHTML)

  if (store.curValue === 'x') {
    store.curValue = 'o'
  } else store.curValue = 'x'

  store.curGame.cells = responseData.game.cells
}

const onMoveFail = () => {
  $('#results').html('')

  let userHTML

  if (store.winner === '') {
    userHTML = `<p>Invalid move, pick an empty space!</p>`
  } else if (store.winner === 'tie') {
    userHTML = `<p>Invalid move, the game ended in a draw!</p>`
  } else userHTML = `<p>Invalid move, ${store.winner} has already won!</p>`

  resultCheck('failure', userHTML)
}

// Resolve actions (declare winner!)
const onWin = (responseData) => {
  $('#history').html('')

  const gamesCompleted = () => {
    if (responseData.games.length === 0) {
      return 'No games played!'
    }
    return responseData.games.filter((game) => game.over).length
  }

  const userHTML = `
  <p>Total Games: ${responseData.games.length}</p>
  <p>Games Completed: ${gamesCompleted()}</p>`

  $('#history').append(userHTML)
}

module.exports = {
  onSignInSuccess,
  onNewGameSuccess,
  onNewGameFail,
  onMoveSuccess,
  onMoveFail,
  winCheck,
  onWin,
  bombCheck
}
