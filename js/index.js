const url = `https://api.thecatapi.com/v1/breeds`;
const api_key = 'live_wTn0o0wfYIBtbExUxfirZReRvfARViX7WSF1F6369C4g2Fuf5zdCazixwfjZvrhO';

// a variable / empty array to store the breeds//
let storedBreeds = [];

// variable to store matching behavior //
let matchingBehavior = [];

// variable that will contain the search form from the html file//
const searchForm = document.getElementById("searchFormId");

const hiddenBehavior = document.getElementById("header-behavior");
hiddenBehavior.hidden = true;



// event listener for the form / search bar//
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(event);

    // variable that will contain the input from the user (whatever word they search)//
    const searchBehavior = document.getElementById("searchBehaviorId").value.toLowerCase();
    //if the user clicks search without an input, a message will pop up//
    if(!searchBehavior) {
        alert()
        event.target.checked = false;
        return;
    }
    // iterate through the stored breeds array, then get the temperament of each breed//
    for (let i = 0; i < storedBreeds.length; i++) {
        const breed = storedBreeds[i];
        const temperament = breed["temperament"].toLowerCase();
        // if the search behavior is in the string of temperament and the number is greater than 0 then add the breed at the end of the empty array (matching behavior) ---> still have to fix this since the array keeps getting appended//
        console.log(temperament);
        if (temperament.search(searchBehavior) > 0) {
            matchingBehavior.push(breed);
        }
    }
    console.log(matchingBehavior);
    //randomInt contains a random integer between 0 and the last element of the array by using the getRandomInteger functions to get a random breed that contains the matchingBehavior//
    const randomInt = getRandomInteger(0, matchingBehavior.length -1);
    const matchedBreed = matchingBehavior[randomInt];
    // get the information and image of the cat that matches the search//
    catImgAndInfo(matchedBreed);

    hiddenBehavior.hidden = false;

    searchForm.reset();

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
    document.getElementById("breed-temp").textContent = breedObject.temperament;
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
