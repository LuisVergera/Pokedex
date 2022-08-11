export const URL = "https://pokeapi.co/api/v2/pokemon/";
export let offset = 0;
export let offsetValue = 20;
export let endpoint = `?limit=20&offset=${offset}`;

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
