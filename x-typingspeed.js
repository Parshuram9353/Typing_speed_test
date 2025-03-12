const startScreen = document.getElementById('start-screen');
const testScreen = document.getElementById('test-screen');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-button');
const timerDisplay = document.getElementById('timer');
const sampleText = document.getElementById('sample-text');
const inputBox = document.getElementById('input-box');
const wpmResult = document.getElementById('wpm-result');
const accuracyResult = document.getElementById('accuracy-result');
const restartButton = document.getElementById('restart-button');

const textSamples = [
    "The quick brown fox jumps over the lazy dog and starts running.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be that is the question whatever you do do it well.",
    "She sells seashells by the seashore under the seahore over the seahore.",
    "How much wood would a woodchuck chuck if a woodchuck could chuck wood.",
    "The rain in Spain stays mainly in the plain and spain has good food.",
    "All that glitters is not gold that is just a pice of shit.",
    "When the going gets tough the tough get going then the going begins.",
    "A stitch in time saves nine and i did not do the home work.",
    "Life is what happens when you're busy making other plans."
];

let timeLeft = 60;
let timer;
let currentText;
let typedText = '';
let testActive = false;

startButton.addEventListener('click', startTest);
restartButton.addEventListener('click', resetTest);
inputBox.addEventListener('input', updateTyping);

function startTest() {
    startScreen.classList.add('hidden');
    testScreen.classList.remove('hidden');
    currentText = textSamples[Math.floor(Math.random() * textSamples.length)];
    // Extend the text by appending more samples with newline characters
    for (let i = 0; i < 2; i++) {
        currentText += '\n' + textSamples[Math.floor(Math.random() * textSamples.length)];
    }
    sampleText.innerHTML = currentText.split('').map(char => `<span>${char}</span>`).join('');
    inputBox.value = '';
    inputBox.focus();
    timeLeft = 60;
    timerDisplay.textContent = timeLeft;
    testActive = true;
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timer);
        endTest();
    }
}

function updateTyping() {
    if (!testActive) return;
    typedText = inputBox.value;
    const sampleChars = sampleText.querySelectorAll('span');
    const typedChars = typedText.split('');

    sampleChars.forEach((span, index) => {
        span.classList.remove('correct', 'incorrect');
        if (index < typedChars.length) {
            if (typedChars[index] === currentText[index]) {
                span.classList.add('correct');
            } else {
                span.classList.add('incorrect');
            }
        }
    });
}

function endTest() {
    testActive = false;
    testScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    const wordsTyped = typedText.trim().split(/\s+/).length;
    const wpm = Math.round((wordsTyped / 60) * 60); // Words per minute
    const correctChars = typedText.split('').filter((char, i) => char === currentText[i]).length;
    const accuracy = currentText.length > 0 ? Math.round((correctChars / currentText.length) * 100) : 0;

    wpmResult.textContent = `Words Per Minute (WPM): ${wpm}`;
    accuracyResult.textContent = `Accuracy: ${accuracy}%`;
}

function resetTest() {
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    // Clear the input box and sample text
    inputBox.value = '';
    sampleText.innerHTML = '';
}