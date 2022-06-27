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
    const pokemonUrl = [];
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
      var storyId = $("a", this).attr("href");
      console.log(storyId);
    });
    /*.then((pokemons) => {
    $(".card").click(() => {
      //getPokemonUrl();
      console.log($(this.url));
    });*/
  })

  .catch((error) => console.error("FALLÓ", error));

/*function createTestCard() {
  $("ul").append($(`<div class="card"></div>`));
}*/

let getPokemonUrl = () => {
  console.log(pokemons[pokemon].url);
};

let displayPokemon = (pokemonUrl) => {
  $("#conteiner").append(`<img src="${pokemonUrl.front_default}">`);
};

let cards = document.querySelectorAll(".card");
