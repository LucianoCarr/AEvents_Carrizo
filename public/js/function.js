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


//add. events viene aca


/* let dia = data.events.filter (noche => noche.category === ???) */

//despues se llama por id o por value

//los checkbox le pasa como a tarjetas y vuelan (solo queda un div)

//la barra tambien es un filter con event y se combina solo con checkbox


//detalles se hace con eventos creo