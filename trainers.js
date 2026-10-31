async function hentTrainers() {
    const response = await fetch("http://localhost:3000/api/trainers");
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
                const response = await fetch(`http://localhost:3000/api/trainers/pokemon?id=${trainerId}`);

            if (response.ok) {
                throw new Error("Kunne ikke hente trainer");
            }

            const pokemon = await response.json();
            showTrainerPokemon(pokemon);

        } catch (error) {
            console.error("Fejl:", error);
    }
}

function showTrainerPokemon(pokemon) {
    const list = document.getElementById("trainer-pokemon");

    list.innerHTML = "";

    pokemon.forEach((p) => {
        list.innerHTML += `
        <div>
            <h2>${p.name}</h2>
            <p>Type: ${p.primary_type}</p>
            <p>Attack: ${p.attack}</p>
            <hr>
        </div>`;
    });
}
        async function createTrainer(event) {
            event.preventDefault();

            const trainer_name = document.getElementById("trainer-name").value;
            const hometown = document.getElementById("hometown").value;
            const age = document.getElementById("age").value;


            const response = await fetch("http://localhost:3000/api/trainers/new", {
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

                const response = await fetch("http://localhost:3000/api/trainers/catch", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        trainer_id: Number(trainer_id),
                        pokemon_id: Number(pokemon_id)
                    })
                });

                const result = await response.json();

                if (response.ok) {
                    alert("Pokémon tilføjet!");
                    document.getElementById("pokemon-form").reset();
                } else {
                    alert(result.error);
                }
            }

            document.getElementById("trainer-form").addEventListener("submit", createTrainer);
            document.getElementById("pokemon-form").addEventListener("submit", addPokemon);

await hentTrainers();