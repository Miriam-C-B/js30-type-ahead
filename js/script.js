
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'; //large array someone compiled and made available on GitHub about cities in the US 

const cities = []; //empty array we can put the fetched cities into

fetch(endpoint) //fetches the information from endpoint
    .then(blob => blob.json()) //it can only fetch raw data but doesn't know what kind of data so we have to use a json method to tell the browser that it's fetching a json file
    .then(data => cities.push(...data)); //once browser knows it looks at a json file we can add the date into the aray by using push and spread (...)

//function that creates a smaller array that contains only cities/states that match the searched word(s)
function findMatches(wordToMatch, cities) {
    return cities.filter(places => {
        //we need to figure out if the city or state matches what was searched
        const regex = new RegExp(wordToMatch, 'gi'); //Regular expression we can use below; g stands for global and i for insensitive, meaning it'll accept
        // lower and upper case letters
        return places.city.match(regex) || places.state.match(regex);
        //checks if variable for city   OR if variable for state matches the searched word
    });
};

//function that formats the population numbers by adding a comma to make them more readable; he got this function from the internet
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//display function
function displayMatches() {
    const matchArray = findMatches(this.value, cities); //this runs the findMatches function
    const html = matchArray.map(place => { //the following is what happens when the search input fits items in the matchArray
        const regex = new RegExp(this.value, 'gi');//the this.value is whatever the person searched for
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);//replaces the regex with the letters you typed in and highlights them
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);//does the above with the state name
        return ` 
        <li> 
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
        `;//this is the html (and css) we want to add when it finds a match
    }).join("");
    suggestions.innerHTML = html; //adds the HTML to the unordered list to display the search results
}

const searchInput = document.querySelector(".search"); //input field
const suggestions = document.querySelector(".suggestions"); //unordered list

//listen for changes in the input field
searchInput.addEventListener("change", displayMatches); //displays function when you put something into the field and click outside of it
searchInput.addEventListener("keyup", displayMatches); //displays function as soon as you type in another key
