/// <reference types="jquery" />

let requestOptions = {
  method: "GET",
  redirect: "follow",
  //headers: myHeaders,
};

fetch("https://pokeapi.co/api/v2/pokemon/", requestOptions)
  .then((respuesta) => respuesta.json())
  .then((respuestaJSON) => {
    const pokemons = respuestaJSON["name"];
    Object.keys(pokemons).forEach((results) => {
      $("ul").append($(`<div class="card">${results.pokemons[name]}</div>`));
    });
  })
  .catch((error) => console.error("FALLÓ", error));

function createTestCard() {
  $("ul").append($(`<div class="card"></div>`));
}
