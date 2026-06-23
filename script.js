const countdowns = document.querySelectorAll("[data-countdown]");

function pad(value) {
  return String(value).padStart(2, "0");
}

function renderCountdown(element) {
  const target = new Date(element.dataset.countdown).getTime();
  const diff = Math.max(0, target - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  const values = {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60
  };

  element.querySelector('[data-unit="days"]').textContent = pad(values.days);
  element.querySelector('[data-unit="hours"]').textContent = pad(values.hours);
  element.querySelector('[data-unit="minutes"]').textContent = pad(values.minutes);
  element.querySelector('[data-unit="seconds"]').textContent = pad(values.seconds);
}

function tick() {
  countdowns.forEach(renderCountdown);
}

tick();
setInterval(tick, 1000);
