'use strict'

const apiKey = '1a5db326-08fe-414f-8a22-62e0e9615e74';
const defaultPageUrl = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const searchUrl = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';
const form = document.querySelector('.search');
const input = document.querySelector('.input');


async function getData(url) {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": apiKey
        }
    })
    const data = await response.json();
    showCard(data);
    const card = document.querySelectorAll('.card')
    card.forEach((elem) => elem.addEventListener('click', () => {
        elem.classList.toggle('active')
    }))
    changeColorRaiting(data);
    console.log(data);
}

getData(defaultPageUrl);

function showCard(data) {
    const cards = document.querySelector('.cards');

    cards.innerHTML = '';

    data.films.forEach(elem => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('card');
        movieCard.innerHTML = 
        `<div class="rating ${changeColorRaiting(elem.rating)}">${checkRating(elem.rating)}</div>
        <img class="poster" src="${elem.posterUrlPreview}" alt="${elem.nameRu}">
        <div class="title">${checkTitle(elem)}</div>
        <div class="category">${elem.genres.map((genre, i) => genre.genre)}</div>
        <div class="year">${checkYear(elem)}</div>`;
        cards.append(movieCard);
  
    });
}

function checkRating(value) {
    if (value != 'null') {
        return value
    } else {
        return value = '';
    }
}

function checkTitle(value) {
    if (!value.nameRu) {
        return value.nameEn
    } else {
        return value.nameRu
    }
}

function checkYear(value) {
    if (value.year == 'null') {
        return ''
    } else {
        return value.year
    }
}

function changeColorRaiting(value) {
    if (value >= 7) {
        return 'green'
    } else if (value > 5 && value < 7) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (elem) => {
    elem.preventDefault();
    const searchMovie = `${searchUrl}${input.value}`;
    if (input.value) {
        getData(searchMovie);
    }
})

function getActive() {

}
