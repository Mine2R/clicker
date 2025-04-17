import { cookies, cookiesPerClick, autoClickers, baseAutoClicker, updateCookieCount, saveGame } from './clicker.js';

const shopItems = [
    {
        name: 'Meilleur clic',
        price: 50,
        description: 'Augmente les cookies par clic',
        effect: (owned) => cookiesPerClick += (owned + 1), // +1, +2, +3, etc.
        owned: 0
    },
    {
        name: 'Auto-cliqueur',
        price: 100,
        description: 'Ajoute à la production automatique (base: 0.5/s)',
        effect: (owned) => autoClickers += (owned + 1) * 0.1, // +0.1, +0.2, +0.3, etc. par seconde
        owned: 0
    },
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
                item.price = loadedItems[index].price;
                item.owned = loadedItems[index].owned;
            }
        });
    }
}

function renderShop() {
    shopElement.innerHTML = '';
    shopItems.forEach((item, index) => {
        const nextEffect = item.owned + 1; // Prochain effet (ex. +2 si owned=1)
        const effectText = item.name === 'Meilleur clic'
            ? `+${nextEffect} cookies par clic`
            : `+${(nextEffect * 0.1).toFixed(1)} cookies par seconde`;
        const itemElement = document.createElement('div');
        itemElement.className = 'shop-item';
        itemElement.innerHTML = `
            <h4>${item.name} (Possédé: ${item.owned})</h4>
            <p>${item.description}: ${effectText}</p>
            <p>Prix: ${item.price} cookies</p>
            <button id="buy-${index}" ${cookies < item.price ? 'disabled' : ''}>Acheter</button>
        `;
        shopElement.appendChild(itemElement);

        const buyButton = document.getElementById(`buy-${index}`);
        buyButton.addEventListener('click', () => {
            if (cookies >= item.price) {
                cookies -= item.price;
                item.owned++;
                item.effect(item.owned); // Appliquer l'effet croissant
                item.price = Math.round(item.price * 1.15); // Augmenter le prix
                updateCookieCount();
                saveShop();
                saveGame();
                renderShop();
            }
        });
    });
}

// Charger l'état de la boutique au démarrage
loadShop();

// Mettre à jour la boutique toutes les secondes pour vérifier les boutons
setInterval(renderShop, 1000);

// Rendu initial
renderShop();