async function loadLayout() {
    try {
        // Завантажуємо Header
        const headerRes = await fetch('assets/header.html');
        const headerData = await headerRes.text();
        document.getElementById('header').innerHTML = headerData;

        // Логіка Active сторінки
        const currentPage = window.location.pathname.split("/").pop() || 'index.html';
        document.querySelectorAll('.nav_link').forEach(link => {
            if (link.getAttribute('data-page') === currentPage) {
                link.classList.add('active');
            }
        });

        if (typeof initMobileMenu === 'function') {
            initMobileMenu();
        }
        if (typeof initThemeSwitcher === 'function') {
            initThemeSwitcher();
        }
        if (typeof initHeaderHeight === 'function') {
            initHeaderHeight();
        }

    } catch (error) {
        console.error("Помилка:", error);
    }
}

loadLayout();