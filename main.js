import './style.css'
import { movies } from './data.js'

const imgCreateElement = (poster) => {
  const img = document.createElement('img');
  img.src = poster;
  img.className = "img";
  return img;
}

const titleCreateElement = (title) => {
  const elementTitle = document.createElement('h2')
  elementTitle.className = "title"
  elementTitle.innerHTML = title;
  return elementTitle;
}

const yearCreateElement = (year, rating) => {
  const elementYear = document.createElement("small")
  elementYear.innerHTML = `<rt class="year"> <b> Year: </b>  ${year} </rt> | <rt class="ratin">  Rating: </b> ${rating} </rt> <b>`;
  return elementYear;
}

const descriptionCreateElement = (description) => {
  const elementeDescription = document.createElement('p');
  elementeDescription.className = "description"
  elementeDescription.innerHTML = `<b> Description: </b> ${description}`;
  return elementeDescription;
}


const directorCreateElement = (director) => {
  const elementDirector = document.createElement('p');
  elementDirector.innerHTML = `<b> Director: </b> ${director}`;
  elementDirector.className = "director";
  return elementDirector;
}

const actorCreateElement = (actors) => {
  const elementActor = document.createElement('p');
  elementActor.innerHTML = `<b> Actor: </b> ${actors}`;
  elementActor.className = "actors";
  return elementActor;
}

const categoryCreateElement = (category) => {
  const elementCategory = document.createElement('p');
  elementCategory.innerHTML = `<b> Category: </b> ${category}`;
  elementCategory.className = "category";
  return elementCategory;
}

const createMovieElement = (movieObj) => {
  const movieContainer = document.createElement('div');
  movieContainer.className = "movie-container"
  const movieData = document.createElement('div');
  movieData.className = "movie"
  movieData.appendChild(imgCreateElement(movieObj.poster));
  const containerTitle = document.createElement('div');
  containerTitle.id = "hidenImg";
  containerTitle.appendChild(titleCreateElement(movieObj.title));
  containerTitle.appendChild(yearCreateElement(movieObj.year, movieObj.rating));
  movieData.appendChild(containerTitle);
  movieData.appendChild(descriptionCreateElement(movieObj.description));
  movieData.appendChild(directorCreateElement(movieObj.director));
  movieData.appendChild(actorCreateElement(movieObj.actors));
  movieData.appendChild(categoryCreateElement(movieObj.category));
  return movieData;
}

// Variables

let moreMovies = 0
let moviesPerPage = 3
const moviesP = moviesPerPage
let filteredMovies = movies;

// Número de páginas 

const numPag = () => {
  const pag = document.getElementById('pag');
  pag.innerHTML = `pag: ${1 + moreMovies / moviesP} / ${movies.length / moviesP}`
}

// Mostrar las películas 

const moviesShow = (moreMovies, moviesPerPage) => {

  container.innerHTML = ""; // Limpiar contenido anterior
  for (let i = moreMovies; i < moviesPerPage; i++) {
    numPag()
    let movie = filteredMovies[i];
    let movieData = createMovieElement(movie);
    container.appendChild(movieData);
    document.body.appendChild(container);
  }
}

// Boton cambiar de Grid

function layoutList() {
  const element = document.getElementById("container");
  element.classList.remove("container");
  element.classList.add("list-container");
}

function layoutGrid() {
  const element = document.getElementById("container");
  element.classList.remove("list-container");
  element.classList.add("container");
}

// Botón más - menos 

function nextPage() {
  if (moreMovies < movies.length - moviesP) {
    moreMovies += 3;
    moviesPerPage += 3;
    moviesShow(moreMovies, moviesPerPage)
  } else {
    moviesShow(moreMovies, moviesPerPage)
  }
}

function prevPage() {
  if (moreMovies > 0) {
    moreMovies -= moviesP;
    moviesPerPage -= moviesP;
    moviesShow(moreMovies, moviesPerPage)
  } else {
    moviesShow(moreMovies, moviesPerPage)
  }
}

// Función para aplicar el filtro  - SELECTOR

function filterMovies() {
  const selectedCategory = document.getElementById('category').value;
  const numberOfMovies = document.getElementById('numberOfMovies');

  if (selectedCategory === 'all') {
    filteredMovies = movies;
    numberOfMovies.innerHTML = ` Número de películas: <strong>${filteredMovies.length}<strong>`

  } else {
    moreMovies = 0
    filteredMovies = movies.filter(movie => movie.category.includes(selectedCategory));
    numberOfMovies.innerHTML = ` Número de películas: <strong>${filteredMovies.length}<strong>`

    const nexPage = document.getElementById('nexPage')
    const prePage = document.getElementById('prevPage')
    nexPage.setAttribute("disabled", "")
    prePage.setAttribute("disabled", "")
  }

  moviesShow(moreMovies, filteredMovies.length)
  moreMovies = 0;
}

// Función para aplicar el filtro  - BUSCADOR

const filter = () => {
  moreMovies = 0;

  let filterInput = document.getElementById("buscador").value.toUpperCase().trim();
  const selectedCategory = document.getElementById('category');

  if (filterInput.length !== 0) {
    selectedCategory.value = "all";
    filteredMovies = movies.filter(movie => movie.title.toUpperCase().includes(filterInput));
    numberOfMovies.innerHTML = ` Número de películas: <strong>${filteredMovies.length}<strong>`;
    const nexPage = document.getElementById('nexPage')
    const prePage = document.getElementById('prevPage')
    nexPage.setAttribute("disabled", "")
    prePage.setAttribute("disabled", "")
    moreMovies = 0;
    moviesShow(moreMovies, movies.length)

  } else {
    return
  }
}

// Reset 

const clean = () => {
  let filterInput = document.getElementById("buscador");
  const selectedCategory = document.getElementById('category');
  selectedCategory.value = "all";
  filteredMovies = movies;
  filterInput.value = "";
  numberOfMovies.innerHTML = ` Número de películas: <strong>${movies.length}<strong>`;

  const nexPage = document.getElementById('nexPage')
  const prePage = document.getElementById('prevPage')
  nexPage.removeAttribute("disabled", "")
  prePage.removeAttribute("disabled", "")
  moreMovies = 0;
  moviesShow(moreMovies, moviesPerPage)
}


const orderList = () => {

 const order =  movies.sort( (a, b) => {

    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return -1;
    }
    return 0;
  });

  container.innerHTML = ""; // Limpiar contenido anterior
  for (let i = moreMovies; i < moviesPerPage; i++) {
    numPag()
    let movie = order[i];
    let movieData = createMovieElement(movie);
    container.appendChild(movieData);
    document.body.appendChild(container);
    clean()
    const nexPage = document.getElementById('nexPage');
    const prePage = document.getElementById('prevPage');
    nexPage.removeAttribute("disabled", "");
    prePage.removeAttribute("disabled", ""); 
   
  }

}

/*

export const exercise8 = (text) => {

  text = text.replaceAll(" ", "")
  let result = [];

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const arrayAlphabet = alphabet.split(""); 
  const  arrayText = text.split("");
  
  arrayText.forEach((index) => result.push(arrayAlphabet.indexOf(index)));
  return result
}
*/





// Agregar eventos y los botones

moviesShow(moreMovies, moviesPerPage)
numberOfMovies.innerHTML = ` Número de películas: <strong>${filteredMovies.length}<strong>`
document.getElementById('order').addEventListener('click', orderList);
document.getElementById('buttonClean').addEventListener('click', clean);
document.getElementById('category').addEventListener('change', filterMovies);
document.getElementById('buttonFilter').addEventListener('click', filter);
document.getElementById('layoutGrid').addEventListener('click', layoutGrid)
document.getElementById('layoutList').addEventListener('click', layoutList)
document.getElementById('nexPage').addEventListener('click', nextPage)
document.getElementById('prevPage').addEventListener('click', prevPage)
clean()