//DOM functions
function character(animal){
    let card = document.createElement('li');
    card.innerHTML = `
    <img src="${animal.image}">
    <h3>${animal.name}</>
    <p>Votes: <span id="vote-count-${animal.id}">${animal.votes}</span></p>

    <button id="vote-button-${animal.id}">Vote here</button>
    <button id="delete-button-${animal.id}">Delete Vote</button>`
    // Add event listener to the vote button
  card.querySelector(`#vote-button-${animal.id}`).addEventListener('click', () => {
    // Update the vote count
    animal.votes++;
    document.getElementById(`vote-count-${animal.id}`).textContent = animal.votes;
    
  });

  // Add event listener to the delete button
  card.querySelector(`#delete-button-${animal.id}`).addEventListener('click', () => {
    // Remove the card from the list
    animal.votes--;
    document.getElementById(`vote-count-${animal.id}`).textContent = animal.votes;

  });

    //Animal Dom
    document.querySelector('#animsList').appendChild(card);
    
    

}
//To fetch the list of animals from the server

function getAnimals(){
    fetch('http://localhost:3000/characters')
    .then(receive => receive.json())
    .then(data => data.forEach(animal => character(animal)));
    
}

//Get data and send it to the DOM
function initialize(){
    getAnimals()
}

initialize();

