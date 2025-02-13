const words = ['html', 'css', 'javascript', 'nodejs', 'api', 'server', 'datenbank', 'framework', 'ajax', 'json'];
let word = words[Math.floor(Math.random() * words.length)];

let hiddenWord = '_'.repeat(word.length);
let fehlversuche = 10;
let errateneBuchs = [];

// function drawHangman() { // funktionierende version
//     const hangmanStages = [
//         `---`, // 10 Versuche übrig
//         `|    \n|    \n|\n|\n|\n---`, // 9 Versuche übrig
//         `------\n|    \n|    \n|    \n|\n|\n---`, // 8 Versuche übrig
//         `------\n|    |\n|    \n|    \n|\n|\n---`, // 7 Versuche übrig
//         `------\n|    |\n|    O\n|    \n|\n|\n---`, // 6 Versuche übrig
//         `------\n|    |\n|    O\n|    |\n|\n|\n---`, // 5 Versuche übrig
//         `------\n|    |\n|    O\n|   /|\n|\n|\n---`, // 4 Versuche übrig
//         `------\n|    |\n|    O\n|   /|\\\n|\n|\n---`, // 3 Versuche übrig
//         `------\n|    |\n|    O\n|   /|\\\n|   /\n|\n---`, // 2 Versuche übrig
//         `------\n|    |\n|    O\n|   /|\\\n|   / \\\n|   DEAD\n---`, // 1 Versuch übrig
//     ];

//     const hangmanMann = document.getElementById('hangman');
//     hangmanMann.innerHTML = `${hangmanStages[10 - fehlversuche]}`;
// }

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

// Erstellen eines eigenen Wortes
function generateCustomWord() {
    const customWordInput = document.getElementById('custom-word-input');
    customWordInput.style.display = 'block'; // Eingabefeld sichtbar machen
    // customWordInput.focus();
    document.getElementById('theme-area').textContent = 'Gib ein eigenes Wort ein!';
}

// Setzen des eigenen Wortes
function setCustomWord() {
    const customWordInput = document.getElementById('custom-word-input');
    const customWord = customWordInput.value.trim().toLowerCase();

    if (customWord && /^[a-zA-Z]+$/.test(customWord)) {
        word = customWord;
        hiddenWord = '_'.repeat(word.length);
        fehlversuche = 10;
        errateneBuchs = [];
        document.getElementById('theme-area').textContent = 'Rate ein eigenes Wort!';
        showStatus();
        customWordInput.value = ''; // Eingabefeld zurücksetzen
        customWordInput.style.display = 'none'; // Eingabefeld wieder ausblenden
    } else {
        alert('Bitte gib ein gültiges Wort ein!');
    }
}

// EventListener für das Verlassen des Eingabefelds (blur)
document.getElementById('custom-word-input').addEventListener('blur', setCustomWord);

showStatus();

document.getElementById('letter-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        guessLetter();
    }
});
