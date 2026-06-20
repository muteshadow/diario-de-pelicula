document.addEventListener("DOMContentLoaded", () => {
    const rawContent = typeof content !== 'undefined' ? content : [];
    const rawGenres = typeof genres !== 'undefined' ? genres : [];

    // отримання id з url
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = parseInt(urlParams.get('movie_id'), 10);

    const movieData = rawContent.find(item => item.id === movieId);
    if (!movieData) return;

    // вивід даних
    function renderMoviePage(data) {
        document.getElementById('movie-poster').src = 'assets/' + data.poster;
        document.getElementById('movie-poster').alt = data.title;
        document.getElementById('movie-title').textContent = data.title;
        document.getElementById('movie-slogan').textContent = data.slogan ? `"${data.slogan}"` : '';
        document.getElementById('movie-description').textContent = data.description;
        document.getElementById('imdb-rating').textContent = data.imdb_rating ? Number(data.imdb_rating).toFixed(1) : '0.0';

        const criticsBox = document.getElementById('critics-box');
        if (data.critics_rating) {
            document.getElementById('critics-rating').textContent = data.critics_rating + '%';
        } else {
            criticsBox.style.display = 'none';
        }

        const mainGenresRow = document.getElementById('main-genres');
        const secondaryGenresRow = document.getElementById('secondary-genres');
        
        if (data.genres) {
            data.genres.forEach(genreId => {
                const genreObj = rawGenres.find(g => g.id === genreId);
                if (genreObj) {
                    const span = document.createElement('span');
                    span.textContent = genreObj.title;
                    if (genreObj.type === 'main') {
                        span.className = 'genre-btn main-genre';
                        mainGenresRow.appendChild(span);
                    } else {
                        span.className = 'genre-btn secondary-genre';
                        secondaryGenresRow.appendChild(span);
                    }
                }
            });
        }

        // Кадри
        const screenshotSection = document.getElementById('fotogramas');
        if (data.screenshots && data.screenshots.length > 0) {
            const container = document.getElementById('screenshots-container');
            const folder = data.is_animation === true ? 'cartoons' : 'movies';
            
            screenshotSection.style.display = 'block';
            data.screenshots.forEach((shot, index) => {
                const img = document.createElement('img');
                img.className = 'screenshot';
                img.src = `assets/${folder}/${shot.image_path}`;
                img.dataset.index = index;
                img.dataset.caption = shot.caption;
                img.alt = shot.caption;
                container.appendChild(img);
            });
        } else if (screenshotSection) {
            screenshotSection.remove();
            document.getElementById('modal')?.remove(); 
        }

        // Трейлер
        const trailerSection = document.getElementById('trailer-section');
        if (data.trailer_link) {
            trailerSection.style.display = 'block';
            const videoEl = document.getElementById('trailer-video');
            const source = document.createElement('source');
            source.src = 'assets/' + data.trailer_link;
            source.type = 'video/mp4';
            videoEl.appendChild(source);
        } else if (trailerSection) {
            trailerSection.remove(); 
        }

        // Взаємопов'язаного контенту 
        const relatedItems = rawContent.filter(item => 
            (item.parent_id === data.id && item.type !== 'track' && item.relation_type !== 'soundtrack') || 
            (data.parent_id === item.id && item.type !== 'track' && data.relation_type !== 'soundtrack') ||
            (data.id === 11 && item.id === 28) || 
            (data.id === 12 && item.id === 29)
        );

        const rawTracks = rawContent.filter(item => item.parent_id === data.id && item.type === 'track');
        
        rawTracks.sort((a, b) => a.title.localeCompare(b.title));

        let album_data = null;
        if (rawTracks.length > 0) {
            album_data = {
                album_name: data.title,
                tracks_count: rawTracks.length,
                posters: rawTracks.map(t => t.poster),
                titles: rawTracks.map(t => t.title)
            };
        }

        const relatedSection = document.getElementById('related-section');
        if (relatedItems.length > 0 || album_data) {
            document.getElementById('related-section').style.display = 'block';
            const relatedContainer = document.getElementById('related-container');

            // Вивід взаємопов'язаного контенту
            relatedItems.forEach(item => {
                const a = document.createElement('a');
                const page = item.content_type === 'book' ? 'book.html?book_id=' : 'movie.html?movie_id=';
                a.href = page + item.id;
                a.className = 'related-item';

                const img = document.createElement('img');
                img.src = 'assets/' + item.poster;
                img.alt = item.title;

                const h4 = document.createElement('h4');
                h4.textContent = item.title;

                a.appendChild(img);
                a.appendChild(h4);
                relatedContainer.appendChild(a);
            });

            // Вивід альбому саундтреків
            if (album_data) {
                const album = album_data;
                const a = document.createElement('a');
                a.href = 'tracks.html?album=' + encodeURIComponent(album.album_name);
                a.className = 'track-album related-item related-album-card';

                const stack = document.createElement('div');
                stack.className = 'album-stack';

                const layers = [2, 1, 0];
                layers.forEach((num, i) => {
                    const layer = document.createElement('div');
                    layer.className = `card-layer layer-${3 - i}`;
                    const img = document.createElement('img');
                    img.src = 'assets/' + (album.posters[num] || album.posters[0]);
                    img.alt = `layer${3 - i}`;
                    if (num === 0) {
                        img.className = 'album-main-img';
                        img.crossOrigin = 'anonymous';
                    }
                    layer.appendChild(img);
                    if (num === 0) {
                        const span = document.createElement('span');
                        span.className = 'track-count';
                        span.innerHTML = `<i class="fa-solid fa-music"></i> ${album.tracks_count}`;
                        layer.appendChild(span);
                    }
                    stack.appendChild(layer);
                });

                const info = document.createElement('div');
                info.className = 'album-info';

                const h4 = document.createElement('h4');
                h4.className = 'album-title';
                h4.textContent = album.titles[0];

                const p = document.createElement('p');
                p.className = 'album-parent';
                p.textContent = `De: ${album.album_name}`;

                info.appendChild(h4);
                info.appendChild(p);
                a.appendChild(stack);
                a.appendChild(info);
                relatedContainer.appendChild(a);
            }
        } else if (relatedSection) {
            relatedSection.remove();
        }
    }

    renderMoviePage(movieData);

    // модалка скріншотів
    const screenshotsList = document.querySelectorAll('.screenshot');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const caption = document.getElementById('modal-caption');
    const carousel = document.getElementById('carousel');
    const closeBtn = document.querySelector('.close');

    let images = [];
    let currentIndex = 0;

    screenshotsList.forEach((img, index) => {
        images.push({
            src: img.src,
            caption: img.dataset.caption
        });
        img.addEventListener('click', () => openModal(index));
    });

    function openModal(index) {
        if (!modal) return;
        modal.style.display = 'block';
        currentIndex = index;
        updateModal();
        renderCarousel();
    }

    function updateModal() {
        if (modalImg) modalImg.src = images[currentIndex].src;
        if (caption) caption.textContent = images[currentIndex].caption || '';
    }

    function renderCarousel() {
        if (!carousel) return;
        carousel.innerHTML = '';
        images.forEach((img, index) => {
            const thumb = document.createElement('img');
            thumb.src = img.src;
            if (index === currentIndex) {
                thumb.classList.add('active');
            }
            thumb.addEventListener('click', () => {
                currentIndex = index;
                updateModal();
                renderCarousel();
            });
            carousel.appendChild(thumb);
        });
    }

    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.style.display = 'none';
        };
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-container')) {
                modal.style.display = 'none';
            }
        });
    }

    function nextImage() {
        if (!images.length) return;
        currentIndex = (currentIndex + 1) % images.length;
        updateModal();
        renderCarousel();
    }

    function prevImage() {
        if (!images.length) return;
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateModal();
        renderCarousel();
    }

    // вивід трейлера
    const video = document.getElementById('trailer-video');

    if (video) {
        const playBtn = document.getElementById('play-btn');
        const playIcon = playBtn ? playBtn.querySelector('i') : null;
        const progress = document.getElementById('progress');
        const volume = document.getElementById('volume');
        const volumeIcon = document.getElementById('volume-icon') ? document.getElementById('volume-icon').querySelector('i') : null;
        const trailerPlayer = document.querySelector('.trailer-player');
        const trailerFullscreenBtn = document.getElementById('fullscreen-btn');
        const fullscreenIcon = trailerFullscreenBtn ? trailerFullscreenBtn.querySelector('i') : null;

        function updateProgress() {
            if (!progress) return;
            const percentage = (progress.value / progress.max) * 100;
            progress.style.setProperty('--progress', `calc(${percentage}% - (${percentage} * 0.10px))`);
        }

        function togglePlay() {
            if (video.paused) {
                video.play();
                if (playIcon) playIcon.classList.replace('fa-play', 'fa-pause');
            } else {
                video.pause();
                if (playIcon) playIcon.classList.replace('fa-pause', 'fa-play');
            }
        }

        if (playBtn) playBtn.addEventListener('click', togglePlay);
        video.addEventListener('click', togglePlay);

        video.addEventListener('timeupdate', () => {
            if (progress && !isNaN(video.duration) && video.duration > 0) {
                const percent = (video.currentTime / video.duration) * 100;
                progress.value = percent;
                updateProgress();
            }
        });

        if (progress) {
            progress.addEventListener('input', () => {
                if (!isNaN(video.duration) && video.duration > 0) {
                    video.currentTime = (progress.value / 100) * video.duration;
                }
                updateProgress();
            });
        }

        function updateVolumeProgress() {
            if (!volume) return;
            const percentage = (volume.value / volume.max) * 100;
            volume.style.setProperty('--volume-progress', `calc(${percentage}% - (${percentage} * 0.10px))`);
        }

        if (volume) {
            volume.addEventListener('input', () => {
                video.volume = volume.value;
                if (volumeIcon) {
                    volumeIcon.className = 'fa-solid';
                    if (volume.value == 0) {
                        volumeIcon.classList.add('fa-volume-xmark');
                    } else if (volume.value < 0.5) {
                        volumeIcon.classList.add('fa-volume-low');
                    } else {
                        volumeIcon.classList.add('fa-volume-high');
                    }
                }
                updateVolumeProgress();
            });
        }

        if (trailerFullscreenBtn && trailerPlayer) {
            trailerFullscreenBtn.addEventListener('click', () => {
                if (!document.fullscreenElement) {
                    trailerPlayer.requestFullscreen().catch(err => {
                        console.error(err.message);
                    });
                    if (fullscreenIcon) fullscreenIcon.classList.replace('fa-expand', 'fa-compress');
                } else {
                    document.exitFullscreen();
                    if (fullscreenIcon) fullscreenIcon.classList.replace('fa-compress', 'fa-expand');
                }
            });
        }

        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement && fullscreenIcon) {
                fullscreenIcon.className = 'fa-solid fa-expand';
            }
        });

        updateVolumeProgress();
        updateProgress();
    }

    // події клавіатури
    document.addEventListener('keydown', (e) => {
        if (modal && modal.style.display === 'block') {
            switch (e.key) {
                case 'ArrowRight':
                    nextImage();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'Escape':
                    modal.style.display = 'none';
                    break;
            }
            return; 
        }

        if (!video) return;

        const isVideoPlaying = !video.paused && !video.ended;
        const isVideoFullscreen = !!document.fullscreenElement;

        if (isVideoPlaying || isVideoFullscreen) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === ' ') {
                e.preventDefault(); 
            }
            switch (e.key) {
                case 'ArrowRight':
                    video.currentTime = Math.min(video.currentTime + 5, video.duration);
                    break;
                case 'ArrowLeft':
                    video.currentTime = Math.max(video.currentTime - 5, 0);
                    break;
                case ' ':
                    if (video.paused) {
                        video.play();
                        const playIcon = document.getElementById('play-btn')?.querySelector('i');
                        if (playIcon) playIcon.classList.replace('fa-play', 'fa-pause');
                    } else {
                        video.pause();
                        const playIcon = document.getElementById('play-btn')?.querySelector('i');
                        if (playIcon) playIcon.classList.replace('fa-pause', 'fa-play');
                    }
                    break;
            }
        }
    });
});