import { getCookies, setCookies, cookiesPerClick, autoClickers, updateCookieCount, saveGame } from './clicker.js';

let unlockedPNJs = 0;
const maxPNJs = 10;

function showMusicien(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = "block";
}

function showNextPNJ() {
    if (unlockedPNJs < maxPNJs) {
        unlockedPNJs++;
        const pnj = document.getElementById(`spectateur${unlockedPNJs}`);
        if (pnj) pnj.style.display = "block";
    }
}

const shopItems = [
    {
        name: 'Guitariste',
        price: 50,
        description: 'Augmente les notes par clic',
        effect: (owned) => {
            cookiesPerClick.value += 0.5 * (owned + 1);
            showMusicien("guitariste");
        },
        owned: 0
    },
    {
        name: 'Batteur',
        price: 100,
        description: 'Ajoute à la production automatique',
        effect: (owned) => {
            autoClickers.value += 0.5 * (owned + 1);
            showMusicien("batteur");
        },
        owned: 0
    },
    {
        name: 'Chanteuse',
        price: 200,
        description: 'Amplifie les notes par clic',
        effect: (owned) => {
            cookiesPerClick.value *= 1.5;
            showMusicien("chanteuse");
        },
        owned: 0
    },
    {
        name: 'Clavériste',
        price: 200,
        description: 'Boost la production automatique',
        effect: (owned) => {
            autoClickers.value += 1.0;
            showMusicien("clavieriste");
        },
        owned: 0
    },
    {
        name: 'Public',
        price: 600,
        description: 'Boost temporaire clic et auto + ajoute un PNJ',
        effect: (owned) => {
            const originalCookiesPerClick = cookiesPerClick.value;
            const originalAutoClickers = autoClickers.value;
            cookiesPerClick.value *= 1.3;
            autoClickers.value += 0.5;

            showNextPNJ(); // 👈 débloque un nouveau PNJ

            setTimeout(() => {
                cookiesPerClick.value = originalCookiesPerClick;
                autoClickers.value = originalAutoClickers;
                updateCookieCount();
            }, 10000);
        },
        owned: 0
    },
    {
        name: 'Mega Production',
        price: 400,
        description: 'Augmente fortement la production',
        effect: (owned) => {
            autoClickers.value += 1.0 * (owned + 1);
        },
        owned: 0
    }
];

const shopElement = document.getElementById('shop-items');

function saveShop() {
    localStorage.setItem('cookieClickerShop', JSON.stringify(shopItems));
}

function loadShop() {
    const savedShop = localStorage.getItem('cookieClickerShop');
    if (savedShop) {
        const loadedItems = JSON.parse(savedShop);
        shopItems.forEach((item, index) => {
            if (loadedItems[index]) {
                item.price = loadedItems[index].price || item.price;
                item.owned = loadedItems[index].owned || 0;
                // Reapply effects for previously owned items
                for (let i = 0; i < item.owned; i++) {
                    item.effect(i);
                }
            }
        });
    }
}

function renderShop() {
    const cookies = getCookies();
    shopElement.innerHTML = '';
    shopItems.forEach((item, index) => {
        const nextEffect = item.name === 'Guitariste' ? `+${(0.5 * (item.owned + 1)).toFixed(1)} Notes/clic` :
                          item.name === 'Batteur' ? `+${(0.5 * (item.owned + 1)).toFixed(1)} Notes/s` :
                          item.name === 'Chanteuse' ? `x1.5 Notes/clic` :
                          item.name === 'Clavériste' ? `+1.0 Notes/s` :
                          item.name === 'Public' ? `x1.3 clic +0.5/s (10s)` :
                          `+${(1.0 * (item.owned + 1)).toFixed(1)} Notes/s`;
        const itemElement = document.createElement('div');
        itemElement.className = 'shop-item';
        itemElement.innerHTML = `
            <h4>${item.name} (${item.owned})</h4>
            <p>${item.description}: ${nextEffect}</p>
            <p>Prix: ${item.price}</p>
            <button id="buy-${index}" ${cookies < item.price ? 'disabled' : ''}>Acheter</button>
        `;
        shopElement.appendChild(itemElement);

        const buyButton = document.getElementById(`buy-${index}`);
        buyButton.addEventListener('click', () => {
            if (cookies >= item.price) {
                setCookies(cookies - item.price);
                item.owned++;
                item.effect(item.owned - 1);
                item.price = Math.round(item.price * 1.15);
                updateCookieCount();
                saveShop();
                saveGame();
                renderShop();
            }
        });
    });
}

// Load shop state and apply effects
loadShop();
setInterval(renderShop, 1000);
renderShop();
