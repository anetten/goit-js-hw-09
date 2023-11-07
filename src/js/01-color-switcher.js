const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeBackgroundColor() {
  const randomColor = getRandomHexColor();
  document.body.style.backgroundColor = randomColor;
}
let timerId;

startBtn.addEventListener('click', () => {
  if (!timerId) {
    timerId = setInterval(() => {
      changeBackgroundColor();
    }, 1000);
    startBtn.disabled = true;
  }
});

function stopChangingBackgroundColor() {
  clearInterval(timerId);
  timerId = null;
  startBtn.disabled = false;
}

stopBtn.addEventListener('click', stopChangingBackgroundColor);
