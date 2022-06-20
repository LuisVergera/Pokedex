/// <reference types="jquery" />

let requestOptions = {
  method: "GET",
  redirect: "follow",
  //headers: myHeaders,
};

fetch("https://pokeapi.co/api/v2/pokemon/", requestOptions)
  .then((respuesta) => respuesta.json())
  .then((respuesta) => {
    const pokemons = respuesta.results;
    console.log(pokemons);
    Object.keys(pokemons).forEach((pokemon) => {
      console.log(pokemons[pokemon].name);
      $("#pokelist").append(
        $(
          `<div class="cards"><div class="card">${pokemons[pokemon].name}</div></div>`
        )
      );
    });
  })
  .catch((error) => console.error("FALLÓ", error));

function createTestCard() {
  $("ul").append($(`<div class="card"></div>`));
}
