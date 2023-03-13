let noche = data.events.filter( data => data.name ) 
//console.log(noche)

let dia = noche.map( data => { 
    let aux = {}
    aux.image = data.image
    aux.name = data.name
    aux.date = data.date
    aux.description = data.description
    aux.category = data.category
    aux.place = data.place
    aux.capacity = data.capacity
    aux.assistance = data.assistance
    aux.price = data.price
    aux._id = data._id
    return aux
})
//console.log(dia);


let soleado = dia.find(data => data._id === id) 
console.log(soleado);

let sol = document.getElementById("detail_card") 
//console.log(sol)


sol.innerHTML = `<div class="card">
<img src="${data.image}" class="card-img-top" alt="...">
<div class="card-body">
    <p>Name: ${data.name}</p>
    <p>Date: ${data.date}</p>
    <p>Description: ${data.description}</p>
    <p>Category: ${data.category}</p>
    <p>Place: ${data.place}</p>
    <p>Capacity: ${data.capaacity}</p>
    <p>Assistence: ${data.assistence}</p>
    <p>Price: $${data.price}</p>
    </div>
</div>`