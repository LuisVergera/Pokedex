/// <reference types="jquery" />
const URL = "https://pokeapi.co/api/v2/pokemon/";
let offset = 0;
let offsetValue = 20; //the value offset increases or decreases on every page
let cards = document.querySelectorAll(".card");
let endpoint = `?limit=20&offset=${offset}`;
let activePageNumber = 1; //$("#active").text();
let numberOfPokemons;
let pokemonsPerPage;

function fetchPokemons(URL, endpoint) {
  fetch(URL + endpoint)
    .then((respuesta) => respuesta.json())
    .then((respuesta) => {
      if (respuesta.previous != null || respuesta.next != null) {
        const pokemons = respuesta.results;
        numberOfPokemons = respuesta.count;
        pokemonsPerPage = pokemons.length;

        Object.keys(pokemons).forEach((pokemon) => {
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
        });
      }
    })

    .catch((error) => console.error("FALLÓ", error));
}
//fetchPokemons(URL, endpoint);

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

function deletePokemons() {
  $("#pokelist").empty();
}

//paginator

function createPaginator(number, pokemons) {
  let pageNumber = number / pokemons;
  let realPageNumber = Math.ceil(pageNumber);
  for (let i = 1; i <= realPageNumber; i++) {
    $("#next").before(`<a class="page" id="" href="#">${i}</a>`);
  }
}

function paginatorHandler(pageNumber) {
  offset = (pageNumber - 1) * offsetValue;
  endpoint = `?limit=20&offset=${offset}`;
  return endpoint;
}

function activePage(page) {
  $("#active").attr("id", "");
  $(page).attr("id", "active");
  activePageNumber = $("#active").text();
  return activePageNumber;
}

function prevOrNextButton(id) {
  if (id === "next") {
    activePageNumber = $("#active").text() + 1;
    $("#active").attr("id", "");
    return activePageNumber;
  } else if (id === "prev") {
    activePageNumber = $("#active").text() - 1;
    $("#active").attr("id", "");
    return activePage(activePageNumber);
  }
}

$("#prev").click(() => {
  let newActive = $("#active").prev();
  activePage(newActive);
  paginatorHandler(activePageNumber);
  deletePokemons();
  fetchPokemons(URL, endpoint);
  hidePrevAndNext();
});

$("#next").click(() => {
  let newActive = $("#active").next();
  activePage(newActive);
  paginatorHandler(activePageNumber);
  deletePokemons();
  fetchPokemons(URL, endpoint);
  hidePrevAndNext();
});

//loader
function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fetchPokemons(URL, endpoint));
    }, 2000);
  });
}

async function asyncCall() {
  await resolveAfter2Seconds();
  setTimeout(function () {
    hideLoader();
    createPaginator(numberOfPokemons, pokemonsPerPage);
    asignFirstPage();
    paginatorMain();
  }, 100);
}
asyncCall();

function paginatorMain() {
  $(".page").on("click", function () {
    activePage(this);
    paginatorHandler(this.textContent);
    deletePokemons();
    fetchPokemons(URL, endpoint);
    hidePrevAndNext();
  });
}

function asignFirstPage() {
  $(".page:first").attr("id", "active");
}

function hideLoader() {
  $(".loader").attr("class", "hide");
}

function hidePrevAndNext() {
  if (activePageNumber == 1) {
    $("#prev").attr("class", "hide");
    $("#next").attr("class", "");
  } else if (activePageNumber == 58) {
    $("#next").attr("class", "hide");
    $("#prev").attr("class", "");
  } else {
    $("#prev").attr("class", "");
    $("#next").attr("class", "");
  }
}

hidePrevAndNext();

$(".searchButton").click(() => {
  let pokemonUrl = URL + $(".searchInput").val();
  $("#details").empty();
  displayPokemon(pokemonUrl);
});
