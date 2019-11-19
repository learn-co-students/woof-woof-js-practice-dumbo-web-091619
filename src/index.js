document.addEventListener("DOMContentLoaded",()=>{

    getDogs()
     .then(dogs => {
        dogs.forEach(addSpanWithName)
    })
})


function getDogs(){
  return fetch('http://localhost:3000/pups')
.then(res => res.json()
)}


function addSpanWithName(dog){
    // tags
    let dogDiv = document.querySelector('#dog-bar')
    let dogSpan = document.createElement("span")
    let dogH2 = document.createElement("h2")
    let dogInfoDiv = document.querySelector('#dog-info')
    let dogImage = document.createElement("img")
    let dogButton = document.createElement("button")
// innertxt assgn
    dogButton.innerText = dog.isGoodDog
    dogH2.innerText = dog.name
    dogStatus = dog.isGoodDog
    // attr assgn
    dogButton.id = dog.id
    dogImage.setAttribute('src',dog.image)
    // append
    dogDiv.append(dogSpan)
    dogSpan.append(dogH2)
//========================
// listening event
    dogSpan.addEventListener('click',function(){
        dogInfoDiv.innerHTML = ""
         dogSpan.append(dogImage)
         dogInfoDiv.append(dogSpan)
         dogInfoDiv.append(dogButton)
         
         if (dog.isGoodDog) {
            dogButton.innerText = `${dog.name} is a good dog :)`
        } else {
            dogButton.innerText = `${dog.name} is a bad dog :(`
        }
        dogButton.addEventListener('click',(event)=>{
            let dogStatus = dog.isGoodDog

             fetch(`http://localhost:3000/pups/${event.target.id}`,{
               method: "PATCH",
               headers: { 
                   "content-type":"application/json",
                   "accept":"application/json"
               },
               body:JSON.stringify({
                   isGoodDog:!dogStatus
               })
            })
            .then(res => res.json())
            .then(response =>{
                console.log(response)
                if (response.isGoodDog) {
                    dogButton.innerText = `${dog.name} is a good dog :)`
                } else {
                    dogButton.innerText = `${dog.name} is a bad dog :(`
                }
            })

        })
    })

    

}




