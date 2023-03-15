function new_cards(array, idHTML) {
    if(array.length == 0){
        document.getElementById(idHTML).innerHTML = `<h5 class="not-found">Search Not Found</h5>`
        return
    }
document.getElementById(idHTML).innerHTML = ``;
array.forEach((info) => {
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
        </div>`;
});
}

function new_categories(infocat, idcat) {
document.getElementById(idcat).innerHTML += `<label class="category">${infocat}
    <input type="checkbox" id="inlineCheckbox" value="${infocat}">
</label>`;
};


function filtro_por_buscador(array, value) {
return array.filter((event) => event.name.toLowerCase().includes(value));
}

function filtro_por_categoria(data, arrayCategoriesFilter) {
return data.filter(
    (event) => arrayCategoriesFilter.indexOf(event.category) != -1
);
}

function filtro_checkbox(e, array, control) {
if (array == control) {
    array = [];
}
if (e.target.checked) {
    array.push(e.target.value);
} else {
    array.splice(array.indexOf(e.target.value), 1);
    if (array[0] == undefined) {
    array = control;
    }
}
return array;
}
