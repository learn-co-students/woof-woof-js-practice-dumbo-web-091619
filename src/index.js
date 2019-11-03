document.addEventListener("DOMContentLoaded", () => {
    // load vars
    const dogBar = document.getElementById("dog-bar")
    const dogInfo = document.getElementById("dog-info")
    const filterButton = document.getElementById("good-dog-filter")
    let filterBool = false

    // append dogs helper function
    const appendDog = (dog) => {
        let newDog = document.createElement("span")
        newDog.innerText = dog.name
        
        newDog.addEventListener("click", () => {
            // create dog display div
            let dogInfoDiv = document.createElement("div")
            
            // create and append dog pic
            let dogPic = document.createElement("img")
            dogPic.src = dog.image
            dogInfoDiv.appendChild(dogPic)

            // create and append dog name
            let dogHeader = document.createElement("h2")
            dogHeader.innerText = dog.name
            dogInfoDiv.appendChild(dogHeader)

            // create and append dog goodness button
            let dogBoolButton = document.createElement("button")
            if (dog.isGoodDog === true){
                dogBoolButton.innerText = "Good Dog!"
            } else {
                dogBoolButton.innerText = "Bad Dog!"
            }
            // add dog goodness button event handler
            dogBoolButton.addEventListener("click", () => {
            if (dog.isGoodDog === true){
                dog.isGoodDog = false
                dogBoolButton.innerText = "Bad Dog!"
                // send patch request to update db info
                falseUpdateDog(dog.id)
            } else {
                dog.isGoodDog = true
                dogBoolButton.innerText = "Good Dog!"
                // send patch request to update db info
                trueUpdateDog(dog.id)
            }
            })
            dogInfoDiv.appendChild(dogBoolButton)
            
            // append dog to display
            dogInfo.appendChild(dogInfoDiv)
        })
        // append each dog button to the dog bar
        dogBar.appendChild(newDog)
    }

    // CLICK ON DOGS IN THE DOG BAR TO SEE MORE INFO ABOUT THE GOOD PUPPER
    // MORE INFO INCLUDES A DOG PIC, A DOG NAME, AND A DOG BUTTON THAT INDICATES WHETHER IT IS A GOOD DOG OR A BAD DOG
    // CLICK ON GOOD DOG/BAD DOG BUTTON IN ORDER TO TOGGLE PUP GOODNESS
    const allDogs = async () => {
        // initial dog fetch
        let response = await fetch('http://localhost:3000/pups')
        let fetchedDogs = await response.json()

        // add dogs to page
        fetchedDogs.forEach(dog => {
            appendDog(dog)
        })
    }

    // load good dogs only
    const goodDogsOnly = async () => {
        // initial dog fetch
        let response = await fetch('http://localhost:3000/pups')
        let fetchedDogs = await response.json()
        fetchedDogs.forEach(dog => {
            // filter good dogs only
            if (dog.isGoodDog === true){
                appendDog(dog)
            }
        })
    }

    // configObj for good dog patch
    const trueConfigObj = {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify({
        isGoodDog: true 
        })
    }

    // configObj for bad dog patch
    const falseConfigObj = {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify({
            isGoodDog: false
        })
    }

    // good dog fetch
    const trueUpdateDog = async (id) => {
        let response = await fetch('http://localhost:3000/pups/' + id, trueConfigObj)
        trueDog = await response.json()
        console.log(trueDog)
    }

    // bad dog fetch
    const falseUpdateDog = async (id) => {
        let response = await fetch('http://localhost:3000/pups/' + id, falseConfigObj)
        falseDog = await response.json()
        console.log(falseDog)
    }

    // CLICK ON "FILTER GOOD DOGS" BUTTON IN ORDER TO JUST SEE GOOD DOGS OR SEE ALL DOGS IN DOG BAR
    filterButton.addEventListener("click", () => {   
        // clear dogBar   
        let barChild = dogBar.lastElementChild  
        while (barChild) { 
            dogBar.removeChild(barChild) 
            barChild = dogBar.lastElementChild 
        }
        // clear display
        let divChild = dogInfo.lastElementChild  
        while (divChild) { 
            dogInfo.removeChild(divChild) 
            divChild = dogInfo.lastElementChild 
        }
        // button ON action
        if (filterBool === false){
            filterBool = true
            filterButton.innerText = "filter good dogs: ON"
            goodDogsOnly()
        } else {
        // button OFF action
            filterBool = false
            filterButton.innerText = "filter good dogs: OFF"
            allDogs()
        }   
    })

    // initial page load
    allDogs()

})