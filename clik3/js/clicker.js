let cookies = 0;
let cookiesPerClick = 1;
let autoClickers = 0;
const baseAutoClicker = 0.5; // Production de base : 0.5 cookie par seconde

const cookieElement = document.getElementById('cookie');
const cookieCountElement = document.getElementById('cookie-count');

function updateCookieCount() {
    cookieCountElement.textContent = Math.floor(cookies);
    saveGame();
}

function saveGame() {
    const gameState = {
        cookies,
        cookiesPerClick,
        autoClickers,
        baseAutoClicker
    };
    localStorage.setItem('cookieClickerGame', JSON.stringify(gameState));
}

function loadGame() {
    const savedGame = localStorage.getItem('cookieClickerGame');
    if (savedGame) {
        const gameState = JSON.parse(savedGame);
        cookies = gameState.cookies || 0;
        cookiesPerClick = gameState.cookiesPerClick || 1;
        autoClickers = gameState.autoClickers || 0;
        // baseAutoClicker est constant, pas besoin de le charger
    } else {
        // Générer un nombre initial de cookies (aléatoire entre 0 et 10)
        cookies = Math.floor(Math.random() * 11); // 0 à 10 inclus
    }
    updateCookieCount();
}

cookieElement.addEventListener('click', () => {
    cookies += cookiesPerClick;
    updateCookieCount();
});

// Auto-clicker logic
setInterval(() => {
    cookies += baseAutoClicker + autoClickers; // Ajouter la production de base + auto-cliqueurs
    updateCookieCount();
}, 1000);

export { cookies, cookiesPerClick, autoClickers, baseAutoClicker, updateCookieCount, loadGame, saveGame };