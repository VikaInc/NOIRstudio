//Бургер меню
document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.getElementById('burgerBtn');
    const mainMenu = document.getElementById('mainMenu');

    burgerBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mainMenu.classList.toggle('active');

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


//Модальное окно
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
closeModal.addEventListener('click', function() {
    contactModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Возвращаем скролл
});

// Закрытие при клике вне модального окна
window.addEventListener('click', function(e) {
    if (e.target === contactModal) {
        contactModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Обработка формы (заменить на реальную отправку)
// document.querySelector('.contact-form').addEventListener('submit', function(e) {
//     e.preventDefault();
//     alert('Спасибо! Мы скоро с вами свяжемся.');
//     contactModal.style.display = 'none';
//     document.body.style.overflow = 'auto';
//     this.reset();
// });
