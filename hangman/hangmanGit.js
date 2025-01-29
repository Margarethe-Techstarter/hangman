const words = ['html', 'css', 'javascript', 'nodejs', 'api', 'server', 'datenbank', 'framework', 'ajax', 'json'];
let word = words[Math.floor(Math.random() * words.length)];

let hiddenWord = '_'.repeat(word.length);
let fehlversuche = 10;
let errateneBuchs = [];

function drawHangman() {
    const hangmanStages = [
        `---`, // 10 Versuche übrig
        `|    \n|    \n|\n|\n|\n---`, // 9 Versuche übrig
        `------\n|    \n|    \n|    \n|\n|\n---`, // 8 Versuche übrig
        `------\n|    |\n|    \n|    \n|\n|\n---`, // 7 Versuche übrig
        `------\n|    |\n|    O\n|    \n|\n|\n---`, // 6 Versuche übrig
        `------\n|    |\n|    O\n|    |\n|\n|\n---`, // 5 Versuche übrig
        `------\n|    |\n|    O\n|   /|\n|\n|\n---`, // 4 Versuche übrig
        `------\n|    |\n|    O\n|   /|\\\n|\n|\n---`, // 3 Versuche übrig
        `------\n|    |\n|    O\n|   /|\\\n|   /\n|\n---`, // 2 Versuche übrig
        `------\n|    |\n|    O\n|   /|\\\n|   / \\\n|   DEAD\n---`, // 1 Versuch übrig
    ];

    const hangmanMann = document.getElementById('hangman');
    hangmanMann.innerHTML = `${hangmanStages[10 - fehlversuche]}`;
}


function showStatus() {
    document.getElementById('hidden-word').textContent = hiddenWord.split('').join(' ');
    document.getElementById('attempts').textContent = `Versuche: ${fehlversuche}`;
    document.getElementById('guessed-letters').textContent = `Erratene Buchstaben: ${errateneBuchs.join(', ')}`;
    drawHangman();
}

function errateneBuchstabe(buchstabe) {
    if (errateneBuchs.includes(buchstabe)) {
        return;
    }

    errateneBuchs.push(buchstabe);

    if (word.includes(buchstabe)) {
        hiddenWord = word.split('').map((ch, i) => ch === buchstabe ? buchstabe : hiddenWord[i]).join('');
    } else {
        fehlversuche--;
    }
}

function checkGameOver() {
    if (hiddenWord === word) {
        alert('Glückwunsch! Du hast das Wort erraten: ' + word);
        clearGame();
    } else if (fehlversuche <= 0) {
        alert('Du hast verloren! Das Wort war: ' + word);
        clearGame();
    } else {
        showStatus();
    }
}

function guessLetter() {
    const letterInput = document.getElementById('letter-input');
    const buchstabe = letterInput.value.toLowerCase();

    if (/^[a-zA-Z]$/.test(buchstabe)) {
        errateneBuchstabe(buchstabe.toLowerCase());
        checkGameOver();
        letterInput.value = '';
    } else {
        alert('Ungültiger Buchstabe, bitte versuche es erneut!');
    }
}



function clearGame() {
    hiddenWord = '_'.repeat(word.length);
    fehlversuche = 10;
    errateneBuchs = [];
    word = words[Math.floor(Math.random() * words.length)];
    showStatus();
}


showStatus();

document.getElementById('letter-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        guessLetter();
    }
});