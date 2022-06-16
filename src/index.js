/// <reference types="jquery" />

let requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

fetch("https://pokeapi.co/api/v2/pokemon/", requestOptions)
  .then((respuesta) => respuesta.json())
  .then((respuestaJSON) => {
    Object.keys(respuestaJSON.rates).forEach((moneda) => {
      $("ul").append($(`<li>${moneda}: ${respuestaJSON.rates[moneda]}</li>`));
    });
  })
  .catch((error) => console.error("FALLÓ", error));
