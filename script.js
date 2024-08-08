let totalQuestions = 0;
let currentQuestion = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let usedLetters = [];

function showModal() {
    document.getElementById('question-modal').style.display = 'flex';
}

function startTest() {
    totalQuestions = parseInt(document.getElementById('question-input').value, 10);
    if (isNaN(totalQuestions) || totalQuestions <= 0 || totalQuestions > 500) {
        alert("Please enter a valid number of questions.");
        return;
    }

    currentQuestion = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    usedLetters = [];

    document.getElementById('question-modal').style.display = 'none';
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('display').style.display = 'block';
    document.getElementById('result').style.display = 'block';
    document.querySelector('.button-grid').style.display = 'grid';
    document.getElementById('test-result').style.display = 'none';

    generateRandomLetter();
}

function buttonClick(num) {
    let resultField = document.getElementById('result');
    resultField.value += num;
    checkAnswer();
}

function clearResult() {
    document.getElementById('result').value = '';
    document.getElementById('result').style.borderColor = '#ccc';
}

function checkAnswer() {
    let resultField = document.getElementById('result');
    let letter = document.getElementById('display').innerText;
    let correctAnswer = letter.charCodeAt(0) - 64;
    if (resultField.value == correctAnswer) {
        correctAnswers++;
        currentQuestion++;
        resultField.value = '';
        resultField.style.borderColor = '#ccc';
        if (currentQuestion < totalQuestions) {
            generateRandomLetter();
        } else {
            endTest();
        }
    } else if (resultField.value.length >= correctAnswer.toString().length) {
        resultField.value = '';
        resultField.style.borderColor = 'red';
        incorrectAnswers++;
    }
}

function generateRandomLetter() {
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomLetter = '';
    if (totalQuestions <= 26) {
        do {
            randomLetter = letters[Math.floor(Math.random() * letters.length)];
        } while (usedLetters.includes(randomLetter));
        usedLetters.push(randomLetter);
    } else {
        randomLetter = letters[Math.floor(Math.random() * letters.length)];
    }
    document.getElementById('display').innerText = randomLetter;
}

function endTest() {
    document.getElementById('start-btn').style.display = 'block';
    document.getElementById('display').style.display = 'none';
    document.getElementById('result').style.display = 'none';
    document.querySelector('.button-grid').style.display = 'none';

    let testResult = document.getElementById('test-result');
    testResult.innerText = `Test complete! You got ${correctAnswers-incorrectAnswers} correct and ${incorrectAnswers} incorrect out of ${totalQuestions} questions.`;
    testResult.style.display = 'block';
}
