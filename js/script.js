// Темна / Світла тема
function initThemeSwitcher() {
    const themeBtn = document.getElementById('theme-current');
    const themeMenuItems = document.querySelectorAll('.theme-menu li');

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

    // Оновлення іконки перемикача
    function updateButtonIcon(selectedTheme) {
        const themeBtn = document.getElementById('theme-current');
        const selectedIcon = document.querySelector(`.theme-menu li[data-theme-value="${selectedTheme}"] i`);

        // Копія класу іконки у головну кнопку
        if (selectedIcon && themeBtn) {
            themeBtn.innerHTML = `<i class="${selectedIcon.className}"></i>`;
        }
    }

    function updateInterface(theme) {
        // Картинка для інтро та вогник
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

    // Відкрити теми при кліку
    themeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelector('.theme-menu').classList.toggle('show');
    });

    // Закрити теми при кліку
    document.addEventListener('click', (e) => {
        const menu = document.querySelector('.theme-menu');
        if(!menu.contains(e.target) && !themeBtn.contains(e.target)) {
            menu.classList.remove('show');
        }
    });

    // Вибір теми
    themeMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            const selectedTheme = item.getAttribute('data-theme-value');
            localStorage.setItem('user-preference', selectedTheme);
            applyTheme(selectedTheme);

            document.querySelector('.theme-menu').classList.remove('show');
        });
    });

    const savedUserPreference = localStorage.getItem('user-preference') || 'auto';
    applyTheme(savedUserPreference);

    setInterval(() => {
        if(localStorage.getItem('user-preference') === 'auto' || !localStorage.getItem('user-preference')) {
            applyTheme('auto');
        }
    }, 3600000);
}

// NAV-TOGGLE
function initMobileMenu() {
    document.querySelector('.menu-toggle').addEventListener('click', () => {
        document.querySelector('.nav').classList.toggle('open');
        document.querySelector('.menu-toggle').classList.toggle('open');
    });
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


// Висота header
function initHeaderHeight() {
    const header = document.querySelector('header');
    const root = document.querySelector(':root');

    function updateHeaderHeight() {
    root.style.setProperty('--header-height', header.offsetHeight + 'px');
    }

    window.addEventListener('resize', updateHeaderHeight);
    updateHeaderHeight();
}


// GSAP (Паралакс-ефект)
const parallaxSections = document.querySelectorAll('.parallax-section');

parallaxSections.forEach((section) => {
    const bg = section.querySelector('.parallax-bg');

    if (bg) {
        gsap.fromTo(bg, 
            { y: "-30%" }, 
            {
                y: "30%", 
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

// Події при клікові
document.addEventListener('click', function(e) {
    const target = e.target.closest('a');
    if (!target) return;

    const href = target.getAttribute('href');
    const headerHeight = header ? header.offsetHeight : 0;

    // Плавний скрол до секції
    if (target.classList.contains('scrollBtn') && href.startsWith('#')) {
        e.preventDefault();
        const section = document.querySelector(href);
        if (section) {
            lenis.scrollTo(section, { offset: -headerHeight, duration: 1.2 });
        }
        return;
    }
    
    // Сторінка в розробці
    if (href === '#' || href === '' || href === '/') {
        if (!target.classList.contains('random-btn') && !target.classList.contains('section_btn')) {
            e.preventDefault();
            window.location.href = 'dev.html';
        }
    }
});

// Анімація карток категорій
const categoryBtn = document.querySelector('.section_btn');
const categoryCards = document.querySelectorAll('.section_categories .categorie-cover');

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