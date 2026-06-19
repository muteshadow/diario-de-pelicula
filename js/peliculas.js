// Тип контенту
function getMovieTypeLabel(type) {
    const typeLabels = {
        'movie': 'Película',
        'miniseries': 'Mini<br>serie',
        'series': 'Serie'
    };
    return typeLabels[type] || type;
}

// Отримати карточки з БД
function getVideoWithGenres(is_animation, type) {
    return content.filter(item => item.content_type === 'video' && item.is_animation === is_animation && item.type === type).map(item => {
        const genresText = (item.genres || []).map(gId => {
            const found = genres.find(g => g.id === gId);
            return found ? found.title : '';
        }).filter(Boolean).join(', ');
        return { ...item, genresText };
    }).sort((a, b) => (b.imdb_rating || 0) - (a.imdb_rating || 0))
}

// Трейлер
function getTopTrailerByType(is_animation, type) {
    const sorted = content.filter(item => item.content_type === 'video' && item.is_animation === is_animation && item.type === type && item.trailer_link).sort((a, b) => (b.imdb_rating || 0) - (a.imdb_rating || 0));
    return sorted.length > 0 ? sorted[0] : null;
}

// Випадкова карточка
function getRandomVideo(is_animation) {
    const filtered = content.filter(item => item.content_type === 'video' && item.is_animation === is_animation);
    if (filtered.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * filtered.length);
    const item = filtered[randomIndex];
    const genresText = (item.genres || []).map(gId => {
        const found = genres.find(g => g.id === gId);
        return found ? found.title : '';
    }).filter(Boolean).join(', ');

    return { ...item, type_label: getMovieTypeLabel(item.type), genres: genresText };
}


// Заповнення сторінки
function populateSection(type, containerId, moreBlockId, trailerBlockId, isAnimation) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const templateCard = container.querySelector('.js-card');
    if (!templateCard) return;

    const data = getVideoWithGenres(isAnimation, type);
    const topTrailer = getTopTrailerByType(isAnimation, type);

    container.innerHTML = '';

    const itemsToShow = data.slice(0, 4);

    itemsToShow.forEach((item) => {
        const card = templateCard.cloneNode(true);

        card.href = `movie.html?movie_id=${item.id}`;
        
        const img = card.querySelector('.js-poster');
        img.src = `assets/${item.poster}`;
        img.alt = item.title;

        card.querySelector('.js-type').innerHTML = getMovieTypeLabel(item.type);
        card.querySelector('.js-imdb').textContent = item.imdb_rating ? Number(item.imdb_rating).toFixed(1) : '0.0';

        const criticsBlock = card.querySelector('.js-critics-block');
        if (item.critics_rating) {
            criticsBlock.style.display = '';
            card.querySelector('.js-critics').textContent = `${item.critics_rating}%`;
        } else {
            criticsBlock.style.display = 'none';
        }

        card.querySelector('.js-genres').textContent = item.genresText;
        card.querySelector('.js-title').textContent = item.title;
        card.querySelector('.js-description').textContent = item.description || '';
        
        card.dataset.hidden = 'false'; 
        card.style.display = '';

        container.appendChild(card);
    });

    const moreBlock = document.getElementById(moreBlockId);
    if (moreBlock) {
        if (data.length > 3) {
            moreBlock.dataset.count = data.length;
            moreBlock.style.display = '';
        } else {
            moreBlock.style.display = 'none';
        }
    }

    const trailerBlock = document.getElementById(trailerBlockId);
    if (trailerBlock) {
        if (topTrailer) {
            trailerBlock.querySelector('.js-trailer-source').src = `assets/${topTrailer.trailer_link}`;
            trailerBlock.querySelector('video').load();
            
            const link = trailerBlock.querySelector('.js-trailer-link');
            link.href = `movie.html?movie_id=${topTrailer.id}`;
            link.textContent = topTrailer.title;
            
            trailerBlock.style.display = '';
        } else {
            trailerBlock.style.display = 'none';
        }
    }
}

// Ініціалізація після завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
    const isAnimationPage = window.location.pathname.includes('dibujos.html');

    populateSection('movie', 'movies-container', 'movies-more-block', 'movie-trailer-block', isAnimationPage);
    populateSection('miniseries', 'miniseries-container', 'miniseries-more-block', 'miniseries-trailer-block', isAnimationPage);
    populateSection('series', 'series-container', 'series-more-block', 'series-trailer-block', isAnimationPage);

    initTrailerControls();
    applyMovieLimits();
    
    document.querySelectorAll('.random-btn').forEach(btn => {
        btn.addEventListener('click', function(event) {
            event.preventDefault();
            triggerRandomModal(isAnimationPage);
        });
    });
});


// Трейлер кнопки 
function initTrailerControls() {
    document.querySelectorAll('.parallax-section').forEach(section => {
        const video = section.querySelector('video');
        const playBtn = section.querySelector('.play-trigger');
        if (!video || !playBtn) return; 
        const icon = playBtn.querySelector('i');
        const progress = section.querySelector('.video-progress');

        playBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                icon.classList.replace('fa-play', 'fa-pause');
            } else {
                video.pause();
                icon.classList.replace('fa-pause', 'fa-play');
            }
        });
    });

    document.querySelectorAll('.trailer-section').forEach((section) => {
        const video = section.querySelector('.parallax-bg-inner');
        const videoProgress = section.querySelector('.video-progress');
        if (!video || !videoProgress) return;

        function updateProgress() {
            const percentage = (videoProgress.value / videoProgress.max) * 100;
            videoProgress.style.setProperty('--progress', `calc(${percentage}% - (${percentage} * 0.10px))`);
        }

        videoProgress.addEventListener('input', () => {
            if (!isNaN(video.duration) && video.duration > 0) {
                video.currentTime = (videoProgress.value / 100) * video.duration;
            }
            updateProgress();
        });

        video.addEventListener('timeupdate', () => {
            if (!isNaN(video.duration) && video.duration > 0) {
                videoProgress.value = (video.currentTime / video.duration) * 100;
                updateProgress();
            }
        });
    });
}

// Зменшення кількості карток на малих екранах 
function applyMovieLimits() {
    const isMobile = window.innerWidth <= 770;
    const limit = isMobile ? 3 : 4;

    document.querySelectorAll('.movie_section').forEach(section => {
        const cards = section.querySelectorAll('.movie-card');
        const moreBtn = section.querySelector('.section_more');
        
        let visibleCount = 0; 

        cards.forEach((card) => {
            if (card.dataset.hidden !== 'true') {
                if (visibleCount < limit) {
                    card.style.display = ''; 
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            }
        });

        const total = parseInt(moreBtn?.dataset.count || visibleCount);
        if (moreBtn) {
            moreBtn.style.display = (total > limit) ? '' : 'none';
        }
    });
}

window.addEventListener('resize', applyMovieLimits);


// Випадкова карточка
function triggerRandomModal(isAnimation) {
    const modal = document.getElementById('random-modal');
    if (!modal) return;

    const movie = getRandomVideo(isAnimation);
    if (!movie) return;

    modal.querySelector('.data-modal-link').href = `movie.html?movie_id=${movie.id}`;
    modal.querySelector('.data-modal-poster').src = 'assets/' + movie.poster;
    modal.querySelector('.data-modal-type').innerHTML = movie.type_label || '';
    modal.querySelector('.data-modal-title').textContent = movie.title || '';
    modal.querySelector('.data-modal-description').textContent = movie.description || '';
    modal.querySelector('.data-modal-genres').textContent = movie.genres || '';
    modal.querySelector('.data-modal-imdb').textContent = movie.imdb_rating || '0.0';

    const criticsBlock = modal.querySelector('.data-modal-critics-block');
    if (movie.critics_rating) {
        criticsBlock.style.display = 'block';
        modal.querySelector('.data-modal-critics').textContent = movie.critics_rating + '%';
    } else {
        criticsBlock.style.display = 'none';
    }

    modal.classList.add('show');
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('random-modal');
    
    document.querySelectorAll('.random-btn').forEach(btn => {
        btn.addEventListener('click', function(event) {
            event.preventDefault();
            const mode = this.getAttribute('data-mode') || 'video'; 
            triggerRandomModal(mode);
        });
    });

    if (!modal) return;

    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.classList.remove('show');
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
});
