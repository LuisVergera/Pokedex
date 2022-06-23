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
          `<div class="cards"><div class="card" img=${pokemons[pokemon].url}>${pokemons[pokemon].name}</div></div>`
        )
      );
    });
  })
  .then(() => {
    $(".card").click(() => {
      getPokemonUrl();
    });
  })

  .catch((error) => console.error("FALLÓ", error));

/*function createTestCard() {
  $("ul").append($(`<div class="card"></div>`));
}*/

let getPokemonUrl = () => {
  console.log("click");
};

let displayPokemon = (pokemonUrl) => {
  $("#conteiner").append(`<img src="${pokemonUrl.front_default}">`);
};
