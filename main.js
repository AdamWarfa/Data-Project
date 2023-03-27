"use strict";

window.addEventListener("load", initApp);

async function initApp() {
  const pokemons = await getPokemon("https://cederdorff.github.io/dat-js/05-data/pokemons.json");
  pokemons.forEach(addPokemon);
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
  document.querySelector("#pokemon-list").insertAdjacentHTML(
    "beforeend",
    /*html*/ `

<article class="list-entry" class="data-tilt">
    <img id="list-image" src = "${pokemon.image}"/>
    <h2 id="list-name">${pokemon.name}</h2>
    <h3 id="list-number">#0${pokemon.dexIndex}</h3>
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
    document.querySelector("#pokemon-dex").textContent = `Dex Number: #0${pokemon.dexIndex}`;
    document.querySelector("#pokemon-image").src = pokemon.image;
    document.querySelector("#pokemon-footprint").src = pokemon.footprint;
    document.querySelector("#pokemon-description").textContent = pokemon.description;
    document.querySelector(".pokemon-hp").textContent = `HEALTH: ${pokemon.statsHP}`;
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
