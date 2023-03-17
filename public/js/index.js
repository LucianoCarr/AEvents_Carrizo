let category_home = data.events.map((data) => data.category);

let categories_filter = Array.from([...new Set(category_home)]);

categories_filter.forEach((category) => {
  new_categories(category, "idcategory");
});

let datos = data.events;
let id_categoria = document.getElementById("idcategory");
let filtro_barra_busqueda = document.getElementById("id_bar");

new_cards(datos, "home_card");


filtro_barra_busqueda.addEventListener('input',superFiltro)

id_categoria.addEventListener('change',superFiltro)

function superFiltro(){
    let primerFiltro = filtro_por_buscador(datos, filtro_barra_busqueda.value)
    let segundoFiltro = filtro_por_categoria(primerFiltro)
    new_cards (segundoFiltro, "home_card")
}

async function datos_api() {
  let data = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then((response) => response.json())
.then(data => {

new_cards(data.events, "home_card")
  return data;
})
//console.log(data);
}

datos_api()