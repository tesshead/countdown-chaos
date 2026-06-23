// Countdown target: August 7, 2026 at 12:00 PM America/New_York.
const tripDate = new Date("2026-08-07T12:00:00-04:00").getTime();

// Easy edit zone for future nonsense.
const moods = [
  "Already mentally on the beach.",
  "Checking Google Flights again for emotional support.",
  "Productivity has left the chat.",
  "Packing list created way too early.",
  "Out of office message forming in the distance.",
  "Sunscreen? Packed. Financial judgment? Not invited."
];

const prophecies = [
  "This trip was approved by zero financial advisors.",
  "Future us can deal with the consequences.",
  "Somewhere, a beach chair is waiting for us.",
  "The vibes are non-refundable.",
  "We ride at dawn. Or like, after coffee."
];

const statusMessages = [
  "Too early to pack? Spiritually, no.",
  "Group chat monitoring has intensified.",
  "The outfit discourse window is now open.",
  "Pre-trip chaos is stretching in the hallway.",
  "Begin beach goblin transformation.",
  "This is not a drill. Hydrate and overreact.",
  "IT IS GIRLS TRIP O'CLOCK. BE NORMAL? IMPOSSIBLE."
];

const beachAlerts = [
  "BEACH ALERT * SPF HAS ENTERED THE CHAT * FINANCIAL JUDGMENT NOT INVITED *",
  "BEACH ALERT * EMOTIONAL SUPPORT SUNGLASSES ARE NOW MANDATORY *",
  "BEACH ALERT * GROUP CHAT TEMPERATURE RISING * HYDRATION ALLEGEDLY PLANNED *",
  "BEACH ALERT * OOO MESSAGE FORMING OFFSHORE *",
  "BEACH ALERT * A BEACH CHAIR HAS REQUESTED OUR PRESENCE *",
  "BEACH ALERT * PACKING LIST OPENED WAY TOO EARLY *",
  "BEACH ALERT * SNACK LOGISTICS HAVE ENTERED THEIR FINAL FORM *",
  "BEACH ALERT * CABANA DELUSIONS APPROACHING CRUISING ALTITUDE *",
  "BEACH ALERT * THE VIBES ARE NON-REFUNDABLE *",
  "BEACH ALERT * SOMEONE IS ABOUT TO ASK WHAT ARE WE WEARING *"
];

const moodEl = document.getElementById("mood");
const prophecyEl = document.getElementById("prophecy");
const beachAlertEl = document.getElementById("beach-alert");
const emergencyMessage = document.getElementById("emergency-message");
const fireworks = document.getElementById("fireworks");
const beachButton = document.getElementById("beach-button");
const surfFlag = document.getElementById("surf-flag");
const surfStatus = document.getElementById("surf-status");
const surfDetail = document.getElementById("surf-detail");

function pad(value) {
  return String(value).padStart(2, "0");
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function rotateCopy() {
  moodEl.textContent = randomItem(moods);
  prophecyEl.textContent = randomItem(prophecies);
}

function rotateBeachAlert() {
  beachAlertEl.textContent = randomItem(beachAlerts);
}

function updateCountdown() {
  const diff = tripDate - Date.now();
  const safeDiff = Math.max(0, diff);
  const totalSeconds = Math.floor(safeDiff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById("days").textContent = pad(days);
  document.getElementById("hours").textContent = pad(hours);
  document.getElementById("minutes").textContent = pad(minutes);
  document.getElementById("seconds").textContent = pad(seconds);

  let index = 0;
  if (days <= 60) index = 1;
  if (days <= 45) index = 2;
  if (days <= 30) index = 3;
  if (days <= 14) index = 4;
  if (days <= 7) index = 5;
  if (diff <= 0) index = 6;
  document.getElementById("status").textContent = statusMessages[index];

  const hype = calculateHype(days, diff);
  document.getElementById("hype-fill").style.width = `${hype}%`;
  document.getElementById("hype-percent").textContent = `${hype}%`;
}

function calculateHype(daysUntilTrip, millisecondsUntilTrip) {
  if (millisecondsUntilTrip <= 0) return 100;
  if (daysUntilTrip > 90) return 10;
  if (daysUntilTrip > 60) return 25;
  if (daysUntilTrip > 30) return 55;
  if (daysUntilTrip > 14) return 78;
  if (daysUntilTrip > 7) return 90;
  return 98;
}

function parseMaxWind(windSpeed = "") {
  const speeds = windSpeed.match(/\d+/g);
  if (!speeds) return 0;
  return Math.max(...speeds.map(Number));
}

function setSurfFlag(flag, status, detail) {
  surfFlag.className = `surf-flag surf-flag--${flag}`;
  surfStatus.textContent = status;
  surfDetail.textContent = detail;
}

function getSurfReportFromForecast(period) {
  const forecast = `${period.shortForecast || ""} ${period.detailedForecast || ""}`.toLowerCase();
  const wind = parseMaxWind(period.windSpeed);

  if (forecast.includes("thunder") || forecast.includes("storm")) {
    return {
      flag: "red",
      status: "Red flag energy",
      detail: `${period.temperature}°F, ${period.windSpeed}. Storm drama detected by Weather.gov.`
    };
  }

  if (forecast.includes("rain") || forecast.includes("shower") || wind >= 18) {
    return {
      flag: "yellow",
      status: "Yellow flag antics",
      detail: `${period.temperature}°F, ${period.windSpeed}. Cute, but maybe secure the hat.`
    };
  }

  if ((forecast.includes("sunny") || forecast.includes("clear")) && wind < 12) {
    return {
      flag: "green",
      status: "Green flag for beach goblins",
      detail: `${period.temperature}°F, ${period.windSpeed}. Weather.gov says the Gulf is being reasonably cooperative.`
    };
  }

  return {
    flag: "yellow",
    status: "Proceed with SPF and suspicion",
    detail: `${period.temperature}°F, ${period.windSpeed}. Forecast says: ${period.shortForecast}.`
  };
}

function setFallbackSurfReport() {
  const fallbackReports = [
    ["green", "Green flag for delusion", "Weather.gov did not answer, so the unofficial department says: emotionally beachable."],
    ["yellow", "Yellow flag for hat security", "Weather.gov did not answer. Hold onto your drink umbrella and proceed dramatically."],
    ["purple", "Purple flag for mystery nonsense", "Weather.gov did not answer. Possible jellyfish? Possible vibes? Who can say."],
    ["red", "Red flag for inbox exposure", "Weather.gov did not answer. Main hazard: still being expected to respond to emails."]
  ];
  setSurfFlag(...randomItem(fallbackReports));
}

async function loadDestinSurfVibe() {
  try {
    const pointsResponse = await fetch("https://api.weather.gov/points/30.3935,-86.4958");
    if (!pointsResponse.ok) throw new Error("Weather point lookup failed");
    const points = await pointsResponse.json();
    const forecastResponse = await fetch(points.properties.forecast);
    if (!forecastResponse.ok) throw new Error("Forecast lookup failed");
    const forecast = await forecastResponse.json();
    const currentPeriod = forecast.properties.periods[0];
    const report = getSurfReportFromForecast(currentPeriod);
    setSurfFlag(report.flag, report.status, report.detail);
  } catch (error) {
    setFallbackSurfReport();
  }
}

function playBeachSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const context = new AudioContext();
  const master = context.createGain();
  master.gain.setValueAtTime(0.0001, context.currentTime);
  master.gain.exponentialRampToValueAtTime(0.34, context.currentTime + 0.12);
  master.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 2.35);
  master.connect(context.destination);

  const noiseLength = Math.floor(context.sampleRate * 2.4);
  const noiseBuffer = context.createBuffer(1, noiseLength, context.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < noiseLength; i += 1) {
    const fadeIn = Math.min(1, i / (context.sampleRate * .45));
    const fadeOut = Math.min(1, (noiseLength - i) / (context.sampleRate * .7));
    data[i] = (Math.random() * 2 - 1) * fadeIn * fadeOut;
  }

  const surf = context.createBufferSource();
  const surfLowpass = context.createBiquadFilter();
  const surfHighpass = context.createBiquadFilter();
  const surfGain = context.createGain();
  surf.buffer = noiseBuffer;
  surfLowpass.type = "lowpass";
  surfLowpass.frequency.value = 920;
  surfHighpass.type = "highpass";
  surfHighpass.frequency.value = 120;
  surfGain.gain.setValueAtTime(0.0001, context.currentTime);
  surfGain.gain.exponentialRampToValueAtTime(0.42, context.currentTime + .45);
  surfGain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 2.35);
  surf.connect(surfLowpass).connect(surfHighpass).connect(surfGain).connect(master);
  surf.start();
  surf.stop(context.currentTime + 2.45);

  [0.32, 0.62].forEach((offset, index) => {
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(index ? 980 : 860, context.currentTime + offset);
    osc.frequency.exponentialRampToValueAtTime(index ? 1380 : 1260, context.currentTime + offset + .11);
    osc.frequency.exponentialRampToValueAtTime(index ? 740 : 680, context.currentTime + offset + .32);
    gain.gain.setValueAtTime(.0001, context.currentTime + offset);
    gain.gain.exponentialRampToValueAtTime(.12, context.currentTime + offset + .06);
    gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + offset + .42);
    osc.connect(gain).connect(master);
    osc.start(context.currentTime + offset);
    osc.stop(context.currentTime + offset + .45);
  });
}

function launchFireworks(count = 26) {
  for (let i = 0; i < count; i += 1) {
    const burst = document.createElement("span");
    burst.className = "burst";
    burst.style.left = `${Math.random() * 100}%`;
    burst.style.top = `${Math.random() * 100}%`;
    burst.style.background = randomItem(["#fff04f", "#ff2d95", "#22d3ee", "#65ff73", "#ffffff"]);
    fireworks.appendChild(burst);
    window.setTimeout(() => burst.remove(), 850);
  }
}

function declareBeachEmergency() {
  playBeachSound();
  launchFireworks();
  document.body.classList.remove("shake");
  void document.body.offsetWidth;
  document.body.classList.add("shake");
  emergencyMessage.textContent = "BEACH EMERGENCY DECLARED";
  window.setTimeout(() => {
    emergencyMessage.textContent = "";
    document.body.classList.remove("shake");
  }, 2600);
}

rotateCopy();
rotateBeachAlert();
loadDestinSurfVibe();
updateCountdown();
setInterval(updateCountdown, 1000);
setInterval(rotateCopy, 10000);
setInterval(rotateBeachAlert, 7000);

beachButton.addEventListener("click", declareBeachEmergency);
document.addEventListener("click", (event) => {
  if (event.target === beachButton) return;
  if (Math.random() > .55) launchFireworks(6);
});
