"use strict";

window.addEventListener("load", initApp);

async function initApp() {
  const blaziken = await getPokemon("https://raw.githubusercontent.com/AdamWarfa/Data-Project/main/blaziken.json");
  addPokemon(blaziken);
  addPokemon(blaziken);
  addPokemon(blaziken);
  addPokemon(blaziken);
  addPokemon(blaziken);
  addPokemon(blaziken);
  addPokemon(blaziken);
  addPokemon(blaziken);
}

async function getPokemon(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function addPokemon(pokemon) {
  document.querySelector("#pokemon-list").insertAdjacentHTML(
    "beforeend",
    /*html*/ `

<article class="list-entry">
    <h2 id="list-name">${pokemon.name}</h2>
    <img id="list-image" src="${pokemon.image}"/>
</article>
`
  );

  document.querySelector("#pokemon-list article:last-child").addEventListener("click", pokemonClicked);

  function pokemonClicked() {
    console.log(pokemon);
    document.querySelector("#pokemon-name").textContent = pokemon.name;
    document.querySelector("#pokemon-type").textContent = pokemon.type;
    document.querySelector("#pokemon-dex").textContent = pokemon.dexIndex;
    document.querySelector("#pokemon-image").src = pokemon.image;
    document.querySelector("#pokemon-description").textContent = pokemon.description;
    document.querySelector("dialog").showModal();
    document.querySelector(".btn-close").addEventListener("click", pokemonClose);
  }
}

function pokemonClose() {
  document.querySelector("dialog").close();
}
