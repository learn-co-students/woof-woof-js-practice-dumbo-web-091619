document.addEventListener("DOMContentLoaded", (event) => {
	event.preventDefault()

	let dog_bar = document.querySelector("#dog-bar")
	let dog_cont = document.querySelector("#dog-summary-container")
	let dog_info = document.querySelector("#dog-info")
	let dog_filter = document.querySelector("#good-dog-filter")

	dog_filter.classList = "off"

	fetch("http://localhost:3000/pups")
	.then(response => response.json())
	.then((response_object) => {
		response_object.forEach((dog) => {
			read_dog(dog)
		})
	})

	dog_filter.addEventListener("click", (event) => {
		event.preventDefault()

		dog_filter.classList.toggle("on")
		dog_filter.classList.toggle("off")

		fetch("http://localhost:3000/pups")
			.then(response => response.json())
			.then((response_object) => {
				if (dog_filter.className == "on") {
					dog_filter.innerText = "Filter good dogs: ON"
					response_object.forEach((dog) => {
						if (dog.isGoodDog) {
							read_dog(dog)
						}
					})
				} else {
					dog_filter.innerText = "Filter good dogs: OFF"
					response_object.forEach((dog) => {
							read_dog(dog)
					})
				}
		})
		dog_bar.innerText = ""
	})

	function read_dog(dog){
		let dog_span = document.createElement("span")
		let dog_img = document.createElement("img")
		let dog_name = document.createElement("h2")

		let dog_button = document.createElement("button")

		dog_span.addEventListener("click", (event) => {
			event.preventDefault()
			dog_info.innerHTML = ""

			dog_info.dataset.id = `${dog.id}`
			dog_img.src = `${dog.image}`
			dog_name.innerText = `${dog.name}`;

			dog_button.addEventListener("click", (event) => {
				event.preventDefault()

				if (dog.isGoodDog === true) {
					dog.isGoodDog = false
					dog_button.innerText = "Bad Dog"
				} else if (dog.isGoodDog === false) {
					dog.isGoodDog = true
					dog_button.innerText = "Good Dog"
				}

				fetch(`http://localhost:3000/pups/${dog.id}`, {
					method: "PATCH",
					body: JSON.stringify({
						isGoodDog: dog.isGoodDog
					}),
					headers: {
						'Content-type' : 'application/json'
					}
				})
			});

			(dog.isGoodDog) ? dog_button.innerText = "Good Dog" : dog_button.innerText = "Bad Dog";

			dog_info.append(dog_img)
			dog_info.append(dog_name)
			dog_info.append(dog_button)
		})

		dog_span.append(dog.name)
		dog_bar.append(dog_span)
	}

})