
// Henter alle Pokémon
function loadPokemon() {
    fetch("http://localhost:3000/pokemon")
        .then(response => response.json())
        .then(pokemon => showPokemon(pokemon))
        .catch(error => console.error(error));
}

// Filtrerer Pokémon via URL-parametre
function filterPokemon() {
    const type = document.getElementById("dropDown").value;
    const attack = document.getElementById("attack").value;
    const letter = document.getElementById("letter").value;

    // Starter med endpointet til alle Pokémon
    // vi bruger let så den kan ændre sig i forhold til hvad man indtaster
    let url = "http://localhost:3000/pokemon?";

    // Tilføjer kun de filtre, der er udfyldt
    if (type) url += `type=${encodeURIComponent(type)}&`;
    if (attack) url += `minAttack=${encodeURIComponent(attack)}&`;
    if (letter) url += `startsWith=${encodeURIComponent(letter)}&`;

    fetch(url)
        .then(response => response.json())
        .then(pokemon => showPokemon(pokemon))
        .catch(error => console.error(error));
}

// Henter Pokémon fra Power Plant
function loadPowerPlant() {
    fetch("http://localhost:3000/pokemon/power-plant")
        .then(response => response.json())
        .then(pokemon => showPokemon(pokemon))
        .catch(error => console.error(error));
}

// Viser Pokémon på HTML-siden
function showPokemon(pokemon) {
    const list = document.getElementById("pokemonList");

    // Rydder de tidligere resultater
    list.innerHTML = "";

    // Opretter en overskrift for hver Pokémon
    pokemon.forEach(p => {
        list.innerHTML += `
            <div>
                <h3>${p.name}</h3>
                <p>Type: ${p.primary_type}</p>
                <p>Attack: ${p.attack}</p>
                <hr>
            </div>
        `;
    });
}

// Viser alle Pokémon, når siden åbnes
loadPokemon();
