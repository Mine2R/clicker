import { loadGame } from './clicker.js';

// Initialiser le jeu en chargeant les données sauvegardées
document.addEventListener('DOMContentLoaded', () => {
    loadGame();
});

// Cache tous les musiciens et spectateurs au démarrage
window.addEventListener("DOMContentLoaded", () => {
    const musiciens = ["chanteuse", "batteur", "clavieriste", "guitariste"];
    musiciens.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = "none";
    });
  
    for (let i = 1; i <= 10; i++) {
      const pnj = document.getElementById(`spectateur${i}`);
      if (pnj) pnj.style.display = "none";
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    const resetBtn = document.getElementById("reset-game");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        const confirmation = confirm("Es-tu sûr de vouloir réinitialiser le jeu ?");
        if (confirmation) {
          localStorage.clear();
          location.reload();
        }
      });
    }
  });
  