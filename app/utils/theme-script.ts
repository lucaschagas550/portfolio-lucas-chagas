export const THEME_STORAGE_KEY = "theme";

// Roda no <head>, antes da pintura, para aplicar o tema salvo sem piscar.
// Sem escolha salva (ou sem localStorage), nada muda e vale o tema do sistema.
export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t}}catch(e){}})();`;
