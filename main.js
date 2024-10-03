import "./style.css";
import { movies } from "./data.js";

// Variables de entorno

let allMovies = movies;

// Mostrar las películas

const moviesShow2 = () => {
  allMovies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.className = "movie";
    movieContainer.innerHTML = `
       <img class="img" src="${movie.poster}">
       <h2 class="title">${movie.title}</h2>
        <small class="rating"><strong>Año:</strong> ${movie.year} / <em class"rating"> <strong>Rating:</strong> ${movie.rating} </em> </small>
       <p class="director"><strong>Director:</strong> ${movie.director}</p>
      <p class=""><strong>Actores:</strong> ${movie.actors}</p>
       <p class="description"><strong>Descripción:</strong> ${movie.description}</p>
       <p class="category"><strong>Category:</strong> ${movie.category}</p>
     `;
    container.appendChild(movieContainer);
    document.body.appendChild(container);
  });
};

// Boton cambiar de Grid

function layoutList() {
  const element = document.getElementById("container");
  element.classList.remove("container");
  element.classList.add("list-container");
  container.innerHTML = "";
  moviesShow2();

}

function layoutGrid() {
  
  const element = document.getElementById("container");
  element.classList.remove("list-container");
  element.classList.add("container");
  container.innerHTML = "";
  moviesShow2();
}

// Función para aplicar el filtro  - SELECTOR

function filterMovies() {
  const selectedCategory = document.getElementById("category").value;

  if (selectedCategory !== "all") {
    allMovies = movies.filter((movie) =>
      movie.category.includes(selectedCategory)
    );
  } else {
    allMovies = movies;
  }
  container.innerHTML = "";
  moviesShow2(); // Limpiar contenido anterior
}

// Función para aplicar el filtro  - BUSCADOR

const searcher = () => {
  let filterInput = document
    .getElementById("buscador")
    .value.toUpperCase()
    .trim();
  const selectedCategory = document.getElementById("category");

  if (filterInput.length !== 0) {
    selectedCategory.value = "all";
    allMovies = movies.filter((movie) =>
      movie.title.toUpperCase().includes(filterInput)
    );
    container.innerHTML = "";
    moviesShow2();
  } else {
    return;
  }
};

// Reset

const clean = () => {
  let filterInput = document.getElementById("buscador");
  const selectedCategory = document.getElementById("category");
  selectedCategory.value = "all";
  allMovies = movies;
  container.innerHTML = "";
  moviesShow2();
};

// Función para aplicar el filtro  - BUSCADOR

const orderListA = () => {
  allMovies.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  container.innerHTML = ""; // Limpiar contenido anterior
  moviesShow2();
};

const orderListZ = () => {
  allMovies.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return 1;
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return -1;
    }
    return 0;
  });

  container.innerHTML = ""; // Limpiar contenido anterior
  moviesShow2();
};

// Agregar eventos y los botones
document.getElementById("orderA").addEventListener("click", orderListA);
document.getElementById("orderZ").addEventListener("click", orderListZ);
document.getElementById("buttonClean").addEventListener("click", clean);
document.getElementById("category").addEventListener("change", filterMovies);
document.getElementById("buttonFilter").addEventListener("click", searcher);
document.getElementById("layoutGrid").addEventListener("click", layoutGrid);
document.getElementById("layoutList").addEventListener("click", layoutList);
clean();
