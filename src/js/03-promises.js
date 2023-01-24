import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delay = document.getElementById('delay');
const step = document.getElementById('step');
const amount = document.getElementById('amount');
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', submit);

function submit(event) {
  event.preventDefault();
  let dell = +delay.value;
  for (let i = 1; i <= +amount.value; i++) {
    createPromise(i, dell)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    dell += +step.value;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
