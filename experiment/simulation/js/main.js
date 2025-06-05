const leftBox = document.getElementById('left-box');
const rightBox = document.getElementById('right-box');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const results = document.getElementById('results');
const boxes = [leftBox, rightBox];
let trialCount = 0;
let correctCount = 0;
let trialStart;
const trialTimes = [];

function resetBoxes() {
  boxes.forEach(box => {
    box.classList.remove('active');
    box.innerHTML = '';
  });
}

function displayCue() {
  resetBoxes();
  const randomIndex = Math.floor(Math.random() * boxes.length);
  boxes[randomIndex].classList.add('active');
  document.addEventListener('keydown', handleResponse);
  setTimeout(() => {
    boxes[randomIndex].classList.remove('active');
    displayStar();
  }, 1000);
  trialStart = Date.now();
}

function displayStar() {
  const randomIndex = Math.floor(Math.random() * boxes.length);
  boxes[randomIndex].innerHTML = '★';
}

function handleResponse(event) {
  const responseTime = Date.now() - trialStart;
  const selectedBox = event.key === 'ArrowLeft' ? leftBox : event.key === 'ArrowRight' ? rightBox : null;
  if (selectedBox && selectedBox.innerHTML === '★') {
    correctCount++;
  }
  trialCount++;
  trialTimes.push(responseTime);
  document.removeEventListener('keydown', handleResponse);
  resetBoxes();
  if (trialCount < 10) {
    displayCue();
  } else {
    const averageTime = calculateAverageTime();
    results.innerHTML += `<br>Correct Responses: ${correctCount} out of 10<br>`;
    results.innerHTML += `Average Response Time: ${averageTime}ms`;
    results.innerHTML += `<br>Individual Response Times: ${trialTimes.join(', ')}ms`;
  }
}

function calculateAverageTime() {
  let totalTime = 0;
  for (let i = 0; i < trialTimes.length; i++) {
    totalTime += trialTimes[i];
  }
  return Math.round(totalTime / trialTimes.length);
}

function resetGame() {
  trialCount = 0;
  correctCount = 0;
  results.innerHTML = '';
  resetBoxes();
}

startButton.addEventListener('click', displayCue);
resetButton.addEventListener('click', resetGame);