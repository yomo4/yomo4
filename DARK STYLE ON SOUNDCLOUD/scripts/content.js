// Кэшируем селекторы
const ROOT_ELEMENT = document.documentElement;
const BODY_ELEMENT = document.body;

// Функции для управления темой
function enableDarkMode() {
    ROOT_ELEMENT.classList.add('sc-dark-mode');
    BODY_ELEMENT.classList.add('g-dark');
}

function disableDarkMode() {
    ROOT_ELEMENT.classList.remove('sc-dark-mode');
    BODY_ELEMENT.classList.remove('g-dark');
}

// Инициализация
chrome.storage.sync.get('darkMode', ({ darkMode }) => {
    if (darkMode) {
        requestAnimationFrame(enableDarkMode);
    }
});

// Слушатель сообщений
chrome.runtime.onMessage.addListener(({ action, darkMode }) => {
    if (action === 'toggleTheme') {
        requestAnimationFrame(() => {
            darkMode ? enableDarkMode() : disableDarkMode();
        });
    }
});

// Наблюдатель за DOM
const observer = new MutationObserver(() => {
    chrome.storage.sync.get('darkMode', ({ darkMode }) => {
        if (darkMode) {
            requestAnimationFrame(enableDarkMode);
        }
    });
});

// Запуск наблюдателя
observer.observe(BODY_ELEMENT, {
    childList: true,
    subtree: true
}); 