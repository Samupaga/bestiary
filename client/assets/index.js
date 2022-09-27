async function getBeastData() {
    // Reach out to API 
    const response = await fetch("http://localhost:3000/beasts");

    // Extract beast data from API
    const beasts = await response.json();

    // Log the data
    return beasts;

}

async function displayBeastData() {
    // Get the beast data
    const beasts = await getBeastData();

    // Get a reference to the cage
    const cage = document.getElementById("cage");

    // Loop through beast data
    for (let beast of beasts){
        // Create an HTML element
        const elem = document.createElement("li")
        const link = document.createElement("a")

        // Set element's content
        link.textContent = beast["name"]; 
        link.href = `beast.html?id=${beast['id']}`;

        // Add the element to the link
        elem.appendChild(link);

        // Add the element to the cage
        cage.appendChild(elem);

    }

}


async function createNewBeast(e) {
    e.preventDefault();

    // Extract data into an object 
    const data = {
        name: e.target.name.value,
        encounterRate: e.target.encounterRate.value
    }

    // Set the options for the fetch request
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    // Make a fetch request sending the data
    const response = await fetch("http://localhost:3000/beasts", options);

    if (response.status === 201){
        alert("Current creature created");
        window.location.reload();
    }

}

const form = document.querySelector("#create-form");
form.addEventListener("submit", createNewBeast);

displayBeastData();
