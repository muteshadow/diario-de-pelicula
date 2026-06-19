document.addEventListener("DOMContentLoaded", () => {
    const rawContent = typeof content !== 'undefined' ? content : [];

    // getTracks
    function parseAndGroupTracks(contentArray) {
        const albums = {};

        const parentMap = {};
        contentArray.forEach(item => {
            if (item.type === 'movie' || item.type === 'book' || item.content_type === 'video' || item.content_type === 'book') {
                parentMap[item.id] = item;
            }
        });

        const trackItems = contentArray
            .filter(item => item.type === 'track')
            .sort((a, b) => a.title.localeCompare(b.title));

        trackItems.forEach(track => {
            let parentTitle = 'Otros';
            let parentType = 'video';

            if (track.parent_id && track.relation_type === 'soundtrack') {
                const parentObj = parentMap[track.parent_id];
                if (parentObj) {
                    parentTitle = parentObj.title;
                    parentType = parentObj.content_type || parentObj.type || 'video';
                }
            }
            
            if (!albums[parentTitle]) {
                albums[parentTitle] = {
                    parent_type: parentType,
                    tracks: []
                };
            }
            
            albums[parentTitle].tracks.push(track);
        });

        const sortedAlbums = {};
        Object.keys(albums).sort().forEach(key => {
            sortedAlbums[key] = albums[key];
        });

        return sortedAlbums;
    }

    const albumsData = parseAndGroupTracks(rawContent);

    // --- DOM ЕЛЕМЕНТИ ---
    const audioPlayer = document.getElementById("global-audio-player");
    const mainPlayToggle = document.getElementById("main-play-toggle");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const progressBar = document.getElementById("track-progress");
    const tracksListContainer = document.getElementById("sidebar-tracks-list");
    
    const playerCover = document.getElementById("player-cover");
    const playerTitle = document.getElementById("player-title");
    const playerType = document.getElementById("player-type");

    const mainAlbumTitle = document.getElementById("main-album-title");
    const mainAlbumType = document.getElementById("main-album-type");
    const albumsGrid = document.getElementById("albums-grid");

    let currentTracksArray = [];
    let currentTrackIndex = 0;

    const originTypes = {
        'official': 'Oficial',
        'fanmade': 'FanMade',
        'cover': 'Cover'
    };

    // --- ІНІЦІАЛІЗАЦІЯ СТОРІНКИ ---
    function initPage() {
        const urlParams = new URLSearchParams(window.location.search);
        let currentAlbumName = urlParams.get('album') || 'Hazbin Hotel';

        if (!albumsData[currentAlbumName] && Object.keys(albumsData).length > 0) {
            currentAlbumName = Object.keys(albumsData)[0];
        }

        const activeAlbumData = albumsData[currentAlbumName] || null;
        currentTracksArray = activeAlbumData ? activeAlbumData['tracks'] : [];
        const activeParentType = activeAlbumData ? activeAlbumData['parent_type'] : 'video';

        if (mainAlbumTitle) mainAlbumTitle.textContent = currentAlbumName;
        if (mainAlbumType) mainAlbumType.textContent = activeParentType === 'book' ? 'Libro' : 'Película';

        renderTracksList(currentTracksArray);
        renderOtherAlbums(currentAlbumName);

        if (currentTracksArray.length > 0) {
            loadTrack(0);
        }
    }

    // Рендер списку треків
    function renderTracksList(tracks) {
        tracksListContainer.innerHTML = "";

        tracks.forEach((track, idx) => {
            const li = document.createElement("li");
            li.className = `playlist-item ${idx === 0 ? 'active' : ''} ${track.origin_type === 'fanmade' ? 'filter-fanmade' : 'filter-official'}`;
            li.setAttribute("data-index", idx);
            li.setAttribute("data-title", track.title);

            const img = document.createElement("img");
            img.className = "item-cover";
            img.src = `assets/${track.poster}`;
            img.alt = "Cover";

            const meta = document.createElement("div");
            meta.className = "item-meta";

            const titleDiv = document.createElement("div");
            titleDiv.className = "item-title";
            titleDiv.textContent = track.title;

            const originDiv = document.createElement("div");
            originDiv.className = "item-origin";
            originDiv.textContent = originTypes[track.origin_type] || 'Oficial';

            meta.appendChild(titleDiv);
            meta.appendChild(originDiv);

            const durationSpan = document.createElement("span");
            durationSpan.className = "duration-text";
            durationSpan.setAttribute("data-duration", track.duration);
            durationSpan.textContent = track.duration;

            li.appendChild(img);
            li.appendChild(meta);
            li.appendChild(durationSpan);

            tracksListContainer.appendChild(li);
        });

        attachPlaylistClickEvents();
    }

    // Рендер сітки інших альбомів
    function renderOtherAlbums(currentAlbumName) {
        if (!albumsGrid) return;
        albumsGrid.innerHTML = "";

        Object.keys(albumsData).forEach(parentTitle => {
            if (parentTitle === currentAlbumName) return; 

            const data = albumsData[parentTitle];
            const tracks = data.tracks;
            if (tracks.length === 0) return;

            const mainTrack = tracks[0];

            const a = document.createElement("a");
            a.href = `?album=${encodeURIComponent(parentTitle)}`;
            a.className = "track-album";

            const stack = document.createElement("div");
            stack.className = "album-stack";

            for (let i = 3; i >= 1; i--) {
                const layer = document.createElement("div");
                layer.className = `card-layer layer-${i}`;
                const img = document.createElement("img");
                
                let trackIdx = i - 1;
                img.src = `assets/${tracks[trackIdx] ? tracks[trackIdx].poster : mainTrack.poster}`;
                
                if (i === 1) {
                    img.className = "album-main-img";
                    img.alt = mainTrack.title;
                    img.setAttribute("crossOrigin", "anonymous");
                    
                    const countSpan = document.createElement("span");
                    countSpan.className = "track-count";
                    countSpan.innerHTML = `<i class="fa-solid fa-music"></i> ${tracks.length}`;
                    layer.appendChild(img);
                    layer.appendChild(countSpan);
                } else {
                    img.alt = `layer${i}`;
                    layer.appendChild(img);
                }
                stack.appendChild(layer);
            }

            const info = document.createElement("div");
            info.className = "album-info";

            const h4 = document.createElement("h4");
            h4.className = "album-title";
            h4.textContent = mainTrack.title;

            const p = document.createElement("p");
            p.className = "album-parent";
            p.textContent = `De: ${parentTitle}`;

            info.appendChild(h4);
            info.appendChild(p);

            a.appendChild(stack);
            a.appendChild(info);

            albumsGrid.appendChild(a);
        });
    }

    // --- ПЛЕЄР ТА ПОДІЇ ---
    function resetTrackDurations() {
        document.querySelectorAll(".playlist-item").forEach(item => {
            const zone = item.querySelector(".duration-text");
            if (zone) zone.textContent = zone.getAttribute("data-duration");
        });
    }

    function attachPlaylistClickEvents() {
        document.querySelectorAll(".playlist-item").forEach(item => {
            item.addEventListener("click", () => {
                const idx = parseInt(item.getAttribute("data-index"));
                
                if (item.classList.contains("active")) {
                    if (audioPlayer.paused) {
                        audioPlayer.play();
                        mainPlayToggle.innerHTML = '<i class="fa-solid fa-pause"></i>';
                    } else {
                        audioPlayer.pause();
                        mainPlayToggle.innerHTML = '<i class="fa-solid fa-play"></i>';
                    }
                    return;
                }

                document.querySelectorAll(".playlist-item").forEach(i => i.classList.remove("active"));
                item.classList.add("active");
                
                loadTrack(idx);
                audioPlayer.play();
                mainPlayToggle.innerHTML = '<i class="fa-solid fa-pause"></i>';
            });
        });
    }

    function loadTrack(index) {
        if (index < 0 || index >= currentTracksArray.length) return;
        currentTrackIndex = index;
        const track = currentTracksArray[index];

        playerCover.src = `assets/${track.poster}`;
        playerTitle.textContent = track.title;
        playerType.textContent = originTypes[track.origin_type] || 'Саундтрек';
        audioPlayer.src = `assets/${track.audio}`;
        
        progressBar.value = 0;
        updateAudioProgress(); 

        document.querySelectorAll(".playlist-item").forEach(item => {
            if (parseInt(item.getAttribute("data-index")) === index) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });

        resetTrackDurations();
    }

    mainPlayToggle.addEventListener("click", () => {
        if (!audioPlayer.src) return;
        if (audioPlayer.paused) {
            audioPlayer.play();
            mainPlayToggle.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
            audioPlayer.pause();
            mainPlayToggle.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    });

    function getNextVisibleTrackIndex(direction) {
        let step = direction;
        let checkIdx = currentTrackIndex + step;
        const items = Array.from(document.querySelectorAll(".playlist-item"));
        
        while (checkIdx >= 0 && checkIdx < currentTracksArray.length) {
            const matchedDOM = items.find(i => parseInt(i.getAttribute("data-index")) === checkIdx);
            if (matchedDOM && !matchedDOM.classList.contains("hidden")) {
                return checkIdx;
            }
            checkIdx += step;
        }
        return -1;
    }

    nextBtn.addEventListener("click", () => {
        const nextIdx = getNextVisibleTrackIndex(1);
        if (nextIdx !== -1) { 
            loadTrack(nextIdx); 
            audioPlayer.play(); 
            mainPlayToggle.innerHTML = '<i class="fa-solid fa-pause"></i>'; 
        }
    });

    prevBtn.addEventListener("click", () => {
        const prevIdx = getNextVisibleTrackIndex(-1);
        if (prevIdx !== -1) { 
            loadTrack(prevIdx); 
            audioPlayer.play(); 
            mainPlayToggle.innerHTML = '<i class="fa-solid fa-pause"></i>'; 
        }
    });

    audioPlayer.addEventListener("ended", () => {
        resetTrackDurations();
        const nextIdx = getNextVisibleTrackIndex(1);
        if (nextIdx !== -1) { 
            loadTrack(nextIdx); 
            audioPlayer.play(); 
            mainPlayToggle.innerHTML = '<i class="fa-solid fa-pause"></i>'; 
        } else {
            mainPlayToggle.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    });

    function updateAudioProgress() {
        const percentage = progressBar.value; 
        progressBar.style.setProperty('--progress', `calc(${percentage}% - (${percentage} * 0.10px))`);
    }

    progressBar.addEventListener("input", () => {
        if (!isNaN(audioPlayer.duration) && audioPlayer.duration > 0) {
            audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
        }
        updateAudioProgress(); 
    });

    function formatTime(seconds) {
        if (isNaN(seconds) || seconds < 0) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    audioPlayer.addEventListener("timeupdate", () => {
        if (!isNaN(audioPlayer.duration) && audioPlayer.duration > 0) {
            progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            updateAudioProgress();

            const timeLeft = audioPlayer.duration - audioPlayer.currentTime;
            const activeZone = document.querySelector(".playlist-item.active .duration-text");
            if (activeZone) {
                activeZone.textContent = formatTime(timeLeft);
            }
        }
    });

    // --- ФІЛЬТРАЦІЯ ---
    const selectWrapper = document.querySelector('.custom-select-wrapper');
    const selectTrigger = document.querySelector('.custom-select-trigger');
    const customOptions = document.querySelectorAll('.custom-option');

    if (selectTrigger) {
        selectTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            selectWrapper.classList.toggle('open');
        });

        document.addEventListener('click', () => {
            selectWrapper.classList.remove('open');
        });

        customOptions.forEach(option => {
            option.addEventListener('click', function() {
                customOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                selectTrigger.textContent = this.textContent;

                const val = this.getAttribute('data-value');
                document.querySelectorAll(".playlist-item").forEach(item => {
                    if (val === "all") {
                        item.classList.remove("hidden");
                    } else if (val === "official" && item.classList.contains("filter-official")) {
                        item.classList.remove("hidden");
                    } else if (val === "fanmade" && item.classList.contains("filter-fanmade")) {
                        item.classList.remove("hidden");
                    } else {
                        item.classList.add("hidden"); 
                    }
                });
            });
        });
    }

    initPage();
});