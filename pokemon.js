const express = require("express");
const router = express.Router();

async function hentPokemon() {

    const params = new URLSearchParams();

    if (type) {
        params.append("type", type);
    }

    if (minAttack !== "") {
        params.append("minAttack", minAttack);
    }
    const url = `https://localhost:3000/api/pokemon?${values.toString()}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new TypeError("Kunne ikke hente Pokémon");
        }

        const pokemon = await response.json();
        const liste = document.getElementById("pokemon-liste");

        liste.replaceChildren();

        pokemon.forEach((p) => {
            const kort = document.createElement("div");
            const navn = document.createElement("h2");

            navn.textContent = p.name;
            kort.appendChild(navn);
            liste.appendChild(kort);
        });
    } catch (error) {
        console.error("Fejl:", error);
    }
}
hentPokemon();
