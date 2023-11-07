import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  dateTime: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
let selectedDate;
let countdownInterval;

flatpickr(refs.dateTime, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    if (selectedDates.getTime() < Date.now()) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
      selectedDate = selectedDates.getTime();
      timerStart();
    }
  },
});

function timerStart() {
  countdownInterval = setInterval(() => {
    const currentData = Date.now();
    const diff = selectedDate - currentData;
    if (diff <= 0) {
      refs.startBtn.disabled = true;
      refs.dateTime.disabled = false;
      clearInterval(countdownInterval);
      convertMs(0);
    } else {
      refs.startBtn.disabled = false;
      refs.dateTime.disabled = true;
      convertMs(diff);
    }
  });
}

function convertMs(time) {
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);

  refs.dataDays.textContent = addLeadingZero(days);
  refs.dataHours.textContent = addLeadingZero(hours);
  refs.dataMinutes.textContent = addLeadingZero(minutes);
  refs.dataSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

refs.startBtn.addEventListener('click', () => {
  if (selectedDate) {
    timerStart();
  }
});
