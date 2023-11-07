import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const delay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  function createPromise(position, currentDelay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({ position, delay: currentDelay });
        } else {
          reject({ position, delay: currentDelay });
        }
      }, currentDelay);
    });
  }

  for (i = 1; i <= amount; i++) {
    createPromise(i, delay + step * (i - 1))
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});
