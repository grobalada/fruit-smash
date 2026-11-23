// CACHED ELEMENTS
const startButtonEl = document.querySelector('#start')
const messageEl = document.querySelector('#message')
const scoreEl = document.querySelector('#score')
const timerEl = document.querySelector('#timer')
const cardEls = document.querySelectorAll('.card')
const livesEl = document.querySelector('#lives')
const roundEl = document.querySelector('#round')
const resetButtonEl = document.querySelector('#reset')

// VARIABLES
let score = 0
let lives = 3
let round = 1
let fruitsFound = 0
let canClick = false
let timeLeft = 3
let timer

const cards = []

cardEls.forEach((card) => {
    cards.push(card.textContent)
})

// FUNCTION
function shuffle(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

function startRound() {

    canClick = false
    fruitsFound = 0
    timeLeft = 3

    shuffle(cards)

    cardEls.forEach((card, index) => {
        card.textContent = cards[index]
        card.classList.remove('clicked')
    })

    roundEl.textContent = round + '/30'
    timerEl.textContent = `${timeLeft}s`
    messageEl.textContent = 'Remember the fruits and bombs!'

    timer = setInterval(() => {

        timeLeft--
        timerEl.textContent = `${timeLeft}s`

        if (timeLeft === 0) {

            clearInterval(timer)

            cardEls.forEach((card) => {
                card.textContent = '?'
            })

            canClick = true
            messageEl.textContent = 'Find the fruits!'
        }

    }, 1000)
}

startButtonEl.addEventListener('click', () => {

    score = 0
    lives = 3
    round = 1

    scoreEl.textContent = score
    livesEl.textContent = lives

    startButtonEl.disabled = true

    startRound()
})

cardEls.forEach((card, index) => {

    card.addEventListener('click', () => {

        if (canClick === false) {
            return
        }

        if (card.classList.contains('clicked')) {
            return
        }

        card.textContent = cards[index]
        card.classList.add('clicked')

        if (cards[index] === '💣') {

            lives--
            livesEl.textContent = lives

            if (lives === 0) {

                canClick = false
                messageEl.textContent = 'Game Over!'

            } else {

                messageEl.textContent = 'You lost one life!'
            }
        } else {
            score++
            fruitsFound++

            scoreEl.textContent = score
            messageEl.textContent = 'Good job! +1 point'


            if (fruitsFound === 6) {

                canClick = false

                if (round === 30) {

                    messageEl.textContent = 'You Win!'

                } else {

                    round++

                    startRound()
                }
            }
        }
    })
})

resetButtonEl.addEventListener('click', () => {

    clearInterval(timer)

    score = 0
    lives = 3
    round = 1
    fruitsFound = 0
    canClick = false
    timeLeft = 3

    scoreEl.textContent = score
    livesEl.textContent = lives
    roundEl.textContent = round + '/30'
    timerEl.textContent = `${timeLeft}s`

    startButtonEl.disabled = false
    messageEl.textContent = 'Click Start Game to play!'

    cardEls.forEach((card, index) => {
        card.textContent = cards[index]
        card.classList.remove('clicked')
    })
})