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
