async function loadLayout() {
    try {
        // 1. Завантажуємо Header
        const headerRes = await fetch('assets/header.html');
        const headerData = await headerRes.text();
        document.getElementById('header').innerHTML = headerData;

        // 2. Завантажуємо Footer
        const footerRes = await fetch('assets/footer.html');
        const footerData = await footerRes.text();
        document.getElementById('footer').innerHTML = footerData;

        // 3. Логіка Active сторінки
        const currentPage = window.location.pathname.split("/").pop() || 'index.html';
        document.querySelectorAll('.nav_link').forEach(link => {
            if (link.getAttribute('data-page') === currentPage) {
                link.classList.add('active');
            }
        });

        // --- ОСЬ ТУТ МАГІЯ: ЗАПУСКАЄМО ТВОЇ СКРИПТИ ---
        // Якщо твій код теми та меню лежить у script.js, 
        // викликаємо ці функції ТУТ, коли HTML вже з'явився.
        if (typeof initMobileMenu === 'function') {
            initMobileMenu();
        }
        if (typeof initThemeSwitcher === 'function') {
            initThemeSwitcher();
        }
        if (typeof initHeaderHeight === 'function') {
            initHeaderHeight();
        }
        
        // Якщо у тебе в script.js просто лежить код без функцій, 
        // його треба обгорнути у функцію, щоб ми могли її тут викликати.

    } catch (error) {
        console.error("Помилка:", error);
    }
}

loadLayout();