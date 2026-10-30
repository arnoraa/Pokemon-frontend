async function hentTrainers() {
    try{
        const response = await fetch("http://localhost:3000/api/trainers");

        if (!response.ok) {
            throw new Error("Kunne ikke hente trainers");
        }

        const trainers = await response.json();
        const liste = document.getElementById("trainer-liste");

        if (!liste) {
            throw new Error("Elementet trainer-liste findes ikki i HTML");
        }

        liste.replaceChildren();

        trainers.forEach((trainer) => {
            const navn = document.createElement("h3");
            navn.textContent = trainer.trainer_name;
            liste.appendChild(navn);
        });
    } catch (error) {
        console.log("Fejl:", error);
    }
}

hentTrainers();