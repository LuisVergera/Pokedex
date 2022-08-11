export const URL = "https://pokeapi.co/api/v2/pokemon/";
export let offsetValue = 20;
let offset = 0;
export let endpoint = `?limit=20&offset=${offset}`;
export let numberOfPokemons;
export let pokemons;
export let pokemonsPerPage;

export async function fetchPokemons(URL, endpoint) {
  const response = await fetch(URL + endpoint);
  const responseJSON = await response.json();
  pokemons = responseJSON.results;
  numberOfPokemons = responseJSON.count;
  pokemonsPerPage = pokemons.length;

  return pokemons;
}

export async function fetchSinglePokemon(pokemonURL) {
  let response = await fetch(pokemonURL);
  response = response.json();

  return response;
}

export function paginatorHandler(pageNumber) {
  offset = (pageNumber - 1) * offsetValue;
  endpoint = `?limit=20&offset=${offset}`;
  return endpoint;
}
