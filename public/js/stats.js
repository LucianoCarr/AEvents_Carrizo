// API eventos pasados
let table_id_past = document.getElementById("table_id_past");

async function datos_api_past_stat() {
  let data = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then((response) => response.json())
    .catch((err) => {
      return fetch("./public/data/amazing.json").then((response) =>
        response.json()
      );
    })
    .then((data) => {
      return data;
    });

  datos_past = data.events.filter((pasado) => pasado.date < data.currentDate);

  let categorias = Array.from([...new Set(datos_past.map((event) => event.category))]);

  let datos_por_categoria = categorias;
  datos_por_categoria = datos_por_categoria.map((categoria) => ({
    category: categoria,
    revenue: 0,
    asistencia_total: 0,
    cantidad_eventos: 0,
    capacidad: 0,
  }));

  datos_past.forEach((evento) => {
    datos_por_categoria[datos_por_categoria.findIndex((obj) => obj.category == evento.category)].revenue += evento.price * evento.assistance;

    datos_por_categoria[datos_por_categoria.findIndex((obj) => obj.category == evento.category)].asistencia_total += evento.assistance;

    datos_por_categoria[datos_por_categoria.findIndex((obj) => obj.category == evento.category)].capacidad += evento.capacity;

    datos_por_categoria[datos_por_categoria.findIndex((obj) => obj.category == evento.category)].cantidad_eventos++;
  });

  let tabla = "";
  datos_por_categoria.forEach((categoria) => {
    let percent = (categoria.asistencia_total * 100) / categoria.capacidad;
    tabla += `
          <tr>
            <td>${categoria.category}</td>
            <td>$${categoria.revenue}</td>
            <td>${percent.toFixed(2)}%</td>
          </tr>`;
  });
  table_id_past.innerHTML = tabla;

  return categorias;
}

datos_api_past_stat();






//API de eventos futuros
let table_id_upcoming = document.getElementById("table_id_upcoming");

async function datos_api_upcoming_stat() {
  let data = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then((response) => response.json())
    .catch((err) => {
      return fetch("./public/data/amazing.json").then((response) =>
        response.json()
      );
    })
    .then((data) => {
      return data;
    });

  datos_upcoming = data.events.filter((futuro) => futuro.date > data.currentDate);

  let categorias = Array.from([...new Set(datos_upcoming.map((event) => event.category))]);

  let datos_por_categoria = categorias;
  datos_por_categoria = datos_por_categoria.map((categoria) => ({
    category: categoria,
    revenue: 0,
    asistencia_total: 0,
    cantidad_eventos: 0,
    capacidad: 0,
  }));

  datos_upcoming.forEach((evento) => {
    datos_por_categoria[datos_por_categoria.findIndex((obj) => obj.category == evento.category)].revenue += evento.price * evento.estimate;

    datos_por_categoria[datos_por_categoria.findIndex((obj) => obj.category == evento.category)].asistencia_total += evento.estimate;

    datos_por_categoria[datos_por_categoria.findIndex((obj) => obj.category == evento.category)].capacidad += evento.capacity;

    datos_por_categoria[datos_por_categoria.findIndex((obj) => obj.category == evento.category)].cantidad_eventos++;
  });

  let tabla = "";
  datos_por_categoria.forEach((categoria) => {
    let percent = (categoria.asistencia_total * 100) / categoria.capacidad;
    tabla += `
          <tr>
            <td>${categoria.category}</td>
            <td>$${categoria.revenue}</td>
            <td>${percent.toFixed(2)}%</td>
          </tr>`;
  });
  table_id_upcoming.innerHTML = tabla;

  return categorias;
}

datos_api_upcoming_stat();






//API del index
let table_id = document.getElementById("table_id");

let datos_index;

let filtro_index;

async function datos_api_stat() {
  let data = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then((response) => response.json())
    .catch((err) => {
      return fetch("./public/data/amazing.json").then((response) =>
        response.json()
      );
    })
    .then((data) => {
      return data;
    });

  datos_index = data.events;

  let filtro_index = [...new Set(datos_index.map((event) => event.category))];
  pintar_tabla(filtro_index);

  return filtro_index;
}

function obtener_evento_mayor_asistencia(eventos) {
  let evento_mayor_asistencia = eventos.reduce((acumulador, objeto) => {
    let asistencia_mayor = objeto.assistance;
    let porcentaje_asistencia = (asistencia_mayor / objeto.capacity) * 100;
    let objeto_asistencia = acumulador.assistance;
    let objeto_porcentaje = (objeto_asistencia / acumulador.capacity) * 100;
    return porcentaje_asistencia > objeto_porcentaje ? objeto : acumulador;
  });

  let nombre_evento_mayor = evento_mayor_asistencia.name;
  let asistencia_mayor = evento_mayor_asistencia.assistance;
  let porcentaje_mayor = ((asistencia_mayor / evento_mayor_asistencia.capacity) * 100).toFixed(2) + "%";

  return { nombre_evento_mayor, porcentaje_mayor };
}

function obtener_evento_menor_asistencia(eventos) {
  let evento_menor_asistencia = eventos.reduce((acumulador, objeto) => {
    let asistencia_menor = objeto.assistance;
    let porcentaje_asistencia_menor = (asistencia_menor / objeto.capacity) * 100;
    let objeto_asistencia_menor = acumulador.assistance;
    let objeto_porcentaje_menor = (objeto_asistencia_menor / acumulador.capacity) * 100;
    return porcentaje_asistencia_menor < objeto_porcentaje_menor ? objeto : acumulador;
  });

  let nombre_evento_menor = evento_menor_asistencia.name;
  let asistencia_menor = evento_menor_asistencia.assistance;
  let porcentaje_menor = ((asistencia_menor / evento_menor_asistencia.capacity) * 100).toFixed(2) + "%";

  return { nombre_evento_menor, porcentaje_menor };
}

function obtener_evento_mayor_capacidad(eventos) {
  let evento_de_mayor_capacidad = eventos.sort((acumulador, objeto) => 
    objeto.capacity < acumulador.capacity ? -1 : 1)
    let evento_mayor_capacidad = evento_de_mayor_capacidad.find(capacidad => {
      return capacidad
    });

  let nombre_evento_mayor_capacidad = evento_mayor_capacidad.name;
  let mayor_capacidad = evento_mayor_capacidad.capacity;

  return { nombre_evento_mayor_capacidad, mayor_capacidad };
}

function pintar_tabla(array) {
  let tabla = "";
  let eventos = datos_index.filter((event) => array.includes(event.category));
  let mayor_asistencia = obtener_evento_mayor_asistencia(eventos);
  let menor_asistencia = obtener_evento_menor_asistencia(eventos);
  let mayor_capacidad = obtener_evento_mayor_capacidad(eventos);
  tabla += `
    <tr>
    <td>${mayor_asistencia.nombre_evento_mayor} (${mayor_asistencia.porcentaje_mayor})</td>
    <td>${menor_asistencia.nombre_evento_menor} (${menor_asistencia.porcentaje_menor})</td>
    <td>${mayor_capacidad.nombre_evento_mayor_capacidad} (${mayor_capacidad.mayor_capacidad})</td>
    </tr>`;
  table_id.innerHTML = tabla;
}

datos_api_stat();