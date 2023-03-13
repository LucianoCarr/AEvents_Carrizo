function new_cards (info, idHTML) {
 document.getElementById(idHTML).innerHTML += `<div class="card">
    <img src="${info.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${info.name}</h5>
        <p class="card-text">${info.description}</p>
        <div class="card-button">
        <p>Price: $${info.price}</p>
            <a href="./details.html?id=${info._id}" class="btn btn-primary">See Details</a>
        </div>
    </div>
    </div>`
}

function new_categories (infocat, idcat) {
    document.getElementById(idcat).innerHTML += `<label class="category">${infocat}
    <input type="checkbox" id="inlineCheckbox" value="option">
</label>`
}


let querySearch = document.location.search  

let id = new URLSearchParams(querySearch).get("id")

//console.log(id);












/* let dia = data.events.filter (data.events => data.category)

function push(array, id) {
    document.getElementById(id) += <div>${elemento}</div>
    
}


addEventListener(`keyup`, (e) =>{
    console.log(e.target.value);
})
 */


//array data.events con la info 
//funcion de filtro en un nuevo array
//funcion que pinte el filtro en el DOM
//searchbar evento


