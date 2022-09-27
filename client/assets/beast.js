async function getBeastData() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    console.log(id);

    const data = await fetch(`http://localhost:3000/beasts/${id}`);
    const beast = await data.json();

    return beast;
}

async function displayBeastData() {
    
    const beast = await getBeastData();
    console.log(beast);

    const getName = document.querySelector('#name');
    const getDescr = document.querySelector('#description');
    const getHabitat = document.querySelector('#habitat');
    const getLoot = document.querySelector('#loot');

    getName.textContent = beast.name;
    getDescr.textContent = beast.description;
    getHabitat.textContent = beast.habitat;
    getLoot.textContent = beast.loot;

}

displayBeastData();
