let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  //load toys from database
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(data => data.forEach(toy => {
    const cardArea = document.querySelector("#toy-collection");
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src = "${toy.image}" class = "toy-avatar">
    <p>${toy.likes} likes</p>
    <button type = "button" class = "like-btn" id="${toy.id}">Like</button>
    `
    card.querySelector("button").addEventListener("click", () => {
      toy.likes += 1;
      console.log(toy.likes);
      card.querySelector("p").textContent = `${toy.likes} likes`
      updateLikes(card, toy.likes);
    });
    
    cardArea.appendChild(card);
    
  }))
})

    //post request for new toy
    const toyForm = document.querySelector(".add-toy-form");
    toyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let newToyCard = {
        name:e.target.name.value,
        image:e.target.image.value,
        likes:0
      }
      
      toyForm.reset();
      fetch("http://localhost:3000/toys",{
      method: "POST",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newToyCard)
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
    

      const cardArea = document.querySelector("#toy-collection");
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
      <h2>${newToyCard.name}</h2>
      <img src = "${newToyCard.imageUrl}" class = "toy-avatar">
      <p>This toy has ${newToyCard.likes} likes</p>
      <button type = "button" class = "like-btn" id = "?">Like</button>
     `
      
      cardArea.appendChild(card);
  })

  //patch request
  function updateLikes(card, likes) {
    
    fetch(`http://localhost:3000/toys/${card.querySelector("button").id}`,{
      method: "PATCH",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": likes
      })
  })
}