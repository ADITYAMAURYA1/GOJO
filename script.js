let totalQuestions = 0;
let currentQuestion = 0;
let correctAnswers = 0;

function startTest() {
    totalQuestions = parseInt(prompt("Enter the number of questions:"), 10);
    if (isNaN(totalQuestions) || totalQuestions <= 0) {
        alert("Please enter a valid number of questions.");
        return;
    }

    currentQuestion = 0;
    correctAnswers = 0;

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
    }
}

function generateRandomLetter() {
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomLetter = letters[Math.floor(Math.random() * letters.length)];
    document.getElementById('display').innerText = randomLetter;
}

function endTest() {
    document.getElementById('start-btn').style.display = 'block';
    document.getElementById('display').style.display = 'none';
    document.getElementById('result').style.display = 'none';
    document.querySelector('.button-grid').style.display = 'none';

    let testResult = document.getElementById('test-result');
    testResult.innerText = `Test complete! You got ${correctAnswers} out of ${totalQuestions} correct.`;
    testResult.style.display = 'block';
}