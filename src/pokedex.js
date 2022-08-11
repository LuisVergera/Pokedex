/// <reference types="jquery" />
import {
  URL,
  offset,
  offsetValue,
  endpoint,
  fetchPokemons,
  fetchSinglePokemon,
} from "./api/pokemon.js";
import displayPokemon from "./ui/pokemon.js";
import {
  createPaginator,
  paginatorHandler,
  activePage,
  paginatorMain,
  asignFirstPage,
  hidePrevAndNext,
  activePageNumber,
} from "./ui/paginator.js";
let activePageNumber = 1;
let numberOfPokemons;
let pokemonsPerPage;
let pokemons;
let pokemon;

//functions

async function initializePokedex() {
  await fetchPokemons(URL, endpoint);
  createPokemonCards(pokemons);
}

function createPokemonCards(pokemons) {
  Object.keys(pokemons).forEach((pokemon) => {
    $("#pokelist").append(
      $(
        `<div class="cards"><div class="card">${pokemons[
          pokemon
        ].name.toUpperCase()}<a href="${
          pokemons[pokemon].url
        }"></a></div></div>`
      )
    );
  });
  handleCards();
}

function handleCards() {
  $(".card").on("click", async function () {
    $("#details").empty();
    let pokemonUrl = $("a", this).attr("href");
    pokemon = await fetchSinglePokemon(pokemonUrl);
    displayPokemon(pokemon);
  });
}

function deletePokemons() {
  $("#pokelist").empty();
}

function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fetchPokemons(URL, endpoint));
    }, 2000);
  });
}

async function asyncCall() {
  await resolveAfter2Seconds();
  setTimeout(function () {
    hideLoader();
    createPaginator(numberOfPokemons, pokemonsPerPage);
    asignFirstPage();
    paginatorMain();
  }, 100);
}

function hideLoader() {
  $(".loader").attr("class", "hide");
}

export default function main() {
  initializePokedex();
  asyncCall();
  hidePrevAndNext();
}

//events

$("#prev").click(async () => {
  let newActive = $("#active").prev();
  activePage(newActive);
  paginatorHandler(activePageNumber);
  deletePokemons();
  await fetchPokemons(URL, endpoint);
  createPokemonCards(pokemons);
  hidePrevAndNext();
});

$("#next").click(async () => {
  let newActive = $("#active").next();
  activePage(newActive);
  paginatorHandler(activePageNumber);
  deletePokemons();
  await fetchPokemons(URL, endpoint);
  createPokemonCards(pokemons);
  hidePrevAndNext();
});

$(".searchButton").click(async (event) => {
  event.preventDefault();
  let pokemonUrl = URL + $(".searchInput").val();
  pokemon = await fetchSinglePokemon(pokemonUrl);
  $("#details").empty();
  displayPokemon(pokemon);
});

//main(); /*as
