let dogURL = "http://localhost:3000/pups" // put in a variable
let dogBar = document.getElementById('dog-bar') // get dog bar to use for later
let showDog = document.querySelector('#dog-info') // get display div to use for later

// fetch all the Dogs and put it in the Dog Bar
fetch(dogURL) // fetch with the URL
.then(r => r.json()) // takes the response from the fetch and turns it into json
.then(res => { // doing something with the response
    // debugger
    res.forEach(dog => {
        makeDogJSONtoHTML(dog) // a function that we created to display the dogs on the bar
    })
})

// this will get the Dog and display it on the bar
function makeDogJSONtoHTML(dog) {

    let dogSpan = document.createElement('span') // creates an empty 'span' element
    dogSpan.innerText = dog.name 
    dogSpan.id = dog.id 
    dogBar.append(dogSpan) 

    // making the 'span' on the bar clickable
    //                        event    what u want to do when its clicked
    dogSpan.addEventListener("click", function(){
        showDog.innerHTML = ""

        // showDog the div container to display the dog information
        showDog.innerHTML = `<img src=${dog.image}>
        <h2>${dog.name}</h2>`   

        // creates dog button
        let dogButton = document.createElement("button")

        if (dog.isGoodDog) {
            dogButton.innerText = "Good Dog!";
        } else {
            dogButton.innerText = "Bad Dog!";
        }

        dogButton.id = dog.id
        showDog.append(dogButton)

        // // PATCH/POST/DELETE fetch
        // fetch("url/id", {
        //     method: "PATCH", // PATCH/POST/DELETE
        //     headers: {
        //         "content-type": "application/json",
        //         "accept": "application/json"
        //     },
        //     body: JSON.stringify({
        //         attribute: newAttribute,
        //         anotherAttribute: anotherNewAttribute // changes the specific attribute
        //     }) 
        // }) 

        // functionality of the dogButton
        dogButton.addEventListener("click", function(event){
            let status = dog.isGoodDog
            // update FETCH
            fetch(`http://localhost:3000/pups/${event.target.id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify({
                    isGoodDog: !status 
                })
            })
            .then(r => r.json())
            .then(res => {
                if (res.isGoodDog) {
                    dogButton.innerText = "Good Dog!";
                } else {
                    dogButton.innerText = "Bad Dog!";
                }
            })
        })
    })
}