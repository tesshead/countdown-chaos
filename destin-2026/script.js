// Change these three things and you’re basically done.
const trip = {
  title: "Girls Trip Countdown",
  // Use the destination's timezone offset if you care about exact arrival day.
  // This default is Aug 7, 2026 at 10:00 AM Eastern.
  date: "2026-08-07T10:00:00-04:00",
  tagline: "Hydration optional. Dramatic beach entrance mandatory."
};

const prophecies = [
  "Someone will say they’re packing light. That person is lying.",
  "A group chat outfit spiral is imminent.",
  "The vibes department has approved this vacation unanimously.",
  "A tiny airport coffee will cost too much and still feel necessary.",
  "At least one beverage will be described as ‘so vacation-coded.’",
  "Someone will announce they need a hat, then buy the most dramatic hat available.",
  "We are entering our SPF, snacks, and emotional support sunglasses era.",
  "The beach is not ready for this level of nonsense."
];

const statusMessages = [
  "Too early to pack? Spiritually, no.",
  "Time to start making vague outfit plans.",
  "The group chat should now become mildly unhinged.",
  "Pre-trip chaos window: officially open.",
  "This is not a drill. Begin beach goblin transformation.",
  "Pack the sunscreen. Pack the drama. Pack the snacks.",
  "IMMINENT VACATION BEHAVIOR DETECTED."
];

const target = new Date(trip.date).getTime();
document.getElementById("trip-title").textContent = trip.title;
document.getElementById("tagline").textContent = trip.tagline;
document.getElementById("prophecy").textContent = prophecies[new Date().getDate() % prophecies.length];

function pad(n) {
  return String(n).padStart(2, "0");
}

function updateCountdown() {
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    document.getElementById("status").textContent = "IT IS GIRLS TRIP O’CLOCK. BE NORMAL? IMPOSSIBLE.";
    document.getElementById("hype-label").textContent = "MAXIMUM CHAOS";
    document.getElementById("hype-fill").style.width = "100%";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById("days").textContent = pad(days);
  document.getElementById("hours").textContent = pad(hours);
  document.getElementById("minutes").textContent = pad(minutes);
  document.getElementById("seconds").textContent = pad(seconds);

  let index = 0;
  if (days <= 45) index = 1;
  if (days <= 30) index = 2;
  if (days <= 14) index = 3;
  if (days <= 7) index = 4;
  if (days <= 3) index = 5;
  if (days <= 1) index = 6;

  document.getElementById("status").textContent = statusMessages[index];

  const startingWindowDays = 90;
  const hype = Math.max(10, Math.min(100, 100 - (days / startingWindowDays) * 90));
  document.getElementById("hype-fill").style.width = `${hype}%`;
}

updateCountdown();
setInterval(updateCountdown, 1000);
