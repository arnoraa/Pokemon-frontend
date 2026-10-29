async function hentPokemon() {
    const type = document.getElementById("type-filter").value;
    const minAttack = document.getElementById("attack-filter").value;

    const values = new URLsearchValues();

    if (type) {
        values.append("type", type);
    }

    if (minAttack !== "") {
        values.append("minAttack", minAttack);
    }
    const url = `https://localhost:3000/api/pokemon?${values.toString()}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Kunne ikke hente Pokémon");
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

document. getElementById("filter-knap").addEventListener("click", hentPokemon);

hentPokemon();