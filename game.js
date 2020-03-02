const gameContent = document.getElementById('gameContent');
gameContent.classList.add('wrapper');

gameContent.textContent = '';

const gameState = {
    name: '',
    activeView: 'welcome',
    selectedLetters: '',
}

function stateUpdate(newGameState) {
    Object.assign(gameState, newGameState);
    render();
}

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const phrases = ['test', 'warsawjs', 'paulina'];



function randomPhrase() {
    const phraseIndex = Math.floor(Math.random() * phrases.length);

    return phrases[phraseIndex];
    // return phraseIndex;
}

const welcomeView = () => {
    const header = document.createElement('h1');
    header.classList.add('welcome_view__header', 'header');
    gameContent.appendChild(header);
    header.textContent = 'Welcome to Hangman!';

    const nameInput = document.createElement('input');
    nameInput.placeholder='Enter your name!';
    nameInput.classList.add('welcome_view__name_input');
    gameContent.appendChild(nameInput);

    const playButton = document.createElement('button');
    gameContent.appendChild(playButton);
    playButton.classList.add('button');
    playButton.textContent = 'PLAY GAME!';

    playButton.addEventListener('click', () => {
        stateUpdate({
            activeView: 'play',
            name: nameInput.value,
            selectedLetters: '',
            secretPhrase: randomPhrase(),
        });
        // console.log(gameState.secretPhrase);

    })
}

const playView = () => {
    let counter = 0;
    const hello = document.createElement('h1');
    hello.classList.add('play_view__header','header')
    gameContent.appendChild(hello);
    hello.textContent = `Hi, ${gameState.name}!`;

    const phraseLettersContainer = document.createElement('div');
    phraseLettersContainer.classList.add('play_view__phrase');
    gameContent.appendChild(phraseLettersContainer);
    const phraseLetters = gameState.secretPhrase.split('');
    phraseLetters.forEach(phraseLetter => {
        const phraseLetterSpan = document.createElement('span');
        const phraseLetterVisible = phraseLetter === ' ' || gameState.selectedLetters.includes(phraseLetter);
        // console.log(phraseLetterVisible);
        if (phraseLetterVisible) {
            counter++
            console.log(counter);
        };



        phraseLetterSpan.textContent = phraseLetterVisible ? phraseLetter : '*';
        phraseLettersContainer.appendChild(phraseLetterSpan);

    });
    if (counter === phraseLetters.length) {
        stateUpdate({
            activeView: 'end'
        });
        return
    }

    const lettersContainer = document.createElement('div');
    lettersContainer.classList.add('play_view__letters');
    console.log(lettersContainer.clientWidth);
    for (let i = 0; i < alphabet.length; i++) {
        const letter = alphabet[i];
        const letterButton = document.createElement('button');
        letterButton.classList.add('button', 'letter_button');
        lettersContainer.appendChild(letterButton);
        letterButton.textContent = letter;
        gameContent.appendChild(lettersContainer);
        letterButton.disabled = gameState.selectedLetters.includes(letter);
        // console.log(gameState.selectedLetters.includes(letter));

        letterButton.addEventListener('click', () => {
            console.log(alphabet[i]);
            stateUpdate({
                selectedLetters: gameState.selectedLetters.concat([letter])
            })
        })
    }
    endGameButton = document.createElement('button');
    gameContent.appendChild(endGameButton);
    endGameButton.textContent = 'end game';
    endGameButton.classList.add('button');
    endGameButton.addEventListener('click', () => {
        stateUpdate({
            activeView: 'end'
        });
    })

}

const endView = () => {
    const hello = document.createElement('h1');
    hello.classList.add('end_view__header','header')
    gameContent.appendChild(hello);
    hello.textContent = 'End game';
    const playAgainButton = document.createElement('button');
    gameContent.appendChild(playAgainButton);
    playAgainButton.textContent = 'PLAY AGAIN!';
    playAgainButton.classList.add('button');
    playAgainButton.addEventListener('click', () => {
        stateUpdate({
            activeView: 'welcome'
        });
    })
}

function render() {
    gameContent.textContent = '';
    if (gameState.activeView === 'welcome') welcomeView();
    else if (gameState.activeView == 'play') playView();
    else if (gameState.activeView === 'end') endView();
}

render();