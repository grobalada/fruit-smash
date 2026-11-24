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
let timeLeft = 1.5
let timer
let nextRoundTimer


// FUNCTIONS
function shuffle(cards) {

    for (let i = cards.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1))

        const temp = cards[i]

        cards[i] = cards[j]
        cards[j] = temp
    }

    return cards
}

function startRound() {

    canClick = false
    fruitsFound = 0

    if (round <= 5) {

        timeLeft = 1.5

    } else if (round <= 10) {

        timeLeft = 1

    } else {

        timeLeft = 0.5
    }

    shuffle(cards)

    cardEls.forEach((card, index) => {

        card.textContent = cards[index]
        card.classList.remove('clicked')
    })

    roundEl.textContent = `${round}/15`
    timerEl.textContent = `${timeLeft}s`
    messageEl.textContent = 'Remember the fruits and bombs!'

    timer = setTimeout(() => {

        cardEls.forEach((card) => {
            card.textContent = '?'
        })

        timerEl.textContent = '0s'
        canClick = true
        messageEl.textContent = 'Find the fruits!'

    }, timeLeft * 1000)
}

// EVENT LISTENERS
startButtonEl.addEventListener('click', () => {

    score = 0
    lives = 3
    round = 1
    fruitsFound = 0

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
                messageEl.textContent = `Game Over! Final Score: ${score}`

            } else {

                messageEl.textContent = 'You lost one life!'
            }

        } else {

            score++
            fruitsFound++

            scoreEl.textContent = score
            messageEl.textContent = 'Good job! +1 point'


            if (fruitsFound === 10) {

                canClick = false

                if (round === 15) {

                    messageEl.textContent = `You Win! Final Score: ${score}`

                } else {

                    messageEl.textContent = `Round ${round} Completed!`

                    nextRoundTimer = setTimeout(() => {

                        round++
                        startRound()

                    }, 1000)
                }
            }
        }
    })
})

resetButtonEl.addEventListener('click', () => {

    clearTimeout(timer)
    clearTimeout(nextRoundTimer)

    score = 0
    lives = 3
    round = 1
    fruitsFound = 0
    canClick = false
    timeLeft = 1.5

    scoreEl.textContent = score
    livesEl.textContent = lives
    roundEl.textContent = `${round}/15`
    timerEl.textContent = `${timeLeft}s`

    startButtonEl.disabled = false

    messageEl.textContent = 'Click Start Game to play!'

    cardEls.forEach((card) => {

        card.textContent = ''
        card.classList.remove('clicked')
    })
})