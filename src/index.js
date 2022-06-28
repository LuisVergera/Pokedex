/// <reference types="jquery" />
const URL = "https://pokeapi.co/api/v2/pokemon/";
let offset = 0;

let requestOptions = {
  method: "GET",
  redirect: "follow",
  //headers: myHeaders,
};

function fetchPokemons() {
  fetch(URL + `?limit=20&offset=${offset}`)
    .then((respuesta) => respuesta.json())
    .then((respuesta) => {
      const pokemons = respuesta.results;
      console.log(pokemons);
      Object.keys(pokemons).forEach((pokemon) => {
        console.log(pokemons[pokemon].name);

        $("#pokelist").append(
          $(
            `<div class="cards"><div class="card">${pokemons[pokemon].name}<a href="${pokemons[pokemon].url}"></a></div></div>`
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
fetchPokemons();

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
        <p>${res.name}</p>
        <p>Height: ${res.height}</p>
        <p>Weight: ${res.weight}</p>
        <p>Type: ${pokemonTypes(res.types)}</p>`
      );
    })
    .catch((error) => console.error("FALLÓ", error));
};

let cards = document.querySelectorAll(".card");

function pokemonTypes(pokemon) {
  let pokeType = [];
  pokemon.forEach((element) => {
    pokeType.push(element.type.name);
  });
  return pokeType;
}
/*
function paginator(url) {
  let offset = 20;

  if (url != "null"){
    if(url ==)
  }
}*/

function deletePokemons() {
  $("#pokelist").empty();
}
