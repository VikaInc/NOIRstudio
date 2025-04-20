// Галерея
// фотки галереи
const allPhotos = [
    './../images/photogal_1.jpg',
    './../images/photogal_9.jpg',
    './../images/photogal_4.jpg',
    './../images/photogal_15.jpg',
    './../images/photogal_5.jpg',
    './../images/photogal_12.jpg',
    './../images/photogal_3.jpg',
    './../images/photogal_17.jpg',
    './../images/photogal_16.jpg',
    './../images/photogal_11.jpg',
    './../images/photogal_10.jpg',
    './../images/photogal_8.jpg',
    './../images/photogal_2.jpg',
    './../images/photogal_14.jpg',
    './../images/photogal_7.jpg',
    './../images/photogal_13.jpg',
    './../images/photogal_6.jpg',
    './../images/photogal_18.jpg',
    './../images/photogal_19.jpg',
    './../images/photogal_20.jpg',
    './../images/photogal_21.jpg',
    './../images/photogal_22.jpg',
    './../images/photogal_23.jpg',
    './../images/photogal_24.jpg',
    './../images/photogal_25.jpg',
    './../images/photogal_26.jpg',
    './../images/photogal_27.jpg',
    './../images/photogal_28.jpg'
];

// Элементы дом
const galleryContainer = document.getElementById('gallery-container');
const loadMoreBtn = document.getElementById('load-more');
const fullscreenOverlay = document.getElementById('fullscreen-overlay');
const fullscreenImage = document.getElementById('fullscreen-image');
const closeFullscreen = document.getElementById('close-fullscreen');
const prevArrow = document.getElementById('prev-arrow');
const nextArrow = document.getElementById('next-arrow');

// Текущее состояние
let visiblePhotos = 9; // кол-во изначальных фото
let currentPhotoIndex = 0;

// Загрузка фоток
function loadPhotos() {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < Math.min(visiblePhotos, allPhotos.length); i++) {
        const photoUrl = allPhotos[i];
        const photoContainer = document.createElement('div');
        photoContainer.className = 'instagram__gallery__photo-container';
        photoContainer.innerHTML = `
                    <img src="${photoUrl}" alt="Фото из галереи Noir Studio">
                    <div class="inst-icon">
                        <img src="../images/instagram.svg" alt="Instagram">
                    </div>
                `;

        photoContainer.addEventListener('click', () => openFullscreen(i));
        fragment.appendChild(photoContainer);
    }

    galleryContainer.innerHTML = '';
    galleryContainer.appendChild(fragment);

    if (visiblePhotos >= allPhotos.length) {
        loadMoreBtn.style.display = 'none';
    }
}

// Фотки при нажатии
function openFullscreen(index) {
    currentPhotoIndex = index;
    fullscreenImage.src = allPhotos[index];
    fullscreenOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Закрытие
function closeFullscreenHandler() {
    fullscreenOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Прокрутка фото
function navigate(direction) {
    currentPhotoIndex += direction;

    if (currentPhotoIndex < 0) {
        currentPhotoIndex = allPhotos.length - 1;
    } else if (currentPhotoIndex >= allPhotos.length) {
        currentPhotoIndex = 0;
    }

    fullscreenImage.src = allPhotos[currentPhotoIndex];
}

//Еще фото
function loadMorePhotos() {
    visiblePhotos += 9;
    loadPhotos();
}

loadPhotos();


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
    // ... другие семейные фото
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

    // ... другие портреты
];