function new_cards (array, idHTML) {
  let js_card = ''
  for(info of array) {
    js_card += `<div class="card">
    <img src="${info.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${info.name}</h5>
        <p class="card-text">${info.description}</p>
        <div class="card-button">
        <p>Price:$${info.price}</p>
            <a href="./details.html" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
    </div>`
  }
  const home_card = document.getElementById(idHTML);
  home_card.innerHTML = js_card
}