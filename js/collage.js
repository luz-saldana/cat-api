const url = `https://api.thecatapi.com/v1/images/search?limit=15`;
const api_key = `live_wTn0o0wfYIBtbExUxfirZReRvfARViX7WSF1F6369C4g2Fuf5zdCazixwfjZvrhO`;

fetch(url,{headers: {
    'x-api-key': api_key
  }})
.then((response) => {
 return response.json();
})
.then((data) => {
    //with the help of the cat api website//
    let imagesData = data;
    console.log("images data", imagesData)
    imagesData.map(function(imageData) {

        let image = document.createElement('img');
        //add some styling here to make each picture look more consistent with the look//
        image.style.maxWidth = "10em";
        image.style.alignItems = "center";
        image.style.objectFit = "cover";
        
        image.src = `${imageData.url}`;
        console.log(imageData.url)

        document.getElementById('collage-section').appendChild(image);

        });
    }).catch((error) => {console.error("An error ocurred",error)});
