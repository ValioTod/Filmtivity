document.addEventListener("DOMContentLoaded", function() {
    const searchForm = document.getElementById("search-form");
    searchForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const query = document.getElementById("search-input").value.trim();
        if (query) {
            searchMovies(query);
        }
    });
});

function fetchMovies(query) {
    const apiKey = "2663a47da530c754207396eef5db5fb1";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displaySearchResults(data.results);
        })
        .catch(error => {
            console.error("Failed to search movies:", error);
        });
}

function displaySearchResults(movies) {
    const container = document.getElementById("search-results");
    container.innerHTML = "";

    if (movies.length === 0) {
        container.innerHTML = "<p>No results found.</p>";
        return;
    }

    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.className = "movie-card";
        movieCard.innerHTML = `
            <div class="card-front">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            </div>
            <div class="card-back">
                <h3>${movie.title}</h3>
                <p>${movie.overview}</p>
                <p>Rating: ${movie.vote_average}</p>
            </div>
        `;
        container.appendChild(movieCard);
    });
}