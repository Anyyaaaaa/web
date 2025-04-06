document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search');
    searchInput.addEventListener('input', filterMovies);

    const genreSelect = document.getElementById('genre');
    genreSelect.addEventListener('change', filterMovies);

    const ratingSelect = document.getElementById('rating');
    ratingSelect.addEventListener('change', filterMovies);

    function filterMovies() {
        const searchValue = searchInput.value.toLowerCase().trim();
        const genreValue = genreSelect.value;
        const ratingValue = ratingSelect.value;

        const movies = document.querySelectorAll('.movie');
        movies.forEach(movie => {
            const movieName = movie.querySelector('h3').textContent.toLowerCase();
            const movieGenre = movie.dataset.genre.toLowerCase();
            const movieRating = movie.dataset.rating;

            const matchesSearch = movieName.includes(searchValue);
            const matchesGenre = genreValue ? movieGenre === genreValue : true;
            const matchesRating = ratingValue ? movieRating >= ratingValue : true;

            if (matchesSearch && matchesGenre && matchesRating) {
                movie.style.display = 'block';
            } else {
                movie.style.display = 'none';
            }
        });
    }
});


