// TMDB API
const API_key = "api_key=7b42e4ca8496e094f5516f58196329bb"; 
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_key;
const IMG_URL = 'https://image.tmdb.org/t/p/w500'; // Base URL for images from TMDB
const searchURL = BASE_URL + '/search/movie?' + API_key;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Fetch and display movies
getmovies(API_URL);

function getmovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.results);
            showmovies(data.results);
        });
}

function showmovies(data) {
    main.innerHTML = '';  // Clear previous movies
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        
        // Using backticks for template literals
        movieEl.innerHTML = `
            <img src="${IMG_URL + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        
        main.appendChild(movieEl); // Append movie element to the main container
    });
}

function getColor(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

// Handle form submission for searching movies
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getmovies(searchURL + '&query=' + searchTerm);
    } else {
        getmovies(API_URL);
    }
});
