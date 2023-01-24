import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const startBtn = document.getElementById('startBtn');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

let timeData = null;
startBtn.disabled = true;

const options = {
  dateFormat: 'Y-m-d H:i',
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < new Date().getTime()) {
      //    window.alert('Please choose a date in the future');
      Report.failure(
        'Timer error',
        '"Please choose a date in the future"',
        'Okay'
      );
    } else {
      timeData = selectedDates[0];
      startBtn.disabled = false;
    }
    console.log(timeData);
  },
};

const timerDataInput = new flatpickr('input#datetime-picker', options);
console.log(timeData);

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  let timerId = setInterval(() => {
    let time = timeData.getTime() - new Date().getTime();
    if (time < 1000) {
      Report.success('Hooray', 'Timer is over."', 'Okay');
      clearInterval(timerId);
    }
    displayTimer(time);
  }, 1000);
});

function displayTimer(time) {
  const timerTime = convertMs(time);
  daysEl.textContent = `${timerTime.days}`;
  hoursEl.textContent = `${timerTime.hours}`;
  minutesEl.textContent = `${timerTime.minutes}`;
  secondsEl.textContent = `${timerTime.seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
