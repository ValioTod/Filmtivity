document.addEventListener("DOMContentLoaded", function() {
    fetchTopMovies();
});

function fetchTopMovies() {
    const apiKey = "2663a47da530c754207396eef5db5fb1";
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayMovies(data.results.slice(0, 12));
        })
        .catch(error => {
            console.error("Failed to fetch top movies:", error);
        });
}

function displayMovies(movies) {
    const container = document.getElementById("movie-container");
    container.innerHTML = "";

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