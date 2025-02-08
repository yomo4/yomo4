document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('themeToggle');
    
    // Загружаем сохраненное состояние
    chrome.storage.sync.get('darkMode', ({ darkMode }) => {
        toggle.checked = darkMode;
    });

    // Обработчик переключения
    toggle.addEventListener('change', () => {
        const isDarkMode = toggle.checked;
        
        // Сохраняем состояние
        chrome.storage.sync.set({ darkMode: isDarkMode });
        
        // Отправляем сообщение активной вкладке
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'toggleTheme',
                darkMode: isDarkMode
            });
        });
    });
}); 