/// <reference types="jquery" />
const URL = "https://pokeapi.co/api/v2/pokemon/";

let requestOptions = {
  method: "GET",
  redirect: "follow",
  //headers: myHeaders,
};

fetch(URL, requestOptions)
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

/*function createTestCard() {
  $("ul").append($(`<div class="card"></div>`));
}*/

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
        <p>Type: ${pokemonTypes(res.types)[0]}</p>`
      );
    })
    .catch((error) => console.error("FALLÓ", error));
};

let cards = document.querySelectorAll(".card");

function pokemonTypes(pokemon) {
  pokemon.forEach((element) => {
    return element.type.name;
  });
}
