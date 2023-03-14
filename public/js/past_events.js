let datos = data.events.filter((past) => past.date < data.currentDate);

let categories_filter_past = Array.from([...new Set(datos.map((event) => event.category)),]);

categories_filter_past.forEach((category_past) => {
  new_categories(category_past, "idcategory-past");
});

let id_categoria = document.getElementById("idcategory-past");
let filtro_barra_busqueda = document.getElementById("id_bar");
let categories_filtro = categories_filter_past;
let filtro_categoria = datos;
let filtro_buscador = datos;
let filtro_index = [];
let filtro_eventos = [];
let buscador_value = "";

new_cards(datos, "past_card");

id_categoria.addEventListener("change", (e) => {
  filtro_index = filtro_checkbox(e, filtro_index, categories_filtro);

  if (filtro_buscador != datos) {
    filtro_categoria = filtro_por_categoria(filtro_buscador, filtro_index);
    filtro_eventos = filtro_por_buscador(filtro_categoria, buscador_value);
    new_cards(filtro_eventos, "past_card");
  } else {
    filtro_categoria = filtro_por_categoria(datos, filtro_index);
    new_cards(filtro_categoria, "past_card");
  }
});

filtro_barra_busqueda.addEventListener("input", (e) => {
  buscador_value = e.target.value.toLowerCase();

  if (filtro_categoria != datos) {
    filtro_buscador = filtro_por_buscador(datos, buscador_value);
    filtro_eventos = filtro_por_categoria(filtro_buscador, filtro_index);
    new_cards(filtro_eventos, "past_card");
  } else {
    filtro_buscador = filtro_por_buscador(datos, buscador_value);
    new_cards(filtro_buscador, "past_card");
  }
});
