const savedUserPreference = localStorage.getItem('user-preference') || 'auto';
applyTheme(savedUserPreference);

function getAutoTheme() {
    const hour = new Date().getHours();
    return (hour >= 7 && hour < 19) ? 'light' : 'dark';
}

function applyTheme(theme) {
    let activeTheme = theme;
    if (theme == 'auto') {
        activeTheme = getAutoTheme();
    }
    document.documentElement.setAttribute('data-theme', activeTheme);
    updateInterface(activeTheme);
    updateButtonIcon(theme);
}

function updateButtonIcon(selectedTheme) {
    const themeBtn = document.getElementById('theme-current');
    const selectedIcon = document.querySelector(`.theme-menu li[data-theme-value="${selectedTheme}"] i`);
    if (selectedIcon && themeBtn) {
        themeBtn.innerHTML = `<i class="${selectedIcon.className}"></i>`;
    }
}

function updateInterface(theme) {
    const characterImg = document.querySelector('.six-img');
    const fireGlow = document.querySelector('.fire-glow');
    
    if (characterImg && fireGlow) {
        if (theme === 'light') {
            characterImg.src = "assets/img/gravity falls.png";
            fireGlow.classList.remove('glow-dark');
            fireGlow.classList.add('glow-light');
        } else {
            characterImg.src = "assets/img/six.png";
            fireGlow.classList.remove('glow-light');
            fireGlow.classList.add('glow-dark');
        }
    }   
}

setInterval(() => {
    if (localStorage.getItem('user-preference') === 'auto' || !localStorage.getItem('user-preference')) {
        applyTheme('auto');
    }
}, 3600000);


// Мобільне меню (NAV-TOGGLE)
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            menuToggle.classList.toggle('open');
        });
    }
}

// Перемикач тем (кліки та меню)
function initThemeSwitcher() {
    const themeBtn = document.getElementById('theme-current');
    const themeMenuItems = document.querySelectorAll('.theme-menu li');

    if (themeBtn) {
        themeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const themeMenu = document.querySelector('.theme-menu');
            if (themeMenu) {
                themeMenu.classList.toggle('show');
            }
        });
    }

    // Закрити теми при кліку за межами
    document.addEventListener('click', (e) => {
        const menu = document.querySelector('.theme-menu');
        const themeBtn = document.getElementById('theme-current');
        if (menu && themeBtn) {
            if (!menu.contains(e.target) && !themeBtn.contains(e.target)) {
                menu.classList.remove('show');
            }
        }
    });

    // Вибір теми зі списку
    themeMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            const selectedTheme = item.getAttribute('data-theme-value');
            localStorage.setItem('user-preference', selectedTheme);
            applyTheme(selectedTheme);

            const themeMenu = document.querySelector('.theme-menu');
            if (themeMenu) {
                themeMenu.classList.remove('show');
            }
        });
    });

    // Оновлюємо іконку ще раз, коли HTML вже завантажився
    updateButtonIcon(localStorage.getItem('user-preference') || 'auto');
}

// Розрахунок висоти header
function initHeaderHeight() {
    const header = document.querySelector('header') || document.getElementById('header');
    const root = document.querySelector(':root');

    if (!header || !root) return;

    function updateHeaderHeight() {
        root.style.setProperty('--header-height', header.offsetHeight + 'px');
    }

    window.addEventListener('resize', updateHeaderHeight);
    updateHeaderHeight();
}


// Lenis (плавний скрол)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 1,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


// GSAP (Паралакс-ефект)
const parallaxSections = document.querySelectorAll('.parallax-section');
parallaxSections.forEach((section) => {
    const bg = section.querySelector('.parallax-bg');
    if (bg) {
        gsap.fromTo(bg, 
            { y: "-25%", scale: 1.5 }, 
            {
                y: "25%", 
                scale: 1.5,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom", 
                    end: "bottom top",  
                    scrub: true         
                }
            }
        );
    }
});


// Глобальний делегат подій для посилань (динамічно вираховує висоту актуального хедера)
document.addEventListener('click', function(e) {
    const target = e.target.closest('a');
    if (!target) return;

    const href = target.getAttribute('href');
    const header = document.querySelector('header') || document.getElementById('header');
    const headerHeight = header ? header.offsetHeight : 0;

    // Плавний скрол до секції
    if (target.classList.contains('scrollBtn') && href && href.startsWith('#')) {
        e.preventDefault();
        const section = document.querySelector(href);
        if (section) {
            lenis.scrollTo(section, { offset: -headerHeight, duration: 1.2 });
        }
        return;
    }
    
    // Сторінка в розробці (перенаправлення на статику dev.html)
    const devPages = ['mas.html', 'search.html'];
    const isDevPage = devPages.some(page => href.includes(page));

    if (isDevPage) {
        e.preventDefault();
        window.location.href = 'dev.html';
    }
});


// Анімація карток категорій
const categoryBtn = document.querySelector('.section_btn');
const categoryCards = document.querySelectorAll('.categories .categorie-cover');

if (categoryBtn) {
    categoryBtn.addEventListener('click', function(e) {
        e.preventDefault();
        categoryCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('highlight-wave');
                card.addEventListener('animationend', () => {
                    card.classList.remove('highlight-wave');
                }, { once: true });
            }, index * 100);
        });
    });
}
