/// <reference types="jquery" />

let requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

fetch("https://pokeapi.co/api/v2/pokemon/", requestOptions)
  .then((respuesta) => respuesta.json())
  .then((respuestaJSON) => {
    const pokemons = respuestaJSON["pokemon"];
    Object.keys(pokemons).forEach((pokemon) => {
      $("ul").append($(`<li>${moneda}: ${respuestaJSON.rates[moneda]}</li>`));
    });
  })
  .catch((error) => console.error("FALLÓ", error));
