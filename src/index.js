/// <reference types="jquery" />
const URL = "https://pokeapi.co/api/v2/pokemon/";
let offset = 0;
let offsetValue = 20; //the value offset increases or decreases on every page
let cards = document.querySelectorAll(".card");
let endpoint = `?limit=20&offset=${offset}`;

function fetchPokemons(URL, endpoint) {
  fetch(URL + endpoint)
    .then((respuesta) => respuesta.json())
    .then((respuesta) => {
      const pokemons = respuesta.results;
      console.log(pokemons);
      Object.keys(pokemons).forEach((pokemon) => {
        console.log(pokemons[pokemon].name);

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

      $(".card").on("click", function () {
        $("#details").empty();
        let pokemonUrl = $("a", this).attr("href");
        displayPokemon(pokemonUrl);
        console.log(pokemonUrl);
      });
    })

    .catch((error) => console.error("FALLÓ", error));
}
fetchPokemons(URL, endpoint);

let getPokemonUrl = () => {
  console.log(pokemons[pokemon].url);
};

let displayPokemon = (pokemonUrl) => {
  fetch(pokemonUrl)
    .then((res) => res.json())
    .then((res) => {
      let pokeSprite = res.sprites;
      $("#details").append(
        `<img src="${pokeSprite.front_default}" id="sprite">
        <p>${res.name.toUpperCase()}</p>
        <p>Height: ${res.height}</p>
        <p>Weight: ${res.weight}</p>
        <p>Type: ${pokemonTypes(res.types)}</p>`
      );
    })
    .catch((error) => console.error("FALLÓ", error));
};

function pokemonTypes(pokemon) {
  let pokeType = [];
  pokemon.forEach((element) => {
    pokeType.push(element.type.name);
  });
  return pokeType;
}

function paginatorHandler(pageNumber) {
  offset = (pageNumber - 1) * offsetValue;
  endpoint = `?limit=20&offset=${offset}`;
  return endpoint;
}

function deletePokemons() {
  $("#pokelist").empty();
}

function activePage(page) {
  $("#active").attr("id", "");
  $(page).attr("id", "active");
}

$(".page").on("click", function () {
  activePage(this);
  paginatorHandler(this.textContent);
  deletePokemons();
  fetchPokemons(URL, endpoint);
});
