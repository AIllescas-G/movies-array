

import "./style.css";
import { movies } from "./data.js";


let allMovies = movies;

export const moviesShow2 = () => {
  allMovies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.className = "movie";
    movieContainer.innerHTML = `
       <img class="img" src="${movie.poster}">
       <h2 class="title">${movie.title}</h2>
       <p class="director"><strong>Director:</strong> ${movie.director}</p>
       <p class="year"><strong>Año:</strong> ${movie.year}</p>
       <p class="rating"><strong>Rating:</strong> ${movie.rating}</p>
       <p class="description"><strong>Descripción:</strong> ${movie.description}</p>
       <p class="category"><strong>Category:</strong> ${movie.category}</p>
     `;
    container.appendChild(movieContainer);
    document.body.appendChild(container);
  });
};

// Boton cambiar de Grid

export function layoutList() {
  const element = document.getElementById("container");
  element.classList.remove("container");
  element.classList.add("list-container");
  container.innerHTML = "";
  moviesShow2();
}

export function layoutGrid() {
  
  const element = document.getElementById("container");
  element.classList.remove("list-container");
  element.classList.add("container");
  container.innerHTML = "";
  moviesShow2();
}