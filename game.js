const gameContent = document.getElementById('gameContent');

console.log('game script loaded');
console.log(gameContent);

gameContent.textContent = '';

const header = document.createElement('h1');
gameContent.appendChild(header);
header.textContent = 'Welcome to Hangman!';

const nameInputLabel = document.createElement('div');
gameContent.appendChild(nameInputLabel);
nameInputLabel.textContent = 'Enter your name!'

const nameInput = document.createElement('input');
gameContent.appendChild(nameInput);

nameInput.addEventListener('input', (e) => {
    console.log(nameInput.value);
    // console.log(e.target.value);
})