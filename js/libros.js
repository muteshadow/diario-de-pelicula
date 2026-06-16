const LIMIT = 6;
const genresMap = new Map(genres.map(g => [g.id, g.title]));

function getBooksData() {
    return content.filter(item => item.type === 'book' || item.content_type === 'book');
}

// Жанри
function formatGenres(genreIds) {
    if (!genreIds || !Array.isArray(genreIds)) return '';
    return genreIds
        .map(id => genresMap.get(id))
        .filter(Boolean) 
        .join(', ');
}

// Книги
function createBookCardElement(book) {
    const cardLink = document.createElement('a');
    cardLink.href = `book.html?book_id=${book.id}`;
    cardLink.className = 'book-card';

    const readMoreBtn = document.createElement('span');
    readMoreBtn.className = 'movie-btn second_btn';
    readMoreBtn.textContent = 'Leer más →';

    const img = document.createElement('img');
    img.src = `assets/${book.poster}`;
    img.alt = book.title;
    img.className = 'book-card-img book-poster';
    img.setAttribute('crossOrigin', 'anonymous');

    const infoDiv = document.createElement('div');
    infoDiv.className = 'book-card-info';

    const titleP = document.createElement('p');
    titleP.className = 'book-card-title';
    titleP.textContent = book.title;

    const genresP = document.createElement('p');
    genresP.className = 'book-card-genres';
    genresP.textContent = formatGenres(book.genres);

    const descP = document.createElement('p');
    descP.className = 'book-card-description';
    descP.textContent = book.description;

    infoDiv.appendChild(titleP);
    infoDiv.appendChild(genresP);
    infoDiv.appendChild(descP);

    cardLink.appendChild(readMoreBtn);
    cardLink.appendChild(img);
    cardLink.appendChild(infoDiv);

    return cardLink;
}

// Відображення книг на сторінці
function renderBooks(books, page) {
    const container = document.getElementById('books-container');
    if (!container) return;

    container.innerHTML = '';

    const offset = (page - 1) * LIMIT;
    const paginatedBooks = books.slice(offset, offset + LIMIT);

    if (paginatedBooks.length === 0) {
        const noResults = document.createElement('p');
        noResults.textContent = 'No se encontraron libros.';
        container.appendChild(noResults);
        return;
    }

    paginatedBooks.forEach(book => {
        const cardElement = createBookCardElement(book);
        container.appendChild(cardElement);
    });
}

// Пагніація
function renderPagination(totalItems, currentPage) {
    const container = document.getElementById('pagination-container');
    if (!container) return;

    container.innerHTML = '';
    const totalPages = Math.ceil(totalItems / LIMIT);

    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = `?page=${i}`;
        pageLink.textContent = i;
        
        if (i === currentPage) {
            pageLink.classList.add('active');
        }

        container.appendChild(pageLink);
    }
}

// Перша сторінка
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    let page = parseInt(params.get('page')) || 1;
    if (page < 1) page = 1;

    const allBooks = getBooksData();
    
    renderBooks(allBooks, page);
    renderPagination(allBooks.length, page);
});