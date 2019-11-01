const dogBarDiv = document.querySelector('#dog-bar')
fetch('http://localhost:3000/pups') //eslint-disable-line
  .then(response => response.json())
  .then(appendAllPups)

function appendAllPups (pups) {
  for (const pup of pups) {
    appendPup(pup)
  }
}

function appendPup (pup) {
  const pupNameSpan = document.createElement('span')
  pupNameSpan.innerText = pup.name
  pupNameSpan.dataset.pupId = pup.id
  dogBarDiv.append(pupNameSpan)
  pupNameSpan.addEventListener('click', (event) => {
    const id = event.target.dataset.pupId
    fetchPupInfoWith(id).then(showPupInfo)
  })
}

function fetchPupInfoWith (id) {
  return fetch(`http://localhost:3000/pups/${id}`) //eslint-disable-line
    .then(response => response.json())
}

function showPupInfo (pup) {
  const dogInfoDiv = document.querySelector('#dog-info')
  dogInfoDiv.innerHTML = ''
  createAndAppendWithCallback('img', dogInfoDiv, (element) => { element.src = pup.image })
  createAndAppendWithCallback('h2', dogInfoDiv, (element) => { element.innerText = pup.name })
  createAndAppendWithCallback('button', dogInfoDiv, (element) => {
    element.innerText = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!'
    element.dataset.pupId = pup.id
    element.addEventListener('click', toggleGoodDog)
  })
}

function toggleGoodDog (event) {
  const isGoodDog = !(event.target.innerText === 'Good Dog!')
  const id = event.target.dataset.pupId
  const body = { isGoodDog: isGoodDog }
  const config = updatePupConfig(body)
  fetch(`http://localhost:3000/pups/${id}`, config) //eslint-disable-line
    .then(response => response.json())
    .then((pup) => { event.target.innerText = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!' })
}

function updatePupConfig (body) {
  return {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(body)
  }
}

function createAndAppendWithCallback (tagName, parent, callback) {
  const element = document.createElement(tagName)
  parent.append(element)
  if (callback !== undefined) {
    callback(element)
  }
  return element
}
