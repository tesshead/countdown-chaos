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
  "IT IS GIRLS TRIP O'CLOCK. BE NORMAL? IMPOSSIBLE.",
  "A packing cube somewhere just got nervous.",
  "Snack logistics are becoming everyone's personality.",
  "Someone is spiritually adding to cart.",
  "The beach bag is calling from the future.",
  "Forecast: dramatic entrances with scattered sunscreen.",
  "Outfit discourse has requested a formal agenda.",
  "The vacation spreadsheet is gaining sentience."
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
  "BEACH ALERT * SOMEONE IS ABOUT TO ASK WHAT ARE WE WEARING *",
  "BEACH ALERT * GROUP CHAT INSTABILITY HAS REACHED VACATION-ADJACENT LEVELS *"
];

// Update Tess later by replacing FLIGHT TBD with flight number/times and adding depart/arrive.
const travelers = [
  {
    unit: "TESS",
    route: "PHL -> ATL",
    detail: "FLIGHT TBD",
    status: "PHILLY SIDE QUEST ACTIVE"
  },
  {
    unit: "TAY",
    route: "CHA -> ATL",
    detail: "CHAOS CHARIOT",
    status: "PICKUP PROTOCOL PENDING"
  },
  {
    unit: "SARAH",
    route: "BUF -> ATL",
    detail: "DL1384 12:16P-2:22P",
    depart: "2026-08-06T12:16:00-04:00",
    arrive: "2026-08-06T14:22:00-04:00",
    status: "NORTHERN DELEGATION INBOUND"
  },
  {
    unit: "ALL",
    route: "ATL -> DESTIN",
    detail: "AUG 6 BEACHWARD",
    status: "AWAITING FULL GOBLIN ASSEMBLY"
  }
];

const moodEl = document.getElementById("mood");
const prophecyEl = document.getElementById("prophecy");
const beachAlertEl = document.getElementById("beach-alert");
const travelerBoard = document.getElementById("traveler-board");
const missionReadout = document.getElementById("mission-readout");
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

function rotateStatusMessage() {
  if (Date.now() >= tripDate) {
    document.getElementById("status").textContent = "IT IS GIRLS TRIP O'CLOCK. BE NORMAL? IMPOSSIBLE.";
    return;
  }

  document.getElementById("status").textContent = randomItem(statusMessages);
}

function getTravelerStatus(traveler, now = Date.now()) {
  if (!traveler.depart || !traveler.arrive) return traveler.status;

  const depart = new Date(traveler.depart).getTime();
  const arrive = new Date(traveler.arrive).getTime();

  if (now < depart) return "AWAITING AIRPORT TRANSFORMATION";
  if (now < arrive) return "AIRBORNE, SNACKS UNKNOWN";
  return "LANDED IN ATL, CHAOS UNLOCKED";
}

function getAllStatus(now = Date.now()) {
  const sarah = travelers.find((traveler) => traveler.unit === "SARAH");
  const sarahArrive = new Date(sarah.arrive).getTime();
  const augSixMorning = new Date("2026-08-06T08:00:00-04:00").getTime();

  if (now < augSixMorning) return "CONVERGENCE PENDING";
  if (now < sarahArrive) return "ATL RALLY POINT FORMING";
  return "LOAD THE CAR. PROCEED BEACHWARD.";
}

function getMissionReadout(now = Date.now()) {
  const sarahDepart = new Date("2026-08-06T12:16:00-04:00").getTime();
  const sarahArrive = new Date("2026-08-06T14:22:00-04:00").getTime();

  if (now < sarahDepart) {
    return "Rally point: ATL. Tess returns from the Philly side quest. Tay drives in from Chattanooga. Sarah prepares for DL1384.";
  }

  if (now < sarahArrive) {
    return "Sarah is airborne. Tay, this is not a drill. ATL acquisition protocol is active.";
  }

  return "ATL rally point unlocked. Acquire Tess. Acquire Sarah. Load the car and point the chaos toward Destin.";
}

function makeFlapCell(label, value, modifier = "") {
  const cell = document.createElement("span");
  cell.className = `flap-cell ${modifier}`.trim();
  cell.dataset.label = label;
  cell.setAttribute("role", "cell");
  cell.textContent = value;
  return cell;
}

function renderTravelerBoard() {
  travelerBoard.textContent = "";

  travelers.forEach((traveler) => {
    const row = document.createElement("div");
    row.className = "departures-row is-ticking";
    row.setAttribute("role", "row");

    const status = traveler.unit === "ALL" ? getAllStatus() : getTravelerStatus(traveler);
    row.append(
      makeFlapCell("Unit", traveler.unit),
      makeFlapCell("Route", traveler.route, "flap-cell--route"),
      makeFlapCell("Details", traveler.detail),
      makeFlapCell("Status", status, "flap-cell--status")
    );

    travelerBoard.appendChild(row);
    window.setTimeout(() => row.classList.remove("is-ticking"), 450);
  });

  missionReadout.textContent = getMissionReadout();
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

  if (diff <= 0) {
    document.getElementById("status").textContent = "IT IS GIRLS TRIP O'CLOCK. BE NORMAL? IMPOSSIBLE.";
  }

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
rotateStatusMessage();
renderTravelerBoard();
loadDestinSurfVibe();
updateCountdown();
setInterval(updateCountdown, 1000);
setInterval(rotateCopy, 10000);
setInterval(rotateBeachAlert, 7000);
setInterval(rotateStatusMessage, 9000);
setInterval(renderTravelerBoard, 60000);

beachButton.addEventListener("click", declareBeachEmergency);
document.addEventListener("click", (event) => {
  if (event.target === beachButton) return;
  if (Math.random() > .55) launchFireworks(6);
});
