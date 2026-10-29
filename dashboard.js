fetch("http://localhost:3000/dashboard/types")
    .then(response => {
        if (!response.ok) {
            throw new Error("Kunne ikke hente dashboard-data");
        }
        return response.json();
    })
    .then(statistics => {
        const primaryTypeNames = [];
        const amountOfEachType = [];

        statistics.forEach(statistic => {
            primaryTypeNames.push(statistic.primary_type);
            amountOfEachType.push(statistic.antal);
        });

        const primaryTypeChart = document.getElementById("types");

        new Chart(primaryTypeChart, {
    type: "bar",
    data: {
        labels: ["Water", "Normal", "Poison", "Grass", "Fire", "Bug", "Electric","Rock","Ground","Psychic","Fighting","Ghost","Dragon","Fairy","Ice"],
        datasets: [{
            label: "Primary Types",
            data: [28, 22, 14, 12, 12, 12, 9, 9, 8, 8, 7, 3, 3, 2, 2],
            backgroundColor: ["dodgerblue", "tan","purple","limegreen","orange","yellowgreen","gold", "peru", "goldenrod", "hotpink","firebrick","indigo","slateblue","pink","powderblue"]
        }]
    }
})
    });


fetch("http://localhost:3000/dashboard/lowest-stats")
    .then(response => {
        if (!response.ok) {
            throw new Error("Kunne ikke hente stat-data");
        }

        return response.json();
    })
    .then(statistics => {
        const pokemonNames = [];
        const pokemonStats = [];

        statistics.forEach(statistic => {
            pokemonNames.push(statistic.name);
            pokemonStats.push(statistic.total_stats);
        });

        // Diagrammet oprettes her, efter dataene er hentet
        const lowestStatChart = document.getElementById("lowestStats");

        new Chart(lowestStatChart, {
            type: "bar",
            data: {
                // Navnene kommer nu fra dit API
                labels: pokemonNames,

                datasets: [{
                    label: "Pokémon with lowest total stats",
                    // Stats kommer nu fra dit API
                    data: pokemonStats,
                    backgroundColor: [
                        "green",
                        "blue",
                        "yellow",
                        "red",
                        "orange"
                    ]
                }]
            }
        });
    })
    .catch(error => {
        console.error("Fejl:", error);
    });


fetch("http://localhost:3000/dashboard/highest-speed")
    .then(response => {
        if (!response.ok) {
            throw new Error("Kunne ikke hente speed-data");
        }

        return response.json();
    })
    .then(statistics => {
        const pokemonSpeedNames = [];
        const pokemonSpeed = [];

        statistics.forEach(statistic => {
            pokemonSpeedNames.push(statistic.name);
            pokemonSpeed.push(statistic.speed);
        });

        // Diagrammet oprettes, efter dataene er hentet
        const highestSpeedChart =
            document.getElementById("highestSpeed");

        new Chart(highestSpeedChart, {
            type: "bar",
            data: {
                labels: pokemonSpeedNames,

                datasets: [{
                    label: "Pokémon with highest speed",
                    data: pokemonSpeed,
                    backgroundColor: [
                        "green",
                        "yellow",
                        "orange",
                        "blue",
                        "red"
                    ]
                }]
            }
        });
    })
    .catch(error => {
        console.error("Fejl:", error);
    });
