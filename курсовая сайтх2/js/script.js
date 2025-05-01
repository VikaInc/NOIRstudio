//Фильтры
const filterToggleBtn = document.querySelector('.filter-toggle-btn');
const filterWrapper = document.querySelector('.filter-wrapper');

// Обработчик клика по кнопке
filterToggleBtn.addEventListener('click', function() {
    filterWrapper.classList.toggle('active');
    this.innerHTML = filterWrapper.classList.contains('active') ? 'Фильтры ▲' : 'Фильтры ▼';
});

// Закрытие при клике вне меню
document.addEventListener('click', function(e) {
    if (!filterWrapper.contains(e.target) && e.target !== filterToggleBtn) {
        filterWrapper.classList.remove('active');
        filterToggleBtn.innerHTML = 'Фильтры ▼';
    }
});


const familyPhotos = [
    { src: './../images/family_photo1.jpg' },
    { src: './../images/family_photo2.jpg'},
    { src: './../images/family_photo3.jpg' },
    { src: './../images/family_photo4.jpg' },
    { src: './../images/family_photo5.jpg' },
    { src: './../images/family_photo6.jpg' },
    { src: './../images/family_photo7.jpg' },
    { src: './../images/family_photo8.jpg' },
    { src: './../images/family_photography.jpg' },
    { src: './../images/photogal_3.jpg' },
    { src: './../images/photogal_8.jpg' },
];

const portraitPhotos = [
    { src: './../images/portrait_photo1.jpg' },
    { src: './../images/portrait_photo2.jpg' },
    { src: './../images/portrait_photo3.jpg' },
    { src: './../images/portrait_photo5.jpg' },
    { src: './../images/portrait_photo6.jpg' },
    { src: './../images/portrait_photo7.jpg' },
    { src: './../images/portrait_photo8.jpg' },
    { src: './../images/portrait_photography.jpg' },
    { src: './../images/photogal_11.jpg' },
    { src: './../images/photogal_7.jpg' },
    { src: './../images/photogal_9.jpg' },
    { src: './../images/photogal_13.jpg' },
    { src: './../images/photogal_24.jpg' },
    { src: './../images/photogal_28.jpg' },
    { src: './../images/photogal_19.jpg' },
    { src: './../images/photogal_20.jpg' },
    { src: './../images/photogal_26.jpg' },
];

const weddingPhotos = [
    { src: './../images/wedding_photo1.jpg' },
    { src: './../images/wedding_photo2.jpg' },
    { src: './../images/wedding_photo3.jpg' },
    { src: './../images/wedding_photo4.jpg' },
    { src: './../images/wedding_photo5.jpg' },
    { src: './../images/wedding_photo6.jpg' },
    { src: './../images/wedding_photo7.jpg' },
    { src: './../images/wedding_photo8.jpg' },
    { src: './../images/photogal_21.jpg' },
];

const fashionPhotos = [
    { src: './../images/fashion_photo1.jpg' },
    { src: './../images/fashion_photo2.jpg' },
    { src: './../images/fashion_photo3.jpg' },
    { src: './../images/fashion_photo4.jpg' },
    { src: './../images/fashion_photo5.jpg' },
    { src: './../images/fashion_photo6.jpg' },
    { src: './../images/fashion_photo7.jpg' },
    { src: './../images/fashion_photo8.jpg' },
    { src: './../images/fashion_photography.jpg' },
    { src: './../images/photogal_1.jpg' },
    { src: './../images/photogal_5.jpg' },
    { src: './../images/photogal_6.jpg' },
    { src: './../images/photogal_7.jpg' },
    { src: './../images/photogal_9.jpg' },
    { src: './../images/photogal_10.jpg' },
    { src: './../images/photogal_13.jpg' },
    { src: './../images/photogal_16.jpg' },
    { src: './../images/photogal_18.jpg' },
    { src: './../images/photogal_14.jpg' },
    { src: './../images/photogal_15.jpg' },
    { src: './../images/photogal_2.jpg' },
];

const productPhotos = [
    { src: './../images/predmet_photo1.jpg' },
    { src: './../images/predmet_photo7.jpg' },
    { src: './../images/predmet_photo8.jpg' },
    { src: './../images/predmet_photo9.jpg' },
];

const concertPhotos = [
    { src: './../images/events_photo1.jpg' },
    { src: './../images/events_photo2.jpg' },
    { src: './../images/events_photo3.jpg' },
    { src: './../images/events_photo4.jpg' },
    { src: './../images/events_photo5.jpg' },
    { src: './../images/photogal_22.jpg' },
    { src: './../images/photogal_23.jpg' },
];

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Элементы DOM
const galleryContainer = document.getElementById('gallery-container');
const loadMoreBtn = document.getElementById('load-more');
const fullscreenOverlay = document.getElementById('fullscreen-overlay');
const fullscreenImage = document.getElementById('fullscreen-image');
const closeFullscreen = document.getElementById('close-fullscreen');
const prevArrow = document.getElementById('prev-arrow');
const nextArrow = document.getElementById('next-arrow');
const filterCheckboxes = document.querySelectorAll('input[name="filter"]');

// Текущее состояние
let visiblePhotos = 9; // кол-во изначальных фото
let currentPhotoIndex = 0;
let allPhotosMixed = [];

function initializeGallery() {
    const allPhotos = [];
    function addPhotos(target, source) {
        for (let i = 0; i < source.length; i++) {
            target.push(source[i]);
        }
    }

    addPhotos(allPhotos, familyPhotos);
    addPhotos(allPhotos, portraitPhotos);
    addPhotos(allPhotos, weddingPhotos);
    addPhotos(allPhotos, fashionPhotos);
    addPhotos(allPhotos, productPhotos);
    addPhotos(allPhotos, concertPhotos);

    //перемешка фото
    allPhotosMixed = shuffleArray(allPhotos);

    // Загружаем первые фото
    loadPhotos();
}

// 2. Функция для получения фото по категории
function getPhotosByCategory(category) {
    switch(category) {
        case 'family': return familyPhotos;
        case 'portrait': return portraitPhotos;
        case 'wedding': return weddingPhotos;
        case 'fashion': return fashionPhotos;
        case 'product': return productPhotos;
        case 'concert': return concertPhotos;
        default: return [];
    }
}

// 3. Функция фильтрации и загрузки фото
function loadPhotos() {
    const checkboxes = document.querySelectorAll('input[name="filter"]:checked');

    // Если выбран "Все" или ничего не выбрано - показываем перемешанные фото
    if (checkboxes.length === 0 || Array.from(checkboxes).some(cb => cb.value === 'all')) {
        currentPhotos = allPhotosMixed;
    } else {
        // Иначе собираем фото из выбранных категорий и перемешиваем
        const selectedPhotos = [];
        checkboxes.forEach(checkbox => {
            if (checkbox.value !== 'all') {
                selectedPhotos.push(...getPhotosByCategory(checkbox.value));
            }
        });
        currentPhotos = shuffleArray(selectedPhotos);
    }

    // Отображаем фото
    const fragment = document.createDocumentFragment();
    const photosToShow = currentPhotos.slice(0, visiblePhotos);

    photosToShow.forEach((photo, index) => {
        const photoContainer = document.createElement('div');
        photoContainer.className = 'instagram__gallery__photo-container';
        photoContainer.innerHTML = `
            <img src="${photo.src}" alt="Фото">
            <div class="inst-icon">
                <img src="../images/instagram.svg" alt="Instagram">
            </div>
        `;
        photoContainer.addEventListener('click', () => openFullscreen(index));
        fragment.appendChild(photoContainer);
    });

    galleryContainer.innerHTML = '';
    galleryContainer.appendChild(fragment);

    // Управляем кнопкой "Загрузить ещё"
    loadMoreBtn.style.display = visiblePhotos >= currentPhotos.length ? 'none' : 'block';
}

// 4. Функции для полноэкранного режима
function openFullscreen(index) {
    currentPhotoIndex = index;
    fullscreenImage.src = currentPhotos[index].src;
    fullscreenOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeFullscreenHandler() {
    fullscreenOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function navigate(direction) {
    currentPhotoIndex += direction;

    if (currentPhotoIndex < 0) {
        currentPhotoIndex = currentPhotos.length - 1;
    } else if (currentPhotoIndex >= currentPhotos.length) {
        currentPhotoIndex = 0;
    }

    fullscreenImage.src = currentPhotos[currentPhotoIndex].src;
}

// 5. Загрузить ещё фото
function loadMorePhotos() {
    visiblePhotos += 9;
    loadPhotos();
}

// 6. Обработчики событий для фильтров
filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        // Если выбрали конкретную категорию, снимаем "Все"
        if (this.value !== 'all' && this.checked) {
            document.querySelector('input[value="all"]').checked = false;
        }
        // Если выбрали "Все", снимаем другие выборы
        if (this.value === 'all' && this.checked) {
            filterCheckboxes.forEach(cb => {
                if (cb.value !== 'all') cb.checked = false;
            });
        }

        // Сбрасываем счетчик и загружаем фото
        visiblePhotos = 9;
        loadPhotos();
    });
});

// Инициализация
initializeGallery();

// Остальные обработчики
loadMoreBtn.addEventListener('click', loadMorePhotos);
closeFullscreen.addEventListener('click', closeFullscreenHandler);
fullscreenOverlay.addEventListener('click', (e) => {
    if (e.target === fullscreenOverlay) {
        closeFullscreenHandler();
    }
});
prevArrow.addEventListener('click', () => navigate(-1));
nextArrow.addEventListener('click', () => navigate(1));

// Прокрутка фоток клавиатурой
document.addEventListener('keydown', (e) => {
    if (fullscreenOverlay.style.display === 'flex') {
        if (e.key === 'Escape') {
            closeFullscreenHandler();
        } else if (e.key === 'ArrowLeft') {
            navigate(-1);
        } else if (e.key === 'ArrowRight') {
            navigate(1);
        }
    }
});


