let categories_filter_past

let id_categoria = document.getElementById("idcategory-past");
let filtro_barra_busqueda = document.getElementById("id_bar");


filtro_barra_busqueda.addEventListener('input',super_filter)

id_categoria.addEventListener('change',super_filter)


function super_filter(){
    let first_filter = filtro_por_buscador(data.events, filtro_barra_busqueda.value)
    let second_filter = filtro_por_categoria(first_filter)
    new_cards (second_filter, "past_card")
}


async function datos_api_past() {
  let data = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then((response) => response.json())
.then(data => {
data.events = data.events.filter((past) => past.date < data.currentDate);

categories_filter_past = Array.from([...new Set(data.events.map((event) => event.category))]);
new_cards(data.events, "past_card")

categories_filter_past.forEach((category_past) => {
  new_categories(category_past, "idcategory-past");
});

  return data.events;
})
//console.log(data);
}

datos_api_past()