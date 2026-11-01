-- Opgave beskrivelse - Frontend

Denne repository indeholder frontend-delen af Pokédex-projektet.

Applikationen giver brugerne muglighed for at udforske Pokémon, se information
om trainers og deres Pokémon samt få et samlet overblik
over forskellige statistikker gennem et dashboard.

Frontend er udviklet med HTML, CSS og JavaScript og kommunikerer med eget
backend-API ved hjælp af JavaScripts fetch()-funktion.

-- Pokémon siden

Pokémon-siden giver brugerne muglighed for at udforske Pokémon og se
information om deres forskellige stats.

Funktioner: 

- Vise en liste over Pokémon.
- Se Pokémon og deres stats.
- Filtrere Pokémon ud fra forskellige kriterier.
- Søge efter Pokémon ud fra deres navn.

Vores filtreringsmuligheder:

- Se alle Pokémon der starter med name = ?.
- Se alle Pokémon med en bestemt type.
- Se alle Pokémon hvor attack > ?.



-- Trainer siden

Trainers-siden giver brugerne mulighed for at udforske trainers
og administrere deres Pokémon.

Funktioner:

- Vise en liste over alle trainers.
- Se hvilke Pokémon en bestemt trainer ejer.
- Oprette nye trainers.
- Tilføje Pokémon til en trainer.


-- Dashboard/Statistikker

Dashboardet giver brugerne et samlet overblik over forskellige
statistikker fra Pokémon-databasen.

Funktioner og statistikker:

- Antal Pokémon pr. type.
- De 5 Pokémon med laveste stats.
- De 5 hurtigste Pokémon.
- Pokémon på Route 25.


-- Forbindelse til backend

Frontend kommunikerer med vores eget backend-API ved
hjælp af JavaScripts fetch()-funktion.

Data hentes og sendes mellem frontend og backend gennem HTTP-requests,
herunder GET- og POST-requests.

