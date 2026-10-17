/*
 * HALLOWEEN UNLOCKED
 * Pas de server nodig: pas de dossiers hieronder aan.
 * Tijdzone: Europe/Amsterdam. Gebruik ISO-tijden zonder Z of offset.
 *
 * LET OP: bij een statische website staan teksten in script.js en zijn ze
 * technisch terug te vinden vóór hun onthulling. Dit verbergt ze alleen in de UI.
 */

const CONFIG = {
  // De aftelklok telt naar de eerste onthulling. Pas dit aan indien nodig.
  firstReveal: "2026-10-30T17:00:00",
  timezone: "Europe/Amsterdam",
  dossiers: [
    {
      id: "001",
      title: "De uitnodiging",
      teaser: "Er staat iets in je agenda. Je weet alleen nog niet wat.",
      content: "Welkom bij Halloween Unlocked.\\n\\nJe bent onderdeel van het dossier. Houd deze pagina in de gaten en let op de tijd. De eerste aanwijzing is dichterbij dan je denkt.\\n\\nHoe lang kan deze tekst eigenlijk zijn?\\nEn wat gebeurt er dan met de opmaak?",
      revealAt: "2026-10-17T18:30:00"
    },
    {
      id: "002",
      title: "De locatie",
      teaser: "Een plek die voor even van ons is…",
      content: "VUL HIER DE LOCATIE IN.\\n\\nTip: voeg eventueel adres, routebeschrijving of wat mee te nemen toe.",
      revealAt: "2026-10-30T18:00:00"
    },
    {
      id: "003",
      title: "Dresscode",
      teaser: "Kom voorbereid. Gewoon komen is verdacht.",
      content: "VUL HIER DE DRESSCODE IN.\\n\\nDenk aan kostuums, kleuren, accessoires of een grappige opdracht.",
      revealAt: "2026-10-30T19:00:00"
    },
    {
      id: "004",
      title: "De eerste opdracht",
      teaser: "Je avond begint niet zonder een kleine beproeving.",
      content: "VUL HIER DE EERSTE OPDRACHT IN.",
      revealAt: "2026-10-31T10:00:00"
    },
    {
      id: "005",
      title: "Het geheim",
      teaser: "Sommige plannen kun je beter niet hardop zeggen.",
      content: "VUL HIER EEN VERRASSING, ACTIVITEIT OF HINT IN.",
      revealAt: "2026-10-31T15:00:00"
    },
    {
      id: "006",
      title: "De finale",
      teaser: "Alles leidt naar dit moment.",
      content: "VUL HIER DE FINALE OF LAATSTE ONTHULLING IN.\\n\\nBedankt voor het meespelen. Fijne Halloween!",
      revealAt: "2026-11-01T10:00:00"
    }
  ]
};

const nlDate = new Intl.DateTimeFormat("nl-NL", {
  timeZone: CONFIG.timezone, day: "2-digit", month: "short",
  hour: "2-digit", minute: "2-digit", hour12: false
});

function nowAmsterdam() {
  // The browser's Date is an absolute timestamp; configured times are interpreted
  // as Amsterdam local wall-clock times by parsing them with the helper below.
  return Date.now();
}

// Convert an Amsterdam local ISO-like time into a UTC timestamp,
// accounting for CET/CEST by iteratively matching the timezone's displayed parts.
function amsterdamTimestamp(localString) {
  const [date, time = "00:00:00"] = localString.split("T");
  const [y, mo, d] = date.split("-").map(Number);
  const [h, mi, s = "00"] = time.split(":").map(Number);
  const targetAsUtc = Date.UTC(y, mo - 1, d, h, mi, Number(s));
  let guess = targetAsUtc;
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: CONFIG.timezone, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23"
  });
  for (let i = 0; i < 3; i++) {
    const parts = Object.fromEntries(fmt.formatToParts(new Date(guess))
      .filter(p => p.type !== "literal").map(p => [p.type, Number(p.value)]));
    const displayedAsUtc = Date.UTC(parts.year, parts.month - 1, parts.day,
      parts.hour, parts.minute, parts.second);
    guess += targetAsUtc - displayedAsUtc;
  }
  return guess;
}

function formatLocal(localString) {
  const stamp = amsterdamTimestamp(localString);
  return nlDate.format(new Date(stamp)).replace(".", "");
}

function pad(n) { return String(Math.max(0, n)).padStart(2, "0"); }

function renderDossiers() {
  const now = nowAmsterdam();
  const grid = document.getElementById("dossierGrid");
  let opened = 0;
  grid.innerHTML = "";

  CONFIG.dossiers.forEach((item) => {
    const isOpen = now >= amsterdamTimestamp(item.revealAt);
    if (isOpen) opened++;
    const card = document.createElement("article");
    card.className = "dossier" + (isOpen ? " unlocked" : "");
    const top = document.createElement("div");
    top.className = "dossier-top";
    top.innerHTML = `<span class="dossier-number">DOSSIER / ${item.id}</span><span class="lock" aria-label="${isOpen ? "Ontgrendeld" : "Vergrendeld"}">${isOpen ? "✦" : "🔒"}</span>`;
    const title = document.createElement("h3");
    title.textContent = isOpen ? item.title : "Verzegeld dossier";
    const body = document.createElement("p");
    body.textContent = isOpen ? item.content.replace(/\\n/g, "\n") : item.teaser;
    const time = document.createElement("div");
    time.className = "dossier-time";
    time.textContent = isOpen ? "ONTGRENDELD" : "VRIJGEGEVEN OP " + formatLocal(item.revealAt);
    card.append(top, title, body, time);
    grid.append(card);
  });
  document.getElementById("fileCount").textContent =
    String(opened).padStart(2, "0") + " / " + String(CONFIG.dossiers.length).padStart(2, "0") + " OPEN";
}

function updateCountdown() {
  const now = nowAmsterdam();
  const upcoming = CONFIG.dossiers
    .map(d => ({...d, stamp: amsterdamTimestamp(d.revealAt)}))
    .filter(d => d.stamp > now)
    .sort((a,b) => a.stamp - b.stamp)[0];

  if (!upcoming) {
    document.getElementById("countdownLabel").textContent = "ALLE DOSSIERS ZIJN GEOPEND";
    ["days","hours","minutes","seconds"].forEach(id => document.getElementById(id).textContent = "00");
    document.getElementById("statusText").textContent = "Alle dossiers geopend";
    return;
  }
  document.getElementById("countdownLabel").textContent = "VOLGENDE ONTHULLING OVER";
  document.getElementById("statusText").textContent = "Dossier " + upcoming.id + " wacht op ontgrendeling";
  let diff = Math.max(0, upcoming.stamp - now);
  const days = Math.floor(diff / 86400000); diff %= 86400000;
  const hours = Math.floor(diff / 3600000); diff %= 3600000;
  const minutes = Math.floor(diff / 60000); diff %= 60000;
  const seconds = Math.floor(diff / 1000);
  document.getElementById("days").textContent = pad(days);
  document.getElementById("hours").textContent = pad(hours);
  document.getElementById("minutes").textContent = pad(minutes);
  document.getElementById("seconds").textContent = pad(seconds);
}

function tick() {
  renderDossiers();
  updateCountdown();
}
tick();
setInterval(tick, 1000);
