export default async function displayPokemon(pokemon) {
  let resPokemon = await pokemon;
  let pokeSprite = resPokemon.sprites;
  $("#details").append(
    `<img src="${pokeSprite.front_default}" id="sprite">
          <p>${resPokemon.name.toUpperCase()}</p>
          <p>Height: ${resPokemon.height}</p>
          <p>Weight: ${resPokemon.weight}</p>
          <p>Type: ${pokemonTypes(resPokemon.types)}</p>`
  );
}

function pokemonTypes(pokemon) {
  let pokeType = [];
  pokemon.forEach((element) => {
    pokeType.push(element.type.name);
  });
  return pokeType;
}
