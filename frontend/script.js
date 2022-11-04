const gameBoard = document.querySelector('#game-board')
const gameId = document.querySelector('#gameId')
const newGameBtn = document.querySelector('#newGame')
const divResult = document.querySelector('#result')
const audioVictory = new Audio('./asserts/sounds/victory.mp3')
// const audioCheck = new Audio('./asserts/sounds/motuscheck.mp3')
const audioGoodLetter = new Audio('./asserts/sounds/goodLetter.mp3')
const audioWrongPlace = new Audio('./asserts/sounds/wrongPlace.mp3')
const audioWrongLetter = new Audio('./asserts/sounds/wrongLetter.mp3')
const audioLoose = new Audio('./asserts/sounds/loose.mp3')
let wordLength 
let word

newGameBtn.addEventListener('click', handleNewGame)
function handleNewGame(e) {
    lock = false
    divResult.textContent = ''
    rowIndex = 1
    colIndex = 0
    fetch('https://wordle-peach-psi.vercel.app/game/new').then(res => res.json()).then(data => {
        console.log(data)
        gameId.textContent = data.gameId
        wordLength = data.word.length
        word = data.word
        console.log(word);
        gameBoard.innerHTML = `
            <table id='#board-game-table'>
                <tr class='letter-row'>${data.word.split('').map((el, index) => `<td class='letter-box' id='row1col${index+1}'></td>`).join('')}</tr>
                <tr class='letter-row'>${data.word.split('').map((el, index) => `<td class='letter-box' id='row2col${index+1}'></td>`).join('')}</tr>
                <tr class='letter-row'>${data.word.split('').map((el, index) => `<td class='letter-box' id='row3col${index+1}'></td>`).join('')}</tr>
                <tr class='letter-row'>${data.word.split('').map((el, index) => `<td class='letter-box' id='row4col${index+1}'></td>`).join('')}</tr>
                <tr class='letter-row'>${data.word.split('').map((el, index) => `<td class='letter-box' id='row5col${index+1}'></td>`).join('')}</tr>
                <tr class='letter-row'>${data.word.split('').map((el, index) => `<td class='letter-box' id='row6col${index+1}'></td>`).join('')}</tr>
            </table>
        `

    })
}
// Keyboard Inputs
document.addEventListener('keyup', handleKeyboard)
const boardTable = document.querySelector('#game-board')
let rowIndex = 1
let colIndex = 0
let lock = false
function handleKeyboard(e){
    e.preventDefault()
    e.stopPropagation()
    if (lock) return
    lock = true
    if(e.key === 'Backspace') {
        console.log(e)
        document.querySelector(`#row${rowIndex}col${colIndex--}`).textContent = ''
        // colIndex > 0 ? colIndex-- : colIndex = 0
    }
    
    if(e.key === 'Enter' && colIndex !== wordLength) {
        divResult.textContent = 'Not enough letters !'
    }

    if((e.key === 'Enter' && colIndex === wordLength)) {
        rowIndex++
        colIndex = 0
        checkRow(rowIndex-1)
        
    }
    if(e.key !== 'Enter' && e.key !== 'Backspace' && e.key !==' ' && colIndex !== wordLength && /^[A-Za-z]{1}$/.test(e.key)) {
        colIndex < wordLength ? colIndex++ : ''
        document.querySelector(`#row${rowIndex}col${colIndex}`).textContent = e.key.toUpperCase()
        document.querySelector(`#row${rowIndex}col${colIndex}`).classList.toggle('filled-box')
        if(colIndex === wordLength) {
            rowIndex++
            colIndex = 0
            checkRow(rowIndex-1)
        }

    }
    lock = false
}

function checkRow(row) {
    let score = 0
    let checkWord = word
    console.log()
    lock = true
    if([...document.querySelectorAll('.letter-row')[row-1].childNodes].map(letter => letter.textContent).join('') === checkWord){
        audioVictory.play()
    } else {
        // audioCheck.play()
    }
    document.querySelectorAll('.letter-row')[row-1].childNodes.forEach((el, index)=> {
        
        setTimeout(() => {
            console.log(checkWord);
            if (el.textContent.toUpperCase() === checkWord[index].toUpperCase()){
                checkWord = checkWord.replace(el.textContent, '.')
                el.style.backgroundColor = 'green'
                audioGoodLetter.play()
                score++
                console.log(checkWord)
                if (score === wordLength) {
                    divResult.textContent = 'YOU WON!'
                    lock = true
                    return
                }
                
            } else if (checkWord.toUpperCase().includes(el.textContent.toUpperCase())) {
                checkWord = checkWord.replace(el.textContent, '.')
                el.style.backgroundColor = 'yellow'
                audioWrongPlace.play()
            } else {
                el.style.backgroundColor = '#8a8a8a'
                audioWrongLetter.play()
            }
        }, 350*index)
        if (rowIndex === 7) {
            divResult.textContent = 'GAME OVER'
            setTimeout(()=>audioLoose.play(),2000)
        }
    })
    lock = false
}
handleNewGame()