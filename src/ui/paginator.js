export let activePageNumber = 1;

export function createPaginator(number, pokemons) {
  let pageNumber = number / pokemons;
  let realPageNumber = Math.ceil(pageNumber);
  for (let i = 1; i <= realPageNumber; i++) {
    $("#next").before(`<a class="page" id="" href="#">${i}</a>`);
  }
}

export function paginatorHandler(pageNumber) {
  offset = (pageNumber - 1) * offsetValue;
  endpoint = `?limit=20&offset=${offset}`;
  return endpoint;
}

export function activePage(page) {
  $("#active").attr("id", "");
  $(page).attr("id", "active");
  activePageNumber = $("#active").text();
  return activePageNumber;
}

export function paginatorMain() {
  $(".page").on("click", async function () {
    activePage(this);
    paginatorHandler(this.textContent);
    deletePokemons();
    await fetchPokemons(URL, endpoint);
    createPokemonCards(pokemons);
    hidePrevAndNext();
  });
}

export function asignFirstPage() {
  $(".page:first").attr("id", "active");
}

export function hidePrevAndNext() {
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
