let categories_filter_upcoming 

let id_categoria = document.getElementById("idcategory-upcoming");
let filtro_barra_busqueda = document.getElementById("id_bar");


filtro_barra_busqueda.addEventListener('input',superFiltro)

id_categoria.addEventListener('change',superFiltro)


function superFiltro(){
    let primerFiltro = filtro_por_buscador(data.events, filtro_barra_busqueda.value)
    let segundoFiltro = filtro_por_categoria(primerFiltro)
    new_cards (segundoFiltro, "upcoming_card")
}


async function datos_api_upcoming() {
  let data = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then((response) => response.json())
.then(data => {
  data.events = data.events.filter((upcoming) => upcoming.date > data.currentDate)

categories_filter_upcoming = Array.from([...new Set(data.events.map(event => event.category))]);
new_cards(data.events, "upcoming_card");

categories_filter_upcoming.forEach((category_upcoming)=> {
  new_categories(category_upcoming, "idcategory-upcoming")
});

  return data.events;
})
console.log(data);
}

datos_api_upcoming()