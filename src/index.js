document.addEventListener("DOMContentLoaded", (e)=>{

let dogBar = document.getElementById("dog-bar");
let dogSummary = document.getElementById("dog-summary-container");
let filterButton = document.getElementById("good-dog-filter");
let filter = false;
fetchDogs();
//============================================================
function fetchDogs(){
if (filter === false){
fetch('http://localhost:3000/pups')
.then(r => r.json())
.then(allDogs => {
    allDogs.forEach(dog => {
        createSpan(dog)
    })
})
} else {
    fetch('http://localhost:3000/pups')
    .then(r => r.json())
    .then(allDogs => {
    let filteredDogs = allDogs.filter(dog => dog.isGoodDog === true);
    filteredDogs.forEach(dog => {

        createSpan(dog)
    })
})
}
}

//============================================================
//event lister for filter button

filterButton.addEventListener('click', (e) => {
    filter = !filter;
    dogBar.innerHTML ="";
    fetchDogs();
    if (filter){
        e.target.innerText = "Filter good dogs: ON";
    } else {
        e.target.innerText = "Filter good dogs: OFF";
    }

})




//============================================================
//helper methods

function createSpan(dogData){
    let dogSpan = document.createElement('span');
    dogSpan.innerText = dogData.name

    dogSpan.addEventListener('click', (e) => {
        htmlifyDog(dogData)
    })

    dogBar.appendChild(dogSpan)
}

function htmlifyDog(dogData){
    dogSummary.innerHTML = ""
    let goodBoy = dogData.isGoodDog
    let dogId = dogData.id
    let dogImg = document.createElement('img')
    let dogName = document.createElement('h2')
    let goodDogButton = document.createElement('button')

    dogName.innerText = dogData.name;
    dogImg.src = dogData.image;

   decideIfGood(dogData, goodDogButton)

   goodDogButton.addEventListener('click', (e) => {
    goodBoy = !goodBoy
    fetch(`http://localhost:3000/pups/${dogId}`, {
        method: "PATCH",
        body: JSON.stringify({
            isGoodDog: goodBoy
        }),
        headers: {
        "Content-type": "application/json"
        }
        })
        .then(response => response.json())
        .then(json => {
            decideIfGood(json, e.target)
        })
   })

   dogSummary.appendChild(dogImg);
   dogSummary.appendChild(dogName);
   dogSummary.appendChild(goodDogButton);

}

function decideIfGood(dogData, button){
    if (dogData.isGoodDog === true){
        button.innerText = "Good Dog!";
    } else {
        button.innerText = "Bad Dog!";
    }
}

})