let cookies = 0;
const cookiesPerClick = { value: 1 }; // Use object to allow mutation
const autoClickers = { value: 0 }; // Use object to allow mutation
const baseAutoClicker = 0.5; // Production de base : 0.5 cookie par seconde

const cookieElement = document.getElementById('cookie');
const cookieCountElement = document.getElementById('cookie-count');
const guitarSound = document.getElementById('guitar-sound');

function updateCookieCount() {
    cookieCountElement.textContent = Math.floor(cookies);
    saveGame();
}

function saveGame() {
    const gameState = {
        cookies,
        cookiesPerClick: cookiesPerClick.value,
        autoClickers: autoClickers.value,
        baseAutoClicker
    };
    localStorage.setItem('cookieClickerGame', JSON.stringify(gameState));
}

function loadGame() {
    const savedGame = localStorage.getItem('cookieClickerGame');
    if (savedGame) {
        const gameState = JSON.parse(savedGame);
        cookies = gameState.cookies || 0;
        cookiesPerClick.value = gameState.cookiesPerClick || 1;
        autoClickers.value = gameState.autoClickers || 0;
    } else {
        cookies = Math.floor(Math.random() * 11); // 0 à 10 inclus
    }
    updateCookieCount();
}

// Getter and setter for cookies
function getCookies() {
    return cookies;
}

function setCookies(value) {
    cookies = value;
    updateCookieCount();
}

cookieElement.addEventListener('click', () => {
    cookies += cookiesPerClick.value;
    updateCookieCount();
    // Play guitar sound
    guitarSound.currentTime = 0; // Reset to start
    guitarSound.play().catch((error) => {
        console.error('Error playing guitar sound:', error);
    });
});


const bonusGuitar = document.getElementById("bonus-guitar");

function spawnBonusGuitar() {
  const delay = Math.random() * 10000 + 10000; // entre 10 et 20 sec

  setTimeout(() => {
    bonusGuitar.style.display = "block";

    // Position random
    const x = Math.random() * 80 + 10; 
    const y = Math.random() * 60 + 20;
    bonusGuitar.style.left = `${x}%`;
    bonusGuitar.style.top = `${y}%`;

    // Disparition auto au bout de 4 sec
    const hideTimeout = setTimeout(() => {
      bonusGuitar.style.display = "none";
      spawnBonusGuitar(); // replanifie le suivant
    }, 4000);

    // Clique = bonus
    bonusGuitar.onclick = () => {
      const currentScore = parseInt(document.getElementById("cookie-count").textContent || "0");
      const newScore = currentScore * 2;
      setCookies(newScore);
      updateCookieCount();

      bonusGuitar.style.display = "none";
      clearTimeout(hideTimeout);
      spawnBonusGuitar();
    };
  }, delay);
}

spawnBonusGuitar();


// Auto-clicker
setInterval(() => {
    cookies += baseAutoClicker + autoClickers.value;
    updateCookieCount();
}, 1000);

export { getCookies, setCookies, cookiesPerClick, autoClickers, baseAutoClicker, updateCookieCount, loadGame, saveGame };