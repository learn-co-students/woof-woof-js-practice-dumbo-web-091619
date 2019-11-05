document.addEventListener("DOMContentLoaded", function(){
  let dogList = document.querySelector('#dog-bar')
  let dogInfo = document.querySelector('#dog-info')
  let list = document.querySelector('#good-dog-filter')
  let dogArr = [];
  let toggled = false;

  // function getDogs(){
  //   fetch("http://localhost:3000/pups")
  //     .then(function(response) {
  //       return response.json();
  //     })
  //     .then(function(dogs){
  //        dogArr = dogs.forEach(function(dog){
  //         appendDog(dog)
  //       })
  //   })
  // }

  function getDogs(){
    return fetch("http://localhost:3000/pups")
      .then(res => res.json());
  }

  getDogs().then( dogsArr => {
    dogsArr.forEach(appendDog);
  })


    function appendDog(dog){
      let newDog = document.createElement('span')
      let dogName = document.createElement('h2')
      let dogImg = document.createElement('img')
      let dogbutton = document.createElement('button')
      newDog.innerText = dog.name
      newDog.dataset.id = dog.id

      dogList.append(newDog)
      newDog.addEventListener("click", function(){

        dogInfo.innerHTML = ""
        dogImg.src = dog.image
        dogName.innerText = dog.name
        dogbutton.innerText = dog.isGoodDog ? "Good Dog" : "Bad Dog"
        dogInfo.append(dogImg,dogName,dogbutton)
      })

      dogbutton.addEventListener('click', function(){
        dog.isGoodDog = !dog.isGoodDog
        fetch(`http://localhost:3000/pups/${dog.id}`, {
          method: "PATCH",
          headers: {
            'content-type': "application/json",
            "accept": "application/json"
          },
          body: JSON.stringify ({
            isGoodDog: dog.isGoodDog
          })
        })
          .then(function(response) {
            return response.json();
          })
          .then(function(json){
          dogbutton.innerText = dog.isGoodDog ? "Good Dog" : "Bad Dog"
          })
      })

    }



})
