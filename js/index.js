const projectSection = document.getElementById('cat-project');
const projectList = projectSection.querySelector('ul');

fetch('https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=live_wTn0o0wfYIBtbExUxfirZReRvfARViX7WSF1F6369C4g2Fuf5zdCazixwfjZvrhO').then((response) => {
    return response.json();
}).then((data) => {
    console.log("data: ", data);
    for (let i = 0; i < data.length; i++) {
        const project = data[i].breeds[0].name;
        const li = document.createElement('li');
        li.innerText = project;

        projectList.appendChild(li);
    }
}).catch((error) => {
    console.error("An error ocurred", error);
});