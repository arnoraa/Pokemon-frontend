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
                labels: primaryTypeNames,
                datasets: [{
                    label: "Primary Types",
                    data: [28, 22, 14, 12, 12, 12, 9, 9, 8, 8, 7, 3, 3, 2, 2],
                    backgroundColor: [
                        "dodgerblue", "tan", "purple", "limegreen", "orange",
                        "yellowgreen", "gold", "peru", "goldenrod", "hotpink",
                        "firebrick", "indigo", "slateblue", "pink", "powderblue"
                    ]
                }]
            },
            options: {
                plugins:{
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Primary Types"
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Number of Pokémon"
                        }
                    }
                }
            }
        });

// fetch() sender en HTTP-forespørgsel til vores backend-API.
        fetch("http://localhost:3000/dashboard/lowest-stats")
            .then(response => {

                // Kontrollerer, om serveren har sendt et succesfuldt svar.
                if (!response.ok) {
                    throw new Error("Kunne ikke hente stat-data");
                }

                // Konverterer svaret fra JSON til JavaScript-data.
                return response.json();
            })
            .then(statistics => {

                // Opretter et tomt array til Pokémon-navnene.
                const pokemonNames = [];

                // Opretter et tomt array til Pokémonernes samlede stats.
                const pokemonStats = [];

                // Går igennem hver Pokémon i dataene fra API'et.
                statistics.forEach(statistic => {

                    // Tilføjer Pokémonens navn til navne-arrayet.
                    pokemonNames.push(statistic.name);

                    // Tilføjer Pokémonens samlede stats til stats-arrayet.
                    pokemonStats.push(statistic.total_stats);
                });

                // Finder canvas-elementet i HTML, hvor diagrammet skal vises.
                const lowestStatChart =
                    document.getElementById("lowestStats");

                // Opretter diagrammet ved hjælp af Chart.js.
                new Chart(lowestStatChart, {
                    // Vælger et søjlediagram.
                    type: "bar",

                    // Indeholder labels og værdier til diagrammet.
                    data: {
                        // Pokémon-navnene vises langs den lodrette akse.
                        labels: pokemonNames,

                        // Et dataset indeholder de værdier, der skal tegnes.
                        datasets: [{
                            // Navnet på datasættet.
                            label: "Samlede stats",

                            // Værdierne for hver Pokémon.
                            data: pokemonStats,

                            // Vælger farven på søjlerne.
                            backgroundColor: ["green", "orange","blue","grey","red"],

                            // Giver søjlerne afrundede hjørner.
                            borderRadius: 5,

                            // Bestemmer tykkelsen på søjlerne.
                            barThickness: 24
                        }]
                    },

                    // Indeholder indstillinger for diagrammets udseende.
                    options: {
                        // Gør søjlerne vandrette.
                        indexAxis: "y",

                        // Tilpasser diagrammet til containerens bredde.
                        responsive: true,

                        // Lader CSS bestemme diagrammets højde.
                        maintainAspectRatio: false,

                        plugins: {
                            // Skjuler forklaringen, da der kun er ét datasæt.
                            legend: {
                                display: false
                            }
                        },

                        // Indstillinger for diagrammets akser.
                        scales: {
                            // Den vandrette akse viser værdierne.
                            x: {
                                // Starter aksen ved nul.
                                beginAtZero: true,

                                // Tilføjer en titel til aksen.
                                title: {
                                    display: true,
                                    text: "Samlede stats"
                                }
                            },

                            // Den lodrette akse viser Pokémon-navnene.
                            y: {
                                // Fjerner gitterlinjerne bag navnene.
                                grid: {
                                    display: false
                                }
                            }
                        }
                    }
                });
            })

            // Fanger fejl, hvis data ikke kan hentes eller behandles.
            .catch(error => {
                console.error("Fejl:", error);
            });

// Henter data om de hurtigste Pokémon fra backend.
        fetch("http://localhost:3000/dashboard/highest-speed")
            .then(response => {

                // Kontrollerer, om forespørgslen lykkedes.
                if (!response.ok) {
                    throw new Error("Kunne ikke hente speed-data");
                }

                // Konverterer JSON-svaret til JavaScript-data.
                return response.json();
            })
            .then(statistics => {

                // Array til navnene på de hurtigste Pokémon.
                const pokemonSpeedNames = [];

                // Array til Pokémonernes Speed-værdier.
                const pokemonSpeed = [];

                // Går igennem hver Pokémon fra API'et.
                statistics.forEach(statistic => {

                    // Gemmer Pokémonens navn.
                    pokemonSpeedNames.push(statistic.name);

                    // Gemmer Pokémonens Speed-statistik.
                    pokemonSpeed.push(statistic.speed);
                });

                // Finder canvas-elementet i HTML.
                const highestSpeedChart =
                    document.getElementById("highestSpeed");

                // Opretter søjlediagrammet.
                new Chart(highestSpeedChart, {
                    // Vælger søjlediagram som diagramtype.
                    type: "bar",

                    data: {
                        // Pokémon-navnene bruges som labels.
                        labels: pokemonSpeedNames,

                        datasets: [{
                            // Navnet på datasættet.
                            label: "Speed",

                            // Værdierne for Pokémonernes hastighed.
                            data: pokemonSpeed,

                            // Vælger en blå farve til søjlerne.
                            backgroundColor: ["yellow","blue","purple","red","orange"],

                            // Afrunder søjlernes hjørner.
                            borderRadius: 5,

                            // Bestemmer søjlernes tykkelse.
                            barThickness: 24
                        }]
                    },

                    options: {
                        // Viser søjlerne vandret.
                        indexAxis: "y",

                        // Tilpasser bredden automatisk.
                        responsive: true,

                        // Gør det muligt at styre højden med CSS.
                        maintainAspectRatio: false,

                        plugins: {
                            // Skjuler forklaringen for et mere enkelt design.
                            legend: {
                                display: false
                            }
                        },

                        scales: {
                            // Den vandrette akse viser Speed-værdierne.
                            x: {
                                // Aksen starter ved nul.
                                beginAtZero: true,

                                // Forklarer, hvad værdierne betyder.
                                title: {
                                    display: true,
                                    text: "Speed"
                                }
                            },

                            // Den lodrette akse viser Pokémon-navnene.
                            y: {
                                // Fjerner unødvendige gitterlinjer.
                                grid: {
                                    display: false
                                }
                            }
                        }
                    }
                });
            })

            // Viser eventuelle fejl i browserens konsol.
            .catch(error => {
                console.error("Fejl:", error);
            });


// Henter Pokémon-data fra Route 25-endpointet.
        fetch("http://localhost:3000/dashboard/route-25")
            .then(response => {

                // Kontrollerer, om serveren har sendt et succesfuldt svar.
                if (!response.ok) {
                    throw new Error("Kunne ikke hente Route 25-data");
                }

                // Konverterer JSON-svaret til JavaScript-data.
                return response.json();
            })
            .then(statistics => {

                // Array til navnene på Pokémon fra Route 25.
                const pokemonRouteNames = [];

                // Array til Pokémonernes encounter rates.
                const pokemonRoute = [];

                // API'et returnerer et objekt med en egenskab, der hedder
                // pokemon. Derfor gennemgår vi statistics.pokemon.
                statistics.pokemon.forEach(statistic => {

                    // Tilføjer Pokémonens navn til navne-arrayet.
                    pokemonRouteNames.push(statistic.name);

                    // Tilføjer Pokémonens encounter rate.
                    pokemonRoute.push(statistic.encounter_rate);
                });

                // Finder canvas-elementet i HTML.
                const route25Chart =
                    document.getElementById("route25");

                // Opretter diagrammet.
                new Chart(route25Chart, {
                    // Vælger søjlediagram.
                    type: "bar",

                    data: {
                        // Pokémon-navnene vises langs den lodrette akse.
                        labels: pokemonRouteNames,

                        datasets: [{
                            // Forklarer, hvad søjlerne viser.
                            label: "Encounter rate",

                            // Værdierne for hver Pokémon.
                            data: pokemonRoute,

                            // Vælger farve til søjlerne.
                            backgroundColor: [
                                "gold",
                                "turquoise",
                                "green",
                                "yellow",
                                "dodgerblue",
                                "orange",
                                "purple",
                                "red",
                                "brown",
                                "pink",
                                "gray",
                                "lightseagreen",
                                "violet"
                            ],

                            // Afrunder søjlernes hjørner.
                            borderRadius: 5,

                            // Bestemmer søjlernes tykkelse.
                            barThickness: 20
                        }]
                    },

                    options: {
                        // Gør søjlerne vandrette.
                        indexAxis: "y",

                        // Tilpasser diagrammet til containerens bredde.
                        responsive: true,

                        // Giver CSS kontrol over diagrammets højde.
                        maintainAspectRatio: false,

                        plugins: {
                            // Skjuler forklaringen, fordi der kun er ét datasæt.
                            legend: {
                                display: false
                            },

                            // Viser antallet af Pokémon i diagrammets overskrift.
                            title: {
                                display: true,
                                text: `Antal Pokémon: ${statistics.antal_pokemon}`
                            },

                            // Tilpasser teksten, der vises, når man holder
                            // musen over en søjle.
                            tooltip: {
                                callbacks: {
                                    label: context =>
                                        `Encounter rate: ${context.parsed.x}%`
                                }
                            }
                        },

                        scales: {
                            // Den vandrette akse viser encounter rate.
                            x: {
                                // Starter aksen ved nul.
                                beginAtZero: true,

                                // Beskriver værdierne på aksen.
                                title: {
                                    display: true,
                                    text: "Encounter rate (%)"
                                }
                            },

                            // Den lodrette akse viser Pokémon-navnene.
                            y: {
                                // Fjerner gitterlinjer for et renere udseende.
                                grid: {
                                    display: false
                                }
                            }
                        }
                    }
                });
            })

            // Fanger fejl fra fetch, JSON-konvertering eller diagramoprettelse.
            .catch(error => {
                console.error("Fejl:", error);
            });
    });