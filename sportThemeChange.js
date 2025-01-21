    let isDarkMode = false; // Default theme state

    function toggleSportTheme() {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-mode-sport', isDarkMode);

        window.altenarWSDK.set({
            themeName: isDarkMode ? 'white' : 'light'
        });
    }
