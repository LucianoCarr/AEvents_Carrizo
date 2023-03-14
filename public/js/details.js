let details = data.events.filter( data => data.name ) 
//console.log(details)

let details_aux = details.map( data => { 
    let aux = {}
    aux.image = data.image
    aux.name = data.name
    aux.date = data.date
    aux.description = data.description
    aux.category = data.category
    aux.place = data.place
    aux.capacity = data.capacity
    aux.assistance = data.assistance
    aux.estimate = data.estimate
    aux.price = data.price
    aux._id = data._id
    return aux
})
//console.log(details_aux);


let querySearch = document.location.search  

let id = new URLSearchParams(querySearch).get("id")


let details_id = details_aux.find(data => data._id == id) 
//console.log(details_id);

let detail_card = document.getElementById("detail_card") 
//console.log(detail_card)


detail_card.innerHTML = `<img src="${details_id.image}" class="details-card-body" alt="...">
<div class="card-body">
    <p>Name: ${details_id.name}</p>
    <p>Date: ${details_id.date}</p>
    <p>Category: ${details_id.category}</p>
    <p>Place: ${details_id.place}</p>
    <p>Capacity: ${details_id.capacity}</p>
    <p>${details_id.assistance?"Assistance: ": "Estimate: " }${details_id.assistance?details_id.assistance:details_id.estimate}</p>
    <p>Price: $${details_id.price}</p>
</div>`