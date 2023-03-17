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


function search_filter(array,value){
    let filter_array = array.filter(event => event.name.toLowerCase().includes(value.toLowerCase()))
    return filter_array
}


function category_filter(array) {
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    let array_checks = Array.from(checkboxes).filter(checkbox => checkbox.checked)
    let array_checks_checked = array_checks.map(checkbox => checkbox.value)

    let array_filter = array.filter(data => array_checks_checked.includes(data.category))

    if(array_checks_checked.length > 0){
        return array_filter
    }
    return array
}