const blaziken = {
  name: "blaziken",
  dexNumber: 257,
  type1: "fighting",
  type2: "fire",
  ability: "blaze ",
  hiddenAbility: "speed boost",
  description: "It learns martial arts that use punches and kicks. Every several years, its old feathers burn off, and new, supple feathers grow back in their place.",
  image: "https://archives.bulbagarden.net/media/upload/thumb/c/c0/0257Blaziken.png/500px-0257Blaziken.png",
  footprint: "https://www.serebii.net/pokedex-rs/footprints/257.gif",
  weaknesses: "Water, Ground, Flying, Psychic",
  gender: "87.5% male and 12.5% female",
  weight: 52,
  height: 1.9,
  generation: 3,
  canEvolve: false,
  BST: 530,
  hP: 80,
  attack: 120,
  defense: 70,
  spAttack: 110,
  spDefense: 70,
  speed: 80,
};

function addPokemon(pokemon) {
  const basicInfo = document.createElement("li");
  const stats = document.createElement("li");
  basicInfo.textContent = `${pokemon.name} - ${pokemon.dexNumber} - ${pokemon.type1} - ${pokemon.type2}`;
  stats.textContent = `BST: ${pokemon.BST} - HP: ${pokemon.hP} - Attack: ${pokemon.attack} - Defense: ${pokemon.defense}- Sp.Attack: ${pokemon.spAttack} - Sp.Defense: ${pokemon.spDefense} -Speed: ${pokemon.speed}`;
  document.querySelector("#pokemon").appendChild(basicInfo);
  document.querySelector("#pokemon").appendChild(stats);
}
