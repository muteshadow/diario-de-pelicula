document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const title = document.getElementById('form-title');

    // Перемикання на реєстрацію
    document.getElementById('show-register').addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        title.textContent = 'Registro';
    });

    // Перемикання на логін
    document.getElementById('show-login').addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
        title.textContent = 'Iniciar sesión';
    });

    // Обробка форми Входу
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userInput = document.getElementById('login_or_email').value;
        const passInput = document.getElementById('password').value;

        if (userInput && passInput.length >= 8) {
            window.location.href = "users/profile.html"; 
        } else {
            alert("Пароль має бути мінімум 8 символів");
        }
    });

    // Обробка форми Реєстрації
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const login = document.getElementById('reg-login').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-password').value;

        if (password.length < 8) {
            alert("Пароль має бути мінімум 8 символів");
            return;
        }

        localStorage.setItem('user', JSON.stringify({ login: login, email: email }));
        window.location.href = "users/profile.html";
    });
});

// Показати / приховати пароль
function togglePassword(inputId, el) {
    const input = document.getElementById(inputId);
    const icon = el.querySelector('i');

    if (input.type === "password") {
        input.type = "text";
        icon.className = "fa-regular fa-eye-slash";
    } else {
        input.type = "password";
        icon.className = "fa-regular fa-eye";
    }
}