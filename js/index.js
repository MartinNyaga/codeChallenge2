// Getting the data from server
function getData() {
  fetch('http://localhost:3000/characters')
    .then(response => response.json())
    .then(data => domManipulate(data));
}

getData();

// The DOM manipulation
function domManipulate(anim) {
  let card = document.getElementById('animsList');
  let infoContainer = document.getElementById('container');

  for (let dub of anim) {
    let animal = document.createElement('li');
    animal.innerText = dub.name;
    card.appendChild(animal);

    animal.addEventListener('click', () => {
      removeInfo();
      moreInfo(dub, infoContainer);
    });

    //Creating the voting button and event listener
    let voting = document.createElement('button');
      let votes = dub.votes;
      voting.textContent = 'Vote'
      animal.appendChild(voting)
      voting.addEventListener('click', () => {
        votes++
        updateVote(dub.id, votes);

      })
  }
}

// Remove displayed information after clicking another name
function removeInfo() {
  let infoElements = document.getElementsByClassName('info');
  while (infoElements.length > 0) {
    infoElements[0].remove();
  }
}

// Update votes on the server
function updateVote(id, votes) {
  fetch(`http://localhost:3000/characters/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ votes: votes }),
  })
    .then(response => response.json())
    .then(data => console.log('Votes updated on the server:', data))
    
}

// Getting more information from DOM
function moreInfo(domInfo, container) {
  let info = document.createElement('li');
  info.classList.add('info');
  info.innerHTML = `<img src="${domInfo.image}">
                    <h3>${domInfo.name} Votes are: ${domInfo.votes}</h3>`;
  container.appendChild(info);
}
