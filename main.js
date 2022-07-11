let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
    getRepos();
};


// Get Repos Fuction
function getRepos() {

    if (theInput.value == "") { //If Value Is Empty
        //console.log('Value Can\'t Be Empty'); //For Testing

        reposData.innerHTML = "<span style=\"color:#96121d;font-weight:bold;\">Please Write Github Username.</span>"



    } else {
        //console.log(theInput.value); //For Testing

        fetch(`https://api.github.com/users/${theInput.value}/repos`)
            .then((response) => response.json())

            .then((repositoriesData) => { //This is the data of the repositories

                //1- We need to Empty The Container
                reposData.innerHTML = '';
                //console.log(repositoriesData); // For Testing

                //2- We need to loop in the Repositories Data
                repositoriesData.forEach(data => {

                    // Create The Main Div Element
                    let mainDiv = document.createElement("div");

                    // Create Repo Name Text
                    let repoName = document.createTextNode(data.name);

                    // Append the text to main div
                    mainDiv.appendChild(repoName);

                    // Craete Repo Url Anchor
                    let theUrl = document.createElement('a');

                    // Create Repo Url Text
                    let theUrlText = document.createTextNode("Visit");

                    // Append the Repo Url Text To Anchor Tag
                    theUrl.appendChild(theUrlText);

                    // Add The HyperText Reference
                    theUrl.href = `https://github.com/${theInput.value}/${data.name}`;

                    // Set attribute Blank
                    theUrl.setAttribute('target', '_blank');

                    // Append the url anchor to the main div
                    mainDiv.appendChild(theUrl);

                    // Create stars count span
                    let starsSpan = document.createElement('span');

                    // Create the stars count text
                    let starsText = document.createTextNode(`Stars ${data.stargazers_count}`);

                    // Add stars count text to stars span
                    starsSpan.appendChild(starsText);

                    // Append stars count span to main div
                    mainDiv.appendChild(starsSpan);

                    // Add class on main div for styling
                    mainDiv.className = 'repo-data-box';

                    // Appemd the name div to the container
                    reposData.appendChild(mainDiv);
                });

            });
    }

}


document.body.addEventListener("keydown", function(event) {
    if (event.keyCode == 13) {
        //alert("Hello! You pressed the enter key!");
        getRepos();

    }
});