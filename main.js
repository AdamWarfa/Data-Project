"use strict";

window.addEventListener("load", initApp);

async function initApp() {
  const pokemons = await getPokemon("https://cederdorff.github.io/dat-js/05-data/pokemons.json");
  for (const pokemon of pokemons) {
    addPokemon(pokemon);
    pokemon.type;
  }
}

async function getPokemon(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function removeTilt() {
  if (document.body.clientWidth < 900) {
    document.querySelector("dialog").classList.remove("data-tilt");
    document.querySelector("dialog").removeAttribute("style");
  }
}

function addPokemon(pokemon) {
  let typeComma = pokemon.type.indexOf(",");
  let typeLine = pokemon.type.substring(0, typeComma);
  const typeClass = typeLine.toLowerCase();

  document.querySelector("#pokemon-list").insertAdjacentHTML(
    "beforeend",
    /*html*/ `

<article class="list-entry" class="data-tilt">
    <img id="list-image" src = "${pokemon.image}"/>
    <div class="type-color-${pokemon.type}"></div>
    <h2 id="list-name">${pokemon.name}</h2>
    <h3 id="list-number">#0${pokemon.dexindex}</h3>
    <p id="list-description">${pokemon.description}</p>
</article>
`
  );

  document.querySelector("#pokemon-list article:last-child").addEventListener("click", pokemonClicked);

  function pokemonClicked() {
    const myTimeout = setTimeout(removeTilt, 100);

    document.querySelector("#background").classList.remove("dim");
    document.querySelector("#background").classList.add("dark");
    document.querySelector("#pokemon-list").classList.add("dark");

    document.querySelector("#pokemon-name").textContent = pokemon.name;
    document.querySelector("#pokemon-type").textContent = `Type: ${pokemon.type}`;
    document.querySelector("#pokemon-dex").textContent = `Dex Number: #0${pokemon.dexindex}`;
    document.querySelector("#pokemon-image").src = pokemon.image;
    document.querySelector("#pokemon-footprint").src = pokemon.footprint;
    document.querySelector("#pokemon-description").textContent = pokemon.description;
    document.querySelector(".pokemon-hp").textContent = `HP: ${pokemon.statsHP}`;
    document.querySelector(".pokemon-attack").textContent = `ATTACK: ${pokemon.statsAttack}`;
    document.querySelector(".pokemon-defense").textContent = `DEFENSE: ${pokemon.statsDefence}`;
    document.querySelector(".pokemon-spattack").textContent = `SP.ATTACK: ${pokemon.statsSpecialAttack}`;
    document.querySelector(".pokemon-spdefense").textContent = `SP.DEFENSE: ${pokemon.statsSpecialDefence}`;
    document.querySelector(".pokemon-speed").textContent = `SPEED: ${pokemon.statsSpeed}`;
    document.querySelector("dialog").showModal();
    document.querySelector(".btn-close").addEventListener("click", pokemonClose);
  }
}

function pokemonClose() {
  document.querySelector("dialog").close();
  document.querySelector("#background").classList.remove("dark");
  document.querySelector("#pokemon-list").classList.remove("dark");
  document.querySelector("#background").classList.add("dim");
}
