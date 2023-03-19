// API eventos pasados
let table_id_past = document.getElementById("table_id_past")

let datos_past

let filtro_pasado

async function datos_api_past_stat() {
  let data = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then((response) => response.json())
    .then((data) => {
      datos_past = data.events.filter((pasado) => pasado.date < data.currentDate);

      let categorias = [...new Set(datos_past.map((event) => event.category))];
      let datos_por_categoria = {};

      datos_past.forEach((evento) => {
        if (!datos_por_categoria[evento.category]) {
          datos_por_categoria[evento.category] = {
            precio_total: 0,
            asistencia_total: 0,
            cantidad_eventos: 0,
          };
        }

        datos_por_categoria[evento.category].precio_total += evento.price;
        if (evento.assistance !== null && evento.estimate !== null) {
          datos_por_categoria[evento.category].asistencia_total += (evento.assistance + evento.estimate) / 2;
          datos_por_categoria[evento.category].cantidad_eventos++;
        }
      });

      let tabla = "";
      categorias.forEach((categoria) => {
        let datos_categoria = datos_por_categoria[categoria];
        let promedio_asistencia = datos_categoria.cantidad_eventos > 0 ? (datos_categoria.asistencia_total / datos_categoria.cantidad_eventos).toFixed(2) : 0;
        tabla += `
        <tr>
          <td>${categoria}</td>
          <td>${datos_categoria.precio_total.toFixed(2)}</td>
          <td>${promedio_asistencia * 100}%</td>
        </tr>`;
      });
      table_id_past.innerHTML = tabla;

      return categorias;
    });
}
datos_api_past_stat();








//API de eventos futuros
let table_id_upcoming = document.getElementById("table_id_upcoming")

let datos_upcoming

let filtro_futuro

async function datos_api_upcoming_stat() {
  let data = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then((response) => response.json())
    .then((data) => {
      datos_upcoming = data.events.filter((futuro) => futuro.date > data.currentDate);
      
      let categorias = [...new Set(datos_upcoming.map((event) => event.category))];
      let datos_por_categoria = {};

      datos_upcoming.forEach((evento) => {
        if (!datos_por_categoria[evento.category]) {
          datos_por_categoria[evento.category] = {
            precio_total: 0,
            asistencia_total: 0,
            cantidad_eventos: 0,
          };
        }

        datos_por_categoria[evento.category].precio_total += evento.price;
        if (evento.assistance !== null && evento.estimate !== null) {
          datos_por_categoria[evento.category].asistencia_total += (evento.assistance + evento.estimate) / 2;
          datos_por_categoria[evento.category].cantidad_eventos++;
        }
      });

      let tabla = "";
      categorias.forEach((categoria) => {
        let datos_categoria = datos_por_categoria[categoria];
        let promedio_asistencia = (datos_categoria.cantidad_eventos > 0) ? (datos_categoria.asistencia_total / datos_categoria.cantidad_eventos) : 0;
        tabla += `
          <tr>
            <td>${categoria}</td>
            <td>${datos_categoria.precio_total.toFixed(2)}</td>
            <td>${(promedio_asistencia * 100).toFixed(2)}%</td>
          </tr>`;
      });
      table_id_upcoming.innerHTML = tabla;

      return categorias;
    });
}
datos_api_upcoming_stat()








//API del index
let table_id = document.getElementById("table_id")

let datos_index

let filtro_index

async function datos_api_stat() {
  let data = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then((response) => response.json())
.then(data => {

datos_index = data.events

let filtro_index = [...new Set(datos_index.map(event => event.category))];
pintar_tabla(filtro_index)

  return filtro_index;
})
}

function obtener_evento_menor_asistencia(eventos) {
  let eventoMenorAsistencia = null;
  let porcentajeMenorAsistencia = Infinity;

  eventos.forEach((evento) => {
    let asistenciaMenor = evento.assistance ? evento.assistance : evento.estimate;
    let porcentajeAsistenciaMenor = asistenciaMenor / evento.capacity * 100;
    if (porcentajeAsistenciaMenor < porcentajeMenorAsistencia) {
      porcentajeMenorAsistencia = porcentajeAsistenciaMenor;
      eventoMenorAsistencia = evento;
    }
  });

  let nombreEventoMenor = eventoMenorAsistencia.name;
  let porcentajeMenor = porcentajeMenorAsistencia.toFixed(2) + '%';
  
  return {nombreEventoMenor, porcentajeMenor};
}

function obtener_evento_mayor_asistencia(eventos) {
  let eventoMayorAsistencia = eventos.reduce((prev, current) => {
    let asistencia = current.assistance ? current.assistance : current.estimate;
    let porcentajeAsistencia = asistencia / current.capacity * 100;
    let prevAsistencia = prev.assistance ? prev.assistance : prev.estimate;
    let prevPorcentaje = prevAsistencia / prev.capacity * 100;
    return porcentajeAsistencia > prevPorcentaje ? current : prev;
  });

  let nombreEvento = eventoMayorAsistencia.name;
  let asistencia = eventoMayorAsistencia.assistance ? eventoMayorAsistencia.assistance : eventoMayorAsistencia.estimate;
  let porcentaje = (asistencia / eventoMayorAsistencia.capacity * 100).toFixed(2) + '%';
  
  return {nombreEvento, porcentaje};
}

function obtener_evento_menor_asistencia(eventos) {
  let eventoMenorAsistencia = eventos.reduce((prev, current) => {
    let asistenciaMenor = current.assistance ? current.assistance : current.estimate;
    let porcentajeAsistenciaMenor = asistenciaMenor / current.capacity * 100;
    let prevAsistenciaMenor = prev.assistance ? prev.assistance : prev.estimate;
    let prevPorcentajeMenor = prevAsistenciaMenor / prev.capacity * 100;
    return porcentajeAsistenciaMenor < prevPorcentajeMenor ? current : prev;
  });

  let nombreEventoMenor = eventoMenorAsistencia.name;
  let asistenciaMenor = eventoMenorAsistencia.assistance ? eventoMenorAsistencia.assistance : eventoMenorAsistencia.estimate;
  let porcentajeMenor = (asistenciaMenor / eventoMenorAsistencia.capacity * 100).toFixed(2) + '%';
  
  return {nombreEventoMenor, porcentajeMenor};
}

function obtener_evento_mayor_capacidad(eventos) {
  let eventoMayorCapacidad = eventos.reduce((prev, current) => {
    return current.capacity > prev.capacity ? current : prev;
  });

  let nombreEventoMayorCapacidad = eventoMayorCapacidad.name;
  let capacidadMayor = eventoMayorCapacidad.capacity;
  
  return {nombreEventoMayorCapacidad, capacidadMayor};
}

function pintar_tabla(array) {
  let tabla = "";
  let eventos = datos_index.filter(event => array.includes(event.category));
  let mayorAsistencia = obtener_evento_mayor_asistencia(eventos);
  let menorAsistencia = obtener_evento_menor_asistencia(eventos);
  let mayorCapacidad = obtener_evento_mayor_capacidad(eventos);
  tabla += `
    <tr>
    <td>${mayorAsistencia.nombreEvento} ${mayorAsistencia.porcentaje}</td>
    <td>${menorAsistencia.nombreEventoMenor} ${menorAsistencia.porcentajeMenor}</td>
    <td>${mayorCapacidad.nombreEventoMayorCapacidad} ${mayorCapacidad.capacidadMayor}</td>
    </tr>`;
  table_id.innerHTML = tabla;
}

datos_api_stat();




















// .reduce  devuelve un valor sumado

//.sort ordena

//.map

/* let revenue = array.reduce((acc,item)=>{   
    return acc + item.revenues               
},0) 
 */


/* let revenue = array.reduce((acc,item)=>{                //
},0)
let lowestPercent =arrayPercent.sort((a,b)=>a.percent-b.percent)[0] */