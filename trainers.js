async function hentTrainers() {
    const response = await fetch("http://localhost:3000/trainer");
    const trainers = await response.json();

    showTrainers(trainers);
}

    function showTrainers(trainers) {
        const list = document.getElementById("trainer-list");
        const select = document.getElementById("select-trainer");

        list.innerHTML = "";
        select.innerHTML = '<option value="">Vælg en trainer</option>';

        trainers.forEach((trainer) => {

            list.innerHTML += `
            <div>
                <h2>${trainer.trainer_name}</h2>
                <button onclick="loadTrainerPokemon(${trainer.trainer_id})">
                Se Pókemon
            </button>
            <hr>
            </div>`;

            select.innerHTML += `
            <option value="${trainer.trainer_id}">${trainer.trainer_name}</option>`;
        });
    }
        async function loadTrainerPokemon(trainerId) {
            try {
                const response = await fetch(`http://localhost:3000/trainer/pokemon?id=${trainerId}`);

            if (!response.ok) {
                throw new Error("Kunne ikke hente trainerens Pokémon");
            }

            const pokemon = await response.json();
            console.log(pokemon);
            showTrainerPokemon(pokemon);

        } catch (error) {
            console.error("Fejl:", error);
    }
}

function showTrainerPokemon(pokemon) {
    const list = document.getElementById("trainer-pokemon");

    list.innerHTML = "";

    if (pokemon.length === 0) {
        list.innerHTML = "<p>Trainer har ingen Pokémon endnu.</p>";
        return;
    }

    pokemon.forEach((p) => {
        list.innerHTML += `
            <div class="pokemon-card">
                <h2>${p.name}</h2>
                <p><strong>Type:</strong> ${p.primary_type}</p>
                <p><strong>Attack:</strong> ${p.attack}</p>
                <p><strong>Pokémon ID:</strong> ${p.pokedex_number}</p>
            </div>`;
        });
    }
        async function createTrainer(event) {
            event.preventDefault();

            const trainer_name = document.getElementById("trainer-name").value;
            const hometown = document.getElementById("hometown").value;
            const age = document.getElementById("age").value;


            const response = await fetch("http://localhost:3000/trainer/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    trainer_name: trainer_name,
                    hometown: hometown,
                    age: Number(age)
                })
            });

            const result = await response.json();

            if (response.ok) {
                alert("Trainer oprettet!");
                document.getElementById("trainer-form").reset();
                await hentTrainers();
            } else {
                alert(result.error);
            }
        }

            async function addPokemon(event) {
                event.preventDefault();

                const trainer_id = document.getElementById("select-trainer").value;
                const pokemon_id = document.getElementById("pokemon-id").value;

                console.log("Trainer ID:", trainer_id);
                console.log("Pokemon ID:", pokemon_id);

                try {
                    const response = await fetch("http://localhost:3000/trainer/catch", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            trainer_id: Number(trainer_id),
                            pokemon_id: Number(pokemon_id),
                        })
                    });

                    const result = await response.json();
                    console.log(result);

                    if (response.ok) {
                        alert("Pokémon tilføjet!");
                        document.getElementById("pokemon-form").reset();
                    } else {
                        alert(result.error);
                    }
                } catch (error) {
                console.error("Fejl:", error);}
            }

            document.getElementById("trainer-form").addEventListener("submit", createTrainer);
            document.getElementById("pokemon-form").addEventListener("submit", addPokemon);

hentTrainers();