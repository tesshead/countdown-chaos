// Countdown target: November 14, 2026 at 10:00 AM America/New_York.
const faireDate = new Date("2026-11-14T10:00:00-05:00").getTime();

const decrees = [
  "HEAR YE * TURKEY LEG CONDITIONS RISING * CLOAK WEATHER REQUESTED * THE REALM IS NOT READY *",
  "ROYAL DECREE * GOBLET HYDRATION ADVISED * BARD EXPOSURE POSSIBLE *",
  "HEAR YE * COMFORTABLE SHOES HAVE BEEN SUMMONED * DRAMA CLOAKS OPTIONAL *",
  "VILLAGE ALERT * LUTE ENERGY DETECTED * HUZZAHS MAY BECOME FREQUENT *",
  "ROYAL DECREE * THE FALL FAIRE APPROACHES * PREPARE THY SNACK COIN PURSE *"
];

const rumors = [
  "A bard has been spotted near the snack line.",
  "The turkey legs know what you did.",
  "A mysterious goblin has requested exact change.",
  "The village council recommends comfortable shoes.",
  "Someone's cloak is about to become their whole personality.",
  "A tavern wench has allegedly approved the vibes.",
  "The realm reports a 90% chance of saying huzzah too much.",
  "A lute is becoming everyone else's problem."
];

const quests = [
  "Acquire goblet.",
  "Practice saying huzzah without making it weird.",
  "Locate snacks of ye olde variety.",
  "Prepare dramatic cape entrance.",
  "Do not challenge a bard unless emotionally ready.",
  "Carry cash, for the realm is mysterious.",
  "Identify the nearest turkey leg.",
  "Compliment at least one excellent costume."
];

const decreeEl = document.getElementById("royal-decree");
const rumorEl = document.getElementById("rumor");
const questList = document.getElementById("quest-list");
const readinessFill = document.getElementById("readiness-fill");
const readinessPercent = document.getElementById("readiness-percent");
const readinessLabel = document.getElementById("readiness-label");
const cloakIcon = document.getElementById("cloak-icon");
const cloakStatus = document.getElementById("cloak-status");
const cloakDetail = document.getElementById("cloak-detail");
const summonButton = document.getElementById("summon-button");
const summonMessage = document.getElementById("summon-message");
const courtSparkles = document.getElementById("court-sparkles");
let currentDecree = "";

function pad(value) {
  return String(value).padStart(2, "0");
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function updateCountdown() {
  const diff = Math.max(0, faireDate - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);

  document.getElementById("days").textContent = pad(days);
  document.getElementById("hours").textContent = pad(Math.floor((totalSeconds % 86400) / 3600));
  document.getElementById("minutes").textContent = pad(Math.floor((totalSeconds % 3600) / 60));
  document.getElementById("seconds").textContent = pad(totalSeconds % 60);

  updateReadiness(days, diff);
}

function getReadiness(daysUntilFaire, millisecondsUntilFaire) {
  if (millisecondsUntilFaire <= 0) return [100, "Huzzah Level Critical"];
  if (daysUntilFaire > 120) return [12, "Peasant Mode"];
  if (daysUntilFaire > 90) return [28, "Cloak Curious"];
  if (daysUntilFaire > 60) return [46, "Goblet Operational"];
  if (daysUntilFaire > 30) return [68, "Full Goblin Court"];
  if (daysUntilFaire > 14) return [84, "Turkey Leg Imminent"];
  return [96, "Huzzah Level Critical"];
}

function updateReadiness(daysUntilFaire, millisecondsUntilFaire) {
  const [readiness, label] = getReadiness(daysUntilFaire, millisecondsUntilFaire);
  readinessFill.style.width = `${readiness}%`;
  readinessPercent.textContent = `${readiness}%`;
  readinessLabel.textContent = label;
}

function rotateDecree() {
  let nextDecree = randomItem(decrees);
  while (nextDecree === currentDecree && decrees.length > 1) {
    nextDecree = randomItem(decrees);
  }

  currentDecree = nextDecree;
  decreeEl.textContent = nextDecree;
}

function rotateRumor() {
  rumorEl.textContent = randomItem(rumors);
}

function renderQuests() {
  questList.textContent = "";
  quests.forEach((quest) => {
    const item = document.createElement("div");
    item.className = "quest-item";
    item.textContent = quest;
    questList.appendChild(item);
  });
}

function parseMaxWind(windSpeed = "") {
  const speeds = windSpeed.match(/\d+/g);
  if (!speeds) return 0;
  return Math.max(...speeds.map(Number));
}

function setCloakAdvisory(kind, status, detail) {
  cloakIcon.className = `cloak-icon cloak-icon--${kind}`;
  cloakStatus.textContent = status;
  cloakDetail.textContent = detail;
}

function getCloakAdvisoryFromForecast(period) {
  const forecast = `${period.shortForecast || ""} ${period.detailedForecast || ""}`.toLowerCase();
  const wind = parseMaxWind(period.windSpeed);

  if (forecast.includes("thunder") || forecast.includes("storm")) {
    return ["storm", "Storm curse risk: elevated", `${period.temperature}°F, ${period.windSpeed}. The sky council says bring shelter energy.`];
  }

  if (forecast.includes("rain") || forecast.includes("shower")) {
    return ["rain", "Cloak recommended", `${period.temperature}°F, ${period.windSpeed}. Mud probability: narratively appropriate.`];
  }

  if (wind >= 16) {
    return ["mud", "Cape security advisory", `${period.temperature}°F, ${period.windSpeed}. Secure dramatic garments before entering the realm.`];
  }

  if (forecast.includes("sunny") || forecast.includes("clear")) {
    return ["sun", "Sunburn curse risk: elevated", `${period.temperature}°F, ${period.windSpeed}. Goblet hydration advised.`];
  }

  return ["mud", "Mild realm uncertainty", `${period.temperature}°F, ${period.windSpeed}. Forecast says: ${period.shortForecast}.`];
}

function setFallbackCloakAdvisory() {
  const fallback = [
    ["sun", "Goblet hydration advised", "Weather.gov raven got distracted. Assume SPF and snacks are wise."],
    ["rain", "Cloak maybe", "Weather.gov raven got distracted. Dramatic layering remains recommended."],
    ["mud", "Mud probability: vibes-based", "Weather.gov raven got distracted. Wear shoes with a plot arc."],
    ["storm", "Sky council unavailable", "Weather.gov raven got distracted. Proceed with theatrical caution."]
  ];
  setCloakAdvisory(...randomItem(fallback));
}

async function loadCloakAdvisory() {
  try {
    const pointsResponse = await fetch("https://api.weather.gov/points/35.0456,-85.3097");
    if (!pointsResponse.ok) throw new Error("Weather point lookup failed");
    const points = await pointsResponse.json();
    const forecastResponse = await fetch(points.properties.forecast);
    if (!forecastResponse.ok) throw new Error("Forecast lookup failed");
    const forecast = await forecastResponse.json();
    const currentPeriod = forecast.properties.periods[0];
    setCloakAdvisory(...getCloakAdvisoryFromForecast(currentPeriod));
  } catch (error) {
    setFallbackCloakAdvisory();
  }
}

function playFanfare() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const context = new AudioContext();
  const master = context.createGain();
  master.gain.setValueAtTime(0.0001, context.currentTime);
  master.gain.exponentialRampToValueAtTime(0.25, context.currentTime + 0.03);
  master.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 1.1);
  master.connect(context.destination);

  [392, 523.25, 659.25, 783.99].forEach((frequency, index) => {
    const osc = context.createOscillator();
    const gain = context.createGain();
    const start = context.currentTime + index * 0.16;
    osc.type = "square";
    osc.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.12, start + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.22);
    osc.connect(gain).connect(master);
    osc.start(start);
    osc.stop(start + 0.24);
  });
}

function launchCourtSparkles(count = 22) {
  for (let i = 0; i < count; i += 1) {
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.style.left = `${Math.random() * 100}%`;
    spark.style.top = `${Math.random() * 100}%`;
    courtSparkles.appendChild(spark);
    window.setTimeout(() => spark.remove(), 850);
  }
}

function summonCourt() {
  playFanfare();
  launchCourtSparkles();
  document.body.classList.remove("summoned");
  void document.body.offsetWidth;
  document.body.classList.add("summoned");
  summonMessage.textContent = "The realm has been summoned";
  window.setTimeout(() => {
    summonMessage.textContent = "";
    document.body.classList.remove("summoned");
  }, 2500);
}

updateCountdown();
rotateDecree();
rotateRumor();
renderQuests();
loadCloakAdvisory();

setInterval(updateCountdown, 1000);
setInterval(rotateRumor, 10000);
decreeEl.addEventListener("animationiteration", rotateDecree);
summonButton.addEventListener("click", summonCourt);
