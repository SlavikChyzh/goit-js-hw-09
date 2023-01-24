import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delayEl = document.getElementById('delay');
const stepEl = document.getElementById('step');
const amountEl = document.getElementById('amount');
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', submit);
function submit(event) {
  event.preventDefault();
  setTimeout(() => {
    createPromises(+amountEl.value, +stepEl.value);
  }, +delayEl.value);
}

function createPromises(position, delay) {
  let i = 0;
  let interval = null;
  const promise = new Promise((resolve, reject) => {
    interval = setInterval(() => {
      const shouldResolve = Math.random() > 0.3;
      i++;
      if (shouldResolve) {
        resolve('success');
      } else {
        reject('error');
      }
      promise
        .then(() => {
          Notify.success(
            `✅ Fulfilled promise ${i} in ${+delayEl.value + (i - 1) * delay}ms`
          );
        })
        .catch(() => {
          Notify.failure(
            `❌ Rejected promise ${i} in ${+delayEl.value + (i - 1) * delay}ms`
          );
        });
      if (i === position) {
        clearInterval(interval);
      }
    }, delay);
  });
}
