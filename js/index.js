const url = `https://api.thecatapi.com/v1/breeds`;
const api_key = 'live_wTn0o0wfYIBtbExUxfirZReRvfARViX7WSF1F6369C4g2Fuf5zdCazixwfjZvrhO';

// a variable to store the breeds//
let storedBreeds = [];
let matchingBehavior = [];
// let searchedBehavior = "";

const searchForm = document.getElementById("searchFormId");

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(event);

    const searchBehavior = document.getElementById("searchBehaviorId").value.toLowerCase();
    if(!searchBehavior) {
        alert("Please enter some text before searching.")
        event.target.checked = false;
        return;
    }

    for (let i = 0; i < storedBreeds.length; i++) {
        const breed = storedBreeds[i];
        const temperament = breed["temperament"].toLowerCase();
        
        console.log(temperament);
        if (temperament.search(searchBehavior) > 0) {
            matchingBehavior.push(breed);
        }
    }
    console.log(matchingBehavior);

    const randomInt = getRandomInteger(0, matchingBehavior.length -1);
    const matchedBreed = matchingBehavior[randomInt];

    catImgAndInfo(matchedBreed);

})

// //function to get a random breed//
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// //function to show images and information of the breeds//
function catImgAndInfo(breedObject) {
    // display image of cat//
    document.getElementById("cat-image").src = breedObject.image.url;
    //breed name//
    document.getElementById("breed-name").innerHTML = breedObject.name;
    //characteristics//
    document.getElementById("breed-json").textContent = breedObject.temperament;
}

//fetch data//
fetch(url, {
    headers: {
        "x-api-key": api_key,
    },
}).then((response) => {
    if (!response.ok) {
        throw new Error("Search failed");
    }
    return response.json();
}).then((data) => {
    storedBreeds = data;
    console.log(storedBreeds);
}).catch((error) => {console.error("An error ocurred",error)});
