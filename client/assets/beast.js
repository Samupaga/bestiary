async function getBeastData() {
    // Gets data for beast chosen from bestiary
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    //console.log(id);
    const data = await fetch(`http://localhost:3000/beasts/${id}`);
    const beast = await data.json();
    console.log(beast)
    return beast;
}

async function displayBeastData() {
    // function that displays beast data on client side

    const beast = await getBeastData();

    const getName = document.querySelector('#name');
    const getDescr = document.querySelector('#description');
    const getHabitat = document.querySelector('#habitat');
    const getLoot = document.querySelector('#loot');

    getName.textContent = beast.name;
    getDescr.textContent = beast.description;
    getHabitat.textContent = beast.habitat;
    getLoot.textContent = beast.loot;

}

displayBeastData(getBeastData());


async function fetchBeast(id){
    console.log("This is in fetchBeast" + id)

    // const params = new URLSearchParams(window.location.search)
    // //const id = params.get('id');

    const data = await fetch(`http://localhost:3000/beasts/${id}`) 
    const beast = await data.json()

    console.log(beast)
    return beast

}

//fetchBeast();

const prevBeast = document.getElementById('previous-beast');
prevBeast.addEventListener('click', async () => {
    
    let beast = await getBeastData();
    
    let id = beast.id
    id--
    // replace current URL with the URL for the previous beast in id order 
    window.location.replace(`file:///Users/samuelepagano/Desktop/Futureproof/Week%205/backend/client/beast.html?id=${id}`);
    console.log(window.location.href)
    displayBeastData(getBeastData());
})

const nextBeast = document.getElementById('next-beast');
nextBeast.addEventListener('click', async() => {

    let beast = await getBeastData();

    let id = beast.id;
    id++
    // replace current URL with the URL for the next beast in id order
    window.location.replace(`file:///Users/samuelepagano/Desktop/Futureproof/Week%205/backend/client/beast.html?id=${id}`)
    console.log(window.location.href)
    displayBeastData(getBeastData());
})
