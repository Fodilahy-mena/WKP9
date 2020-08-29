console.log('It works');

const endpoint = 'https://ghibliapi.herokuapp.com/films';

// fetch the data from the endpoint url
const myPromise = fetch(endpoint);
console.log(myPromise);

const div = document.querySelector('.movies');

// run this error when there is something wrong with the promise
function handleError(error) {
    console.log('What, No?');
    console.log(error);
}

// use async await function for the promise to go
async function go() {
    // create a response variable and await it with fectched variable
    let res = await myPromise;
    // change the data into array using .json() and assigne it to the movies object
    let data = await res.json();
    movies = data;
    console.log(movies);

    // sort the movie list by rt_score from the highest number to the lowest
    movies.sort(function(a, b) {
        return b.rt_score - a.rt_score;
    });

    // create an html and map through the movies object, and access the keys's value
    const html = movies.map(movie => {
        return `
        <div class="movies__card">
            <header>
                <h2>${movie.title}</h2>
                <span>Release date: ${movie.release_date}</span>
                <span>Rt score: ${movie.rt_score}</span>
            </header>
            <p>${movie.description}</p>
            <div class="about">
                <span>Director: ${movie.director}</span>
                <span>Producer: ${movie.producer}</span>
            </div>
        </div>
        `;
    }).join('');
    div.innerHTML = html;
}

go().catch(handleError);