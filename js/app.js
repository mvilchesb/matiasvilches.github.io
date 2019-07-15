const choices = document.querySelectorAll('.choice')
const modal = document.querySelector('.modal')
const score = document.getElementById('score')
const result = document.getElementById('result')
const restart = document.getElementById('restart')

const scoreboard = {
    player: 0,
    computer: 0
}

// Play game
const play = e => {
    restart.style.display = 'inline-block'
    const playerChoise = e.target.id
    const computerChoice = getComputerChoice()
    const winner = getWinner(playerChoise, computerChoice)
    console.log(`Player: ${playerChoise}, Computer: ${computerChoice}, Winner: ${winner}.`)

    showWinner(winner, playerChoise, computerChoice)
}

const getComputerChoice = () => {
    const random = Math.random()

    if (random < 0.34) return 'rock' 
    else if (random <= 0.67) return 'paper' 
    else return 'scissors'
}

// Get game winner
const getWinner = (p, c) => {
    if (p === c) return 'draw'
    else if (p === 'rock') 
        if (c === 'paper') return 'computer'
        else return 'player'
    else if (p === 'paper')
        if (c === 'scissors') return 'computer'
        else return 'player'
    else if (p === 'scissors')
        if (c === 'rock') return 'computer'
        else return 'player'
}

const showWinner = (winner, playerChoise, computerChoice) => {
    if (winner === 'player') {
        scoreboard.player++

        // Show modal result
        result.innerHTML = `
            <h2 class="text-win">Punto para ti</h2>
            <div class="modal-result">
                <i class="fas fa-hand-${playerChoise} fa-6x"></i>
                <i class="fas fa-hand-${computerChoice} fa-6x"></i>
            </div>
            <p>Tú escogiste <strong>${playerChoise}</strong> y tu rival escogió <strong>${computerChoice}</strong></p>
        `
    } else if (winner === 'computer') {
        scoreboard.computer++

        result.innerHTML = `
            <h2 class="text-lose">Punto para tu rival</h2>
            <i class="fas fa-hand-${computerChoice} fa-10x"></i>
            <p>Tú escogiste [x] y tu rival escogió <strong>${computerChoice}</strong></p>
        `
    } else {
        result.innerHTML = `
            <h2>Es un empate</h2>
            <i class="fas fa-hand-${computerChoice} fa-10x"></i>
            <p>Tú escogiste [x] y tu rival escogió <strong>${computerChoice}</strong></p>
        `
    }

    // Show score
    score.innerHTML = `
        <p>Tú: ${scoreboard.player}</p>
        <p>Tu rival: ${scoreboard.computer}</p>
    ` 

    modal.style.display = 'block'
}

const clearModal = e => {
    if (e.target === modal) modal.style.display = 'none'
}

const restartGame = () => {
    scoreboard.player = 0
    scoreboard.computer = 0

    score.innerHTML = `
        <p>Tú: 0</p>
        <p>Tu rival: 0</p>
    `
}

// Event listeners
choices.forEach(choice => choice.addEventListener('click', play))
window.addEventListener('click', clearModal)
restart.addEventListener('click', restartGame)
