let countdown;
const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const timerAdds = document.querySelectorAll('[data-time]')

function timer(seconds) {
  // call this to clear any previous countdowns
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds)
  displayTimeEnd(then)

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000)

    if (secondsLeft < 0) {
      clearInterval(countdown)
      return
    }
    displayTimeLeft(secondsLeft)
  }, 1000)

  function displayTimeLeft(seconds) {
    const hours = Math.floor(seconds / 3600)
    const remainder = seconds % 3600
    const minutes = Math.floor(remainder / 60)
    const secondsLeft = seconds % 60

    const display = `${hours > 0 ? hours + ':' : ''}${minutes < 10 ? '0' : ''}${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`
    document.title = display
    timerDisplay.textContent = display
  }

  function displayTimeEnd(timestamp) {
    const end = new Date(timestamp)
    const hours = end.getHours()
    const minutes = end.getMinutes()
    const display = `Be back at ${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    endTime.textContent = display
  }
}

function timerStart() {
  const seconds = parseInt(this.dataset.time)
  timer(seconds)
}

timerAdds.forEach(timerAdd => timerAdd.addEventListener('click', timerStart))
document.customForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const mins = this.minutes.value
  if (isNaN(mins)) {
    alert(`${mins} is not a number.`)
  } else {
    timer(parseInt(mins) * 60)
  }
  this.reset()
})
