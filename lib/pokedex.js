"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = main;

require("core-js/modules/es.promise.js");

/// <reference types="jquery" />
const URL = "https://pokeapi.co/api/v2/pokemon/";
let offset = 0;
let offsetValue = 20; //the value offset increases or decreases on every page

let cards = document.querySelectorAll(".card");
let endpoint = "?limit=20&offset=".concat(offset);
let activePageNumber = 1; //$("#active").text();

let numberOfPokemons;
let pokemonsPerPage;
let pokemons;
let pokemon; //functions

async function initializePokedex() {
  await fetchPokemons(URL, endpoint);
  createPokemonCards(pokemons);
}

async function fetchPokemons(URL, endpoint) {
  const response = await fetch(URL + endpoint);
  const responseJSON = await response.json();
  pokemons = responseJSON.results;
  numberOfPokemons = responseJSON.count;
  pokemonsPerPage = pokemons.length;
  return pokemons;
}

function createPokemonCards(pokemons) {
  Object.keys(pokemons).forEach(pokemon => {
    $("#pokelist").append($("<div class=\"cards\"><div class=\"card\">".concat(pokemons[pokemon].name.toUpperCase(), "<a href=\"").concat(pokemons[pokemon].url, "\"></a></div></div>")));
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

async function fetchSinglePokemon(pokemonURL) {
  let response = await fetch(pokemonURL);
  response = response.json();
  return response;
}

async function displayPokemon(pokemon) {
  let resPokemon = await pokemon;
  let pokeSprite = resPokemon.sprites;
  $("#details").append("<img src=\"".concat(pokeSprite.front_default, "\" id=\"sprite\">\n        <p>").concat(resPokemon.name.toUpperCase(), "</p>\n        <p>Height: ").concat(resPokemon.height, "</p>\n        <p>Weight: ").concat(resPokemon.weight, "</p>\n        <p>Type: ").concat(pokemonTypes(resPokemon.types), "</p>"));
}

function pokemonTypes(pokemon) {
  let pokeType = [];
  pokemon.forEach(element => {
    pokeType.push(element.type.name);
  });
  return pokeType;
}

function deletePokemons() {
  $("#pokelist").empty();
}

function createPaginator(number, pokemons) {
  let pageNumber = number / pokemons;
  let realPageNumber = Math.ceil(pageNumber);

  for (let i = 1; i <= realPageNumber; i++) {
    $("#next").before("<a class=\"page\" id=\"\" href=\"#\">".concat(i, "</a>"));
  }
}

function paginatorHandler(pageNumber) {
  offset = (pageNumber - 1) * offsetValue;
  endpoint = "?limit=20&offset=".concat(offset);
  return endpoint;
}

function activePage(page) {
  $("#active").attr("id", "");
  $(page).attr("id", "active");
  activePageNumber = $("#active").text();
  return activePageNumber;
}

function resolveAfter2Seconds() {
  return new Promise(resolve => {
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

function paginatorMain() {
  $(".page").on("click", async function () {
    activePage(this);
    paginatorHandler(this.textContent);
    deletePokemons();
    await fetchPokemons(URL, endpoint);
    createPokemonCards(pokemons);
    hidePrevAndNext();
  });
}

function asignFirstPage() {
  $(".page:first").attr("id", "active");
}

function hideLoader() {
  $(".loader").attr("class", "hide");
}

function hidePrevAndNext() {
  if (activePageNumber == 1) {
    $("#prev").attr("class", "hide");
    $("#next").attr("class", "");
  } else if (activePageNumber == 58) {
    $("#next").attr("class", "hide");
    $("#prev").attr("class", "");
  } else {
    $("#prev").attr("class", "");
    $("#next").attr("class", "");
  }
}

function main() {
  initializePokedex();
  asyncCall();
  hidePrevAndNext();
} //events


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
$(".searchButton").click(async event => {
  event.preventDefault();
  let pokemonUrl = URL + $(".searchInput").val();
  pokemon = await fetchSinglePokemon(pokemonUrl);
  $("#details").empty();
  displayPokemon(pokemon);
});