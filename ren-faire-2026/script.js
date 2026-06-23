// Countdown target: November 14, 2026 at 10:00 AM America/New_York.
const faireDate = new Date("2026-11-14T10:00:00-05:00").getTime();

const moods = [
  "Polishing the goblet. Emotionally preparing for turkey legs.",
  "The village group chat is sharpening its tiny swords.",
  "Somewhere, a lute is becoming everyone else's problem.",
  "Cloak weather has been requested from the sky department.",
  "The realm is preheating to maximum nonsense."
];

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const diff = Math.max(0, faireDate - Date.now());
  const totalSeconds = Math.floor(diff / 1000);

  document.getElementById("days").textContent = pad(Math.floor(totalSeconds / 86400));
  document.getElementById("hours").textContent = pad(Math.floor((totalSeconds % 86400) / 3600));
  document.getElementById("minutes").textContent = pad(Math.floor((totalSeconds % 3600) / 60));
  document.getElementById("seconds").textContent = pad(totalSeconds % 60);
}

function rotateMood() {
  document.getElementById("mood").textContent = moods[Math.floor(Math.random() * moods.length)];
}

updateCountdown();
rotateMood();
setInterval(updateCountdown, 1000);
setInterval(rotateMood, 10000);
