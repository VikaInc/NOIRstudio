//Бургер меню
document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.getElementById('burgerBtn');
    const mainMenu = document.getElementById('mainMenu');

    burgerBtn.addEventListener('click', function() {
        this.classList.toggle('active'); // добавляем/удаляем класс active на бургер-меню
        mainMenu.classList.toggle('active'); // добавляем/удаляем класс active на меню

        // Блокировка прокрутки при открытом меню
        if (mainMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Закрытие меню при клике на ссылку
    const menuLinks = document.querySelectorAll('.header__menu-item a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            burgerBtn.classList.remove('active');
            mainMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});


// Модальное окно контактов
const aboutBtn = document.querySelector('.js-open-modal');
const contactModal = document.getElementById('contactModal');
const closeModal = document.querySelector('.contact-modal__close');

// Открытие модального окна
document.querySelectorAll('.js-open-modal').forEach(btn => {
    btn.addEventListener('click', function() {
        contactModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

// Закрытие модального окна
function closeContactModal() {
    contactModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

closeModal.addEventListener('click', closeContactModal);

// Закрытие при клике вне модального окна
window.addEventListener('click', function(e) {
    if (e.target === contactModal) {
        closeContactModal();
    }
});

// Валидация
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Элементы формы
const contactForm = document.querySelector('.contact-form');
const nameInput = contactForm.querySelector('input[type="text"]');
const emailInput = contactForm.querySelector('input[type="email"]');
const phoneInput = contactForm.querySelector('input[type="tel"]');
const messageInput = contactForm.querySelector('textarea');

// Создаем элементы для ошибок
function createErrorElement(input) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '12px';
    errorElement.style.marginTop = '4px';
    errorElement.style.display = 'none';
    input.parentNode.insertBefore(errorElement, input.nextSibling);
    return errorElement;
}

const nameError = createErrorElement(nameInput);
const emailError = createErrorElement(emailInput);
const phoneError = createErrorElement(phoneInput);
const messageError = createErrorElement(messageInput);

// Функции для ошибок
function showError(input, errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    input.classList.add('error');
}

function clearError(input, errorElement) {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    input.classList.remove('error');
}

// Модальное окно успеха
const successModal = document.createElement('div');
successModal.className = 'success-modal';
successModal.innerHTML = `
    <div class="success-modal__content">
        <svg class="success-modal__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <h3>Спасибо!</h3>
        <p>Мы скоро с вами свяжемся.</p>
    </div>
`;
document.body.appendChild(successModal);

function showSuccessModal() {
    // Сначала закрываем модальное окно с формой
    closeContactModal();

    // Затем показываем модальное окно успеха
    successModal.classList.add('active');

    // Автоматически закрываем через 3 секунды
    setTimeout(() => {
        successModal.classList.remove('active');
    }, 3000);
}

// Закрытие модалки успеха при клике в любое место
successModal.addEventListener('click', function() {
    successModal.classList.remove('active');
});

// Валидация формы
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    // Валидация имени
    const nameValue = nameInput.value.trim();
    if (!nameValue) {
        showError(nameInput, nameError, 'Пожалуйста, введите ваше имя');
        isValid = false;
    } else {
        clearError(nameInput, nameError);
    }

    // Валидация email
    const emailValue = emailInput.value.trim();
    if (!emailValue) {
        showError(emailInput, emailError, 'Пожалуйста, введите email');
        isValid = false;
    } else if (!validateEmail(emailValue)) {
        showError(emailInput, emailError, 'Введите корректный email (например: example@mail.com)');
        isValid = false;
    } else {
        clearError(emailInput, emailError);
    }

    // Валидация телефона (опционально)
    const phoneValue = phoneInput.value.trim();
    if (phoneValue && !/^[\d\s\-\+\(\)]+$/.test(phoneValue)) {
        showError(phoneInput, phoneError, 'Введите корректный номер телефона');
        isValid = false;
    } else {
        clearError(phoneInput, phoneError);
    }

    // Валидация сообщения
    const messageValue = messageInput.value.trim();
    if (!messageValue) {
        showError(messageInput, messageError, 'Пожалуйста, введите ваше сообщение');
        isValid = false;
    } else {
        clearError(messageInput, messageError);
    }

    // Если все валидно
    if (isValid) {
        showSuccessModal();
        contactForm.reset();
    }
});

// Валидация при вводе
nameInput.addEventListener('input', function() {
    if (nameInput.value.trim()) {
        clearError(nameInput, nameError);
    }
});

emailInput.addEventListener('input', function() {
    const email = emailInput.value.trim();
    if (email && !validateEmail(email)) {
        showError(emailInput, emailError, 'Введите корректный email');
    } else {
        clearError(emailInput, emailError);
    }
});

phoneInput.addEventListener('input', function() {
    const phone = phoneInput.value.trim();
    if (phone && !/^[\d\s\-\+\(\)]+$/.test(phone)) {
        showError(phoneInput, phoneError, 'Введите корректный номер телефона');
    } else {
        clearError(phoneInput, phoneError);
    }
});

messageInput.addEventListener('input', function() {
    if (messageInput.value.trim()) {
        clearError(messageInput, messageError);
    }
});



//анимаия при прокрутки странички
const cards = document.querySelectorAll('.about__info-card');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 }); // Анимация сработает, когда видно хотя бы 20%

cards.forEach(card => observer.observe(card));





// Форма подписки с валидацией
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('subscribeForm');
    const emailInput = document.getElementById('emailInput');
    const errorMessage = document.getElementById('errorMessage');

    if (!form) return;

    // Функции валидации
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        emailInput.classList.add('error');
    }

    function clearError() {
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
        emailInput.classList.remove('error');
    }

    function showSuccessModal() {
        const modal = document.getElementById('successModal');
        modal.classList.add('active');

        setTimeout(() => {
            modal.classList.remove('active');
        }, 3000);
    }

    // Обработчик отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = emailInput.value.trim();

        // Валидация
        if (!email) {
            showError('Пожалуйста, введите email');
            return;
        }

        if (!validateEmail(email)) {
            showError('Введите корректный email (например: example@mail.com)');
            return;
        }

        // Если валидация прошла успешно
        clearError();
        showSuccessModal();
        form.reset();
    });

    // Закрытие модалки
    const closeBtn = document.getElementById('modalCloseBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            const modal = document.getElementById('successModal');
            if (modal) modal.classList.remove('active');
        });
    }

    // Валидация при вводе
    emailInput.addEventListener('input', function() {
        const email = emailInput.value.trim();
        if (email && !validateEmail(email)) {
            showError('Введите корректный email');
        } else {
            clearError();
        }
    });
});



