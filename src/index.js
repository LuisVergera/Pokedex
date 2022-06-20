/// <reference types="jquery" />

let requestOptions = {
  method: "GET",
  redirect: "follow",
  //headers: myHeaders,
};

fetch("https://pokeapi.co/api/v2/pokemon/", requestOptions)
  .then((respuesta) => respuesta.json())
  .then((respuesta) => {
    //const pokemons = respuesta.name["name"];
    Object.keys(respuesta).forEach((pokemon) => {
      console.log(pokemon.name);
      //$("ul").append($(`<div class="card">${pokemon.pokemons[name]}</div>`));
    });
  })
  .catch((error) => console.error("FALLÓ", error));

function createTestCard() {
  $("ul").append($(`<div class="card"></div>`));
}
