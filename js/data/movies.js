const movies = [
    {
        id: 1,
        title: 'Шкільні духи',
        type: 'series',
        genres: 'містика, детектив, драма, підлітки, смерть, таємниці',
        imdb_rating: 7.7,
        critics_rating: 91,
        description: 'Після загадкової смерті старшокласниця застрягає між світами й починає власне розслідування, намагаючись з’ясувати, хто і чому позбавив її життя.',
        poster: 'movies/School Spirits.png',
        trailer_link: 'trailers/School Spirits.mp4'
    },
    {
        id: 2,
        title: 'Тринадцять',
        type: 'miniseries',
        genres: 'детектив, драма, психологічний трилер, повернення, таємниці минулого',
        imdb_rating: 7.2,
        critics_rating: 88,
        description: 'Айві Моксон повертається додому після 13 років жахливого полону. Поліція намагається встановити всю правду про її викрадення, ув’язнення та дивовижне виживання.',
        poster: 'movies/Thirteen.png',
        trailer_link: ''
    },
    {
        id: 3,
        title: 'Хід королеви',
        type: 'miniseries',
        genres: 'драма, біографія, шахи, геніальність, залежність, самотність',
        imdb_rating: 8.5,
        critics_rating: 96,
        description: 'Обдарована шахістка Бет Гармон проходить шлях від сиротинця до світових турнірів, борючись із внутрішніми демонами та ціною власного таланту.',
        poster: 'movies/The Queen’s Gambit.png',
        trailer_link: ''
    },
    {
        id: 4,
        title: 'Неймовірно',
        type: 'miniseries',
        genres: 'кримінал, драма, детектив, насильство, правда, розслідування',
        imdb_rating: 8.3,
        critics_rating: 98,
        description: 'Історія розслідування серії зґвалтувань, у центрі якої — дівчина, чиїм свідченням спершу відмовляються вірити.',
        poster: 'movies/Unbelievable.png',
        trailer_link: ''
    },
    {
        id: 5,
        title: "Друг сім'ї",
        type: 'miniseries',
        genres: 'кримінал, драма, трилер, маніпуляція, викрадення, секта, на реальних подіях',
        imdb_rating: 7.3,
        critics_rating: 92,
        description: 'Історія сім’ї, в довіру якої втирається харизматичний і небезпечний чоловік, що використовує релігію та психологічний тиск, щоб викрасти їх дочку і роками контролювати її життя.',
        poster: 'movies/A friend of the family.png',
        trailer_link: 'trailers/A friend of the family.mp4'
    },
    {
        id: 6,
        title: 'Вонка',
        type: 'movie',
        genres: 'фентезі, мюзикл, пригоди, мрії, натхнення, шлях до успіху',
        imdb_rating: 6.9,
        critics_rating: 82,
        description: 'Молодий і винахідливий Віллі Вонка розпочинає свій шлях у світі шоколаду, долаючи труднощі, суперників і випробування, що формують його майбутнє.',
        poster: 'movies/Wonka.png',
        trailer_link: ''
    },
    {
        id: 7,
        title: 'Товариство Онор',
        type: 'movie',
        genres: 'комедія, драма, школа, суперництво, амбіції, дорослішання',
        imdb_rating: 6.5,
        critics_rating: 86,
        description: 'Амбітна школярка Онор готова на все заради вступу до престижного університету, але несподівані почуття й конкуренція змушують її переосмислити власні пріоритети.',
        poster: 'movies/Honor Society.png',
        trailer_link: ''
    },
    {
        id: 8,
        title: 'Емма.',
        type: 'movie',
        genres: 'мелодрама, комедія, класика, світське суспільство, кохання, самообман',
        imdb_rating: 6.7,
        critics_rating: 86,
        description: 'Впевнена у своєму хисті влаштовувати чужі долі, Емма Вудгаус поступово усвідомлює власні помилки й справжні почуття.',
        poster: 'movies/Emma..png',
        trailer_link: ''
    },
    {
        id: 9,
        title: 'Там, де співають раки',
        type: 'movie',
        genres: 'драма, детектив, екранізація, самотність, природа, таємниця, дорослішання',
        imdb_rating: 7.2,
        critics_rating: 34,
        description: 'Дівчина, що виросла в ізоляції серед боліт, стає головною підозрюваною у вбивстві місцевого жителя, й історія її життя поступово розкриває правду про любов, зраду і виживання.',
        poster: 'movies/Where the Crawdads Sing.png',
        trailer_link: 'trailers/Where the Crawdads Sing.mp4'
    },
    {
        id: 10,
        title: 'Той, що біжить лабіринтом',
        type: 'movie',
        genres: 'фантастика, антиутопія, трилер, виживання, лабіринт, втрата пам’яті, експеримент',
        imdb_rating: 6.8,
        critics_rating: 66,
        description: 'Підліток на ім’я Томас приходить до тями у загадковому місці, оточеному смертельно небезпечним лабіринтом. Не пам’ятаючи свого минулого, він разом з іншими намагається знайти вихід і зрозуміти, хто та навіщо влаштував цей жорстокий експеримент.',
        poster: 'movies/The Maze Runner.png',
        trailer_link: ''
    },
    {
        id: 11,
        title: 'Той, що біжить лабіринтом: Випробування вогнем',
        type: 'movie',
        genres: 'фантастика, антиутопія, трилер, виживання, пустка, випробування, змова',
        imdb_rating: 6.3,
        critics_rating: 47,
        description: 'Томас і ті, хто вижив, залишають лабіринт і опиняються у ще небезпечнішому світі, де їм доведеться пройти нові смертельні випробування та викрити справжні цілі організації.',
        poster: 'movies/Maze Runner_ The Scorch Trials.png',
        trailer_link: ''
    },
    {
        id: 12,
        title: 'Той, що біжить лабіринтом: Ліки від смерті',
        type: 'movie',
        genres: 'фантастика, антиутопія, бойовик, драма, опір, жертва, фінал',
        imdb_rating: 6.3,
        critics_rating: 42,
        description: 'Томас очолює небезпечну місію з порятунку друзів і пошуку ліків від смертельного вірусу, стикаючись із правдою про світ і ціною спасіння людства.',
        poster: 'movies/Maze Runner_ The Death Cure.png',
        trailer_link: ''
    },
];

function renderMoviesByType(type, containerId, limit = 4) {
    const container = document.getElementById(containerId);
    const template = document.getElementById('movie-template');
    const moreBlock = document.getElementById(`${type}-more`);

    if (!container || !template) return;

    // Фільтруємо один раз
    const allOfType = movies.filter(m =>
        m.type?.trim().toLowerCase() === type.toLowerCase()
    );

    const filtered = allOfType.slice(0, limit);

    container.innerHTML = '';

    const typeLabels = {
        movie: 'Фільм',
        miniseries: 'Міні-серіал',
        series: 'Серіал'
    };

    filtered.forEach(movie => {
        const clone = template.content.cloneNode(true);

        clone.querySelector('.movie-poster').src = `assets/${movie.poster}`;
        clone.querySelector('.movie-poster').alt = movie.title;
        clone.querySelector('.card-title').textContent = movie.title;
        clone.querySelector('.genres').textContent = movie.genres;
        clone.querySelector('.description').textContent = movie.description;
        clone.querySelector('.rating-imdb').textContent = movie.imdb_rating;
        clone.querySelector('.rating-critics').textContent = movie.critics_rating + '%';
        clone.querySelector('.card-type').textContent = typeLabels[movie.type];

        container.appendChild(clone);
    });

    // Показ кнопки
    if (moreBlock) {
        moreBlock.style.display = allOfType.length > limit ? 'block' : 'none';
    }
}

function renderTopMovie() {
    const types = [
        {
            type: 'movie',
            sectionId: 'top-movie-section',
            videoId: 'top-movie-video',
            titleId: 'top-movie-title'
        },
        {
            type: 'miniseries',
            sectionId: 'top-miniseries-section',
            videoId: 'top-miniseries-video',
            titleId: 'top-miniseries-title'
        },
        {
            type: 'series',
            sectionId: 'top-series-section',
            videoId: 'top-series-video',
            titleId: 'top-series-title'
        }
    ];

    types.forEach(cfg => {
        const item = movies.find(m =>
            m.type === cfg.type && m.trailer_link
        );

        if (!item) return;

        const section = document.getElementById(cfg.sectionId);
        const video = document.getElementById(cfg.videoId);
        const title = document.getElementById(cfg.titleId);

        if (!section || !video || !title) return;

        video.src = `assets/${item.trailer_link}`;
        title.textContent = item.title;
    });

    // 🔥 Твоя логіка відео — НЕ чіпав, тільки зробив безпечнішою
    document.querySelectorAll('.parallax-section').forEach(section => {
        const video = section.querySelector('video');
        const playBtn = section.querySelector('.play-trigger');
        const icon = playBtn?.querySelector('i');
        const progress = section.querySelector('.video-progress');

        if (!video || !playBtn || !icon || !progress) return;

        // Play / Pause
        playBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                icon.classList.replace('fa-play', 'fa-pause');
            } else {
                video.pause();
                icon.classList.replace('fa-pause', 'fa-play');
            }
        });

        // Повзунок
        video.addEventListener('timeupdate', () => {
            if (!video.duration) return;
            const percentage = (video.currentTime / video.duration) * 100;
            progress.value = percentage;
        });

        // Перемотка
        progress.addEventListener('input', () => {
            if (!video.duration) return;
            const time = (progress.value / 100) * video.duration;
            video.currentTime = time;
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderMoviesByType('movie', 'movies-container');
    renderMoviesByType('miniseries', 'miniseries-container');
    renderMoviesByType('series', 'series-container');

    renderTopMovie();
});