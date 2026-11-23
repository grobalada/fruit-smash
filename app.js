// CACHED ELEMENTS
const startButtonEl = document.querySelector('#start')
const messageEl = document.querySelector('#message')
const scoreEl = document.querySelector('#score')
const timerEl = document.querySelector('#timer')
const cardEls = document.querySelectorAll('.card')
const livesEl = document.querySelector('#lives')

// VARIABLES
let score = 0
let lives = 3
let canClick = false

const cards = []

cardEls.forEach((card) => {
    cards.push(card.textContent)
})

// EVENT LISTENERS
startButtonEl.addEventListener('click', () => {
    let timeLeft = 3

    canClick = false
    messageEl.textContent = 'Remember the fruits and bombs!'
    timerEl.textContent = timeLeft + 's'
    startButtonEl.disabled = true

    const timer = setInterval(() => {
        timeLeft--
        timerEl.textContent = timeLeft + 's'

        if (timeLeft === 0) {
            clearInterval(timer)

            cardEls.forEach((card) => {
                card.textContent = '?'
            })

            canClick = true
            messageEl.textContent = 'Find the fruits!'
        }
    }, 1000)
})

cardEls.forEach((card, index) => {
    card.addEventListener('click', () => {

        if (!canClick) {
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
            scoreEl.textContent = score
            messageEl.textContent = 'Good job! +1 point'
        }
    })
})
