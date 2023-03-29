"use strict";

window.addEventListener("load", initApp);

async function initApp() {
  const pokemons = await getPokemon("https://cederdorff.github.io/dat-js/05-data/pokemons.json");
  pokemons.sort(function (a, b) {
    return a.dexindex - b.dexindex;
  });
  for (const pokemon of pokemons) {
    try {
      addPokemon(pokemon);
    } catch (error) {
      console.log(`unable to work my magic on ${pokemon.name} because ${error}`);
    }
  }
}

async function getPokemon(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function addPokemon(pokemon) {
  let typeColor = pokemon.type.split(",")[0].trim().toLowerCase();

  if (pokemon.type.includes("/")) {
    typeColor = pokemon.type.split("/")[0].trim().toLowerCase();
    console.log(typeColor);
  }

  const dexString = pokemon.dexindex.toString();
  let dexLength = pokemon.dexindex.toString().length;
  let dexNumber = 0;
  if (dexLength === 1) {
    dexNumber = "000" + dexString;
  } else if (dexLength === 2) {
    dexNumber = "00" + dexString;
  } else if (dexLength === 3) {
    dexNumber = "0" + dexString;
  } else if (dexLength === 4) {
    dexNumber = dexString;
  }

  let pokemonPeriod3 = pokemon.description.indexOf(".", 200);
  let pokemonDesc = pokemon.description;
  if (pokemonDesc.length > 300) {
    pokemonDesc = pokemon.description.substring(0, pokemonPeriod3 + 1);
    console.log(pokemonPeriod3);
    console.log(pokemonDesc);
  }

  document.querySelector("#pokemon-list").insertAdjacentHTML(
    "beforeend",
    /*html*/ `

<article class="list-entry">
    <img id="list-image" src = "${pokemon.image}"/>
    <div class="type-color-${typeColor}"></div>
    <h2 id="list-name">${pokemon.name}</h2>
    <h3 id="list-number">#${dexNumber}</h3>
    <p id="list-description">${pokemonDesc}</p>
</article>
`
  );

  document.querySelector("#pokemon-list article:last-child").addEventListener("click", pokemonClicked);

  function pokemonClicked() {
    document.querySelector("#background").classList.remove("dim");
    document.querySelector("#background").classList.add("dark");
    document.querySelector("#pokemon-list").classList.add("dark");
    document.querySelector("#dialog-color").classList.add(`dialog-type-${typeColor}`);

    document.querySelector("#pokemon-name").textContent = pokemon.name;
    document.querySelector("#pokemon-type").textContent = `Type: ${pokemon.type}`;
    document.querySelector("#pokemon-dex").textContent = `Dex Number: ${dexNumber}`;
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
  document.querySelector("#dialog-color").removeAttribute("class");
  document.querySelector("#background").classList.add("dim");
}
