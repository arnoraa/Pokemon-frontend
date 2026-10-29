fetch("http://localhost:3000/dashboard/types")
    .then(response => {
        if (!response.ok) {
            throw new Error("Kunne ikke hente dashboard-data");
        }
        return response.json();
    })
    .then(statistics => {
        const labels = [];
        const amounts = [];

        statistics.forEach(statistic => {
            labels.push(statistic.primary_type);
            amounts.push(statistic.antal);
        });

        const pokemonTypes = document.getElementById("types");

        new Chart(pokemonTypes, {
    type: "bar",
    data: {
        labels: ["Water", "Normal", "Poison", "Grass", "Fire", "Bug", "Electric","Rock","Ground","Psychic","Fighting","Ghost","Dragon","Fairy","Ice"],
        datasets: [{
            label: "Number of each Primary Type",
            data: [28, 22, 14, 12, 12, 12, 9, 9, 8, 8, 7, 3, 3, 2, 2],
            backgroundColor: ["blue", "lightgrey","purple","green","red","dark","yellow", "brown", "darkgrey", ""]
        }]
    }
})
    });