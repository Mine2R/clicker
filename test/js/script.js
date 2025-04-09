const chanteuse = document.getElementById("chanteuse");
const batteur = document.getElementById("batteur");
const clavieriste = document.getElementById("clavieriste");
const guitariste = document.getElementById("guitariste");
const clickerGuitare = document.getElementById("clicker-guitare");
const scoreDisplay = document.getElementById("score");

// Ajout des spectateurs (1 à 7)
const spectateur1 = document.getElementById("spectateur1");
const spectateur2 = document.getElementById("spectateur2");
const spectateur3 = document.getElementById("spectateur3");
const spectateur4 = document.getElementById("spectateur4");
const spectateur5 = document.getElementById("spectateur5");
const spectateur6 = document.getElementById("spectateur6");
const spectateur7 = document.getElementById("spectateur7");
function animateBand() {
    console.log("animateBand called, currentFrame:", currentFrame, "positionOffset:", positionOffset);
    // Reste du code...
}

const chanteuseFrames = [
    "assets/chanteuse/chanteusef1.png",
    "assets/chanteuse/chanteusef2.png",
];

const batteurFrames = [
    "assets/batteur/batteurf1.png",
    "assets/batteur/batteurf2.png",
];

const clavieristeFrames = [
    "assets/clavieriste/clavieristef1.png",
    "assets/clavieriste/clavieristef2.png",
];

const guitaristeFrames = [
    "assets/guitariste/guitaristeframe1.png",
    "assets/guitariste/guitaristeframe2.png",
    "assets/guitariste/guitaristeframe3.png"
];

// Frames pour les spectateurs (3 frames chacun)
const spectateur1Frames = [
    "assets/pnj1/pnj1f1.png",
    "assets/pnj1/pnj1f2.png",
    "assets/pnj1/pnj1f3.png"
];

const spectateur2Frames = [
    "assets/pnj2/pnj2f1.png",
    "assets/pnj2/pnj2f2.png",
    "assets/pnj2/pnj2f3.png" // Chemin corrigé
];

const spectateur3Frames = [
    "assets/pnj1/pnj3f1.png",
    "assets/10/pnj1/pnj3f2.png",
    "assets/10/pnj1/pnj3f3.png"
];

const spectateur4Frames = [
    "assets/10/pnj1/pnj4f1.png",
    "assets/10/pnj1/pnj4f2.png",
    "assets/10/pnj1/pnj4f3.png"
];

const spectateur5Frames = [
    "assets/10/pnj1/pnj5f1.png",
    "assets/10/pnj1/pnj5f2.png",
    "assets/10/pnj1/pnj5f3.png"
];

const spectateur6Frames = [
    "assets/10/pnj1/pnj6f1.png",
    "assets/10/pnj1/pnj6f2.png",
    "assets/10/pnj1/pnj6f3.png"
];

const spectateur7Frames = [
    "assets/10/pnj1/pnj7f1.png",
    "assets/10/pnj1/pnj7f2.png",
    "assets/10/pnj1/pnj7f3.png"
];

let currentFrame = 0;
let positionOffset = 0;
let goingUp = true;
let points = 0; // Variable pour stocker les points

// Animation de la scène
function animateBand() {
    // Animation des musiciens
    chanteuse.src = chanteuseFrames[currentFrame];
    batteur.src = batteurFrames[currentFrame];
    clavieriste.src = clavieristeFrames[currentFrame];
    guitariste.src = guitaristeFrames[currentFrame % guitaristeFrames.length]; // Ajustement pour 3 frames

    // Animation des spectateurs (3 frames)
    spectateur1.src = spectateur1Frames[currentFrame % spectateur1Frames.length];
    spectateur2.src = spectateur2Frames[currentFrame % spectateur2Frames.length];
    spectateur3.src = spectateur3Frames[currentFrame % spectateur3Frames.length];
    spectateur4.src = spectateur4Frames[currentFrame % spectateur4Frames.length];
    spectateur5.src = spectateur5Frames[currentFrame % spectateur5Frames.length];
    spectateur6.src = spectateur6Frames[currentFrame % spectateur6Frames.length];
    spectateur7.src = spectateur7Frames[currentFrame % spectateur7Frames.length];

    currentFrame = (currentFrame + 1) % chanteuseFrames.length;

    if (goingUp) {
        positionOffset += 0.5;
        if (positionOffset >= 5) goingUp = false;
    } else {
        positionOffset -= 0.5;
        if (positionOffset <= -5) goingUp = true;
    }

    // Appliquer l'animation de position aux musiciens
    chanteuse.style.top = `calc(70% + ${positionOffset}px)`;
    batteur.style.top = `calc(70% + ${positionOffset}px)`;
    clavieriste.style.top = `calc(70% + ${positionOffset}px)`;
    guitariste.style.top = `calc(70% + ${positionOffset}px)`;

    // Appliquer une animation de position aux spectateurs (plus légère)
    spectateur1.style.top = `calc(90% + ${positionOffset / 2}px)`; // Moitié de l'amplitude
    spectateur2.style.top = `calc(90% + ${positionOffset / 2}px)`;
    spectateur3.style.top = `calc(90% + ${positionOffset / 2}px)`;
    spectateur4.style.top = `calc(90% + ${positionOffset / 2}px)`;
    spectateur5.style.top = `calc(90% + ${positionOffset / 2}px)`;
    spectateur6.style.top = `calc(90% + ${positionOffset / 2}px)`;
    spectateur7.style.top = `calc(90% + ${positionOffset / 2}px)`;
}

setInterval(animateBand, 100);

// Gestion du clicker
clickerGuitare.addEventListener("click", () => {
    points += 1; // Incrémente les points à chaque clic
    scoreDisplay.textContent = `Points : ${points}`; // Met à jour l'affichage
});