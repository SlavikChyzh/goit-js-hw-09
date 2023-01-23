const body = document.querySelector('body');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');

let timerId = null;
startBtn.disabled = false;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', () => {
  if (startBtn.disabled === false) {
    timerId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startBtn.disabled = true;
  }
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.disabled = false;
});
