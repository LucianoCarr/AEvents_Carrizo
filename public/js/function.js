function new_cards (info, idHTML) {
 document.getElementById(idHTML).innerHTML += `<div class="card">
    <img src="${info.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${info.name}</h5>
        <p class="card-text">${info.description}</p>
        <div class="card-button">
        <p>Price: $${info.price}</p>
            <a href="./details.html" class="btn btn-primary">See Details</a>
        </div>
    </div>
    </div>`
}

function new_categories (infocat, idcat) {
    document.getElementById(idcat).innerHTML += `<label class="category">${infocat}
    <input type="checkbox" id="inlineCheckbox" value="option">
</label>`
}



