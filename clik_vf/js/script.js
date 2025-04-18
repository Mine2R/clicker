const chanteuse = document.getElementById("chanteuse");
const batteur = document.getElementById("batteur");
const clavieriste = document.getElementById("clavieriste");
const guitariste = document.getElementById("guitariste");
const clickerGuitare = document.getElementById("clicker-guitare");
const scoreDisplay = document.getElementById("score");

// Spectateurs (pnj1 à pnj10)
const spectateur1 = document.getElementById("spectateur1");
const spectateur2 = document.getElementById("spectateur2");
const spectateur3 = document.getElementById("spectateur3");
const spectateur4 = document.getElementById("spectateur4");
const spectateur5 = document.getElementById("spectateur5");
const spectateur6 = document.getElementById("spectateur6");
const spectateur7 = document.getElementById("spectateur7");
const spectateur8 = document.getElementById("spectateur8");
const spectateur9 = document.getElementById("spectateur9");
const spectateur10 = document.getElementById("spectateur10");

// Frames
const chanteuseFrames = [
  "assets/chanteuse/chanteusef1.png",
  "assets/chanteuse/chanteusef2.png"
];

const batteurFrames = [
  "assets/batteur/batteurf1.png",
  "assets/batteur/batteurf2.png"
];

const clavieristeFrames = [
  "assets/clavieriste/clavieristef1.png",
  "assets/clavieriste/clavieristef2.png"
];

const guitaristeFrames = [
  "assets/guitariste/guitaristeframe1.png",
  "assets/guitariste/guitaristeframe2.png",
  "assets/guitariste/guitaristeframe3.png"
];

const spectateur1Frames = [
  "assets/pnj1/pnj1f1.png",
  "assets/pnj1/pnj1f2.png",
  "assets/pnj1/pnj1f3.png"
];

const spectateur2Frames = [
  "assets/pnj2/pnj2f1.png",
  "assets/pnj2/pnj2f2.png",
  "assets/pnj2/pnj2f3.png"
];

const spectateur3Frames = [
  "assets/pnj3/pnj3f1.png",
  "assets/pnj3/pnj3f2.png",
  "assets/pnj3/pnj3f3.png"
];

const spectateur4Frames = [
  "assets/pnj4/pnj4f1.png",
  "assets/pnj4/pnj4f2.png",
  "assets/pnj4/pnj4f3.png"
];

const spectateur5Frames = [
  "assets/pnj5/pnj5f1.png",
  "assets/pnj5/pnj5f2.png",
  "assets/pnj5/pnj5f3.png"
];

const spectateur6Frames = [
  "assets/pnj6/pnj6f1.png",
  "assets/pnj6/pnj6f2.png",
  "assets/pnj6/pnj6f3.png"
];

const spectateur7Frames = [
  "assets/pnj7/pnj7f1.png",
  "assets/pnj7/pnj7f2.png",
  "assets/pnj7/pnj7f3.png"
];

const spectateur8Frames = [
  "assets/pnj8/pnj8f1.png",
  "assets/pnj8/pnj8f2.png",
  "assets/pnj8/pnj8f3.png"
];

const spectateur9Frames = [
  "assets/pnj9/pnj9f1.png",
  "assets/pnj9/pnj9f2.png",
  "assets/pnj9/pnj9f3.png"
];

const spectateur10Frames = [
  "assets/pnj10/pnj10f1.png",
  "assets/pnj10/pnj10f2.png",
  "assets/pnj10/pnj10f3.png"
];

let currentFrame = 0;      // Pour les musiciens (2 frames)
let currentFrame3 = 0;     // Pour les persos à 3 frames
let positionOffset = 0;
let goingUp = true;
let points = 0;

function animateBand() {
  // Animation musiciens
  chanteuse.src = chanteuseFrames[currentFrame];
  batteur.src = batteurFrames[currentFrame];
  clavieriste.src = clavieristeFrames[currentFrame];
  guitariste.src = guitaristeFrames[currentFrame3];

  // Animation spectateurs
  spectateur1.src = spectateur1Frames[currentFrame3];
  spectateur2.src = spectateur2Frames[currentFrame3];
  spectateur3.src = spectateur3Frames[currentFrame3];
  spectateur4.src = spectateur4Frames[currentFrame3];
  spectateur5.src = spectateur5Frames[currentFrame3];
spectateur6.src = spectateur6Frames[currentFrame];
spectateur7.src = spectateur7Frames[currentFrame];

  spectateur8.src = spectateur8Frames[currentFrame3];
  spectateur9.src = spectateur9Frames[currentFrame3];
  spectateur10.src = spectateur10Frames[currentFrame3];

  // Mise à jour des frames
  currentFrame = (currentFrame + 1) % chanteuseFrames.length;
  currentFrame3 = (currentFrame3 + 1) % 3;

  // Rebond vertical
  if (goingUp) {
    positionOffset += 0.5;
    if (positionOffset >= 5) goingUp = false;
  } else {
    positionOffset -= 0.5;
    if (positionOffset <= -5) goingUp = true;
  }

  // Appliquer l'animation verticale
  const musicianTop = `calc(70% + ${positionOffset}px)`;
  const crowdTop = `calc(90% + ${positionOffset / 2}px)`;

  chanteuse.style.top = musicianTop;
  batteur.style.top = musicianTop;
  clavieriste.style.top = musicianTop;
  guitariste.style.top = musicianTop;

  [
    spectateur1, spectateur2, spectateur3, spectateur4, spectateur5,
    spectateur6, spectateur7, spectateur8, spectateur9, spectateur10
  ].forEach(s => {
    s.style.top = crowdTop;
  });
}

setInterval(animateBand, 100);

// Clicker guitare
clickerGuitare.addEventListener("click", () => {
  points += 1;
  scoreDisplay.textContent = `Points : ${points}`;


});
