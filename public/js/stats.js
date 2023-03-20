// API eventos pasados
let table_id_past = document.getElementById("table_id_past");

async function datos_api_past_stat() {
  let data = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then((response) => response.json())
    .catch(err => 
      {return fetch('./public/data/amazing.json')
        .then((response) => response.json())}
      )
    .then(data => 
       {return data})

       datos_past = data.events.filter((pasado) => pasado.date < data.currentDate);
       
      let categorias = Array.from([...new Set(datos_past.map((event) => event.category))]);

      let datos_por_categoria = categorias;
      datos_por_categoria = datos_por_categoria.map(categoria =>({
        "category": categoria,
        "revenue": 0,
        "asistencia_total":0,
        "cantidad_eventos":0,
        "capacidad":0
      }));

      datos_past.forEach(evento =>  {
        
        datos_por_categoria[datos_por_categoria.findIndex(obj => obj.category == evento.category)].revenue += ( evento.price * (evento.assistance ? evento.assistance : evento.estimate));
        
        datos_por_categoria[datos_por_categoria.findIndex(obj => obj.category == evento.category)].asistencia_total += (evento.assistance ? evento.assistance : evento.estimate);

        datos_por_categoria[datos_por_categoria.findIndex(obj => obj.category == evento.category)].capacidad += (evento.capacity);
      
        datos_por_categoria[datos_por_categoria.findIndex(obj => obj.category == evento.category)].cantidad_eventos++;
      });

      let tabla = "";
      datos_por_categoria.forEach((categoria) => {
        let percent = (categoria.asistencia_total*100/categoria.capacidad)
        tabla += `
          <tr>
            <td>${categoria.category}</td>
            <td>$ ${categoria.revenue.toFixed(2)}</td>
            <td>${(percent).toFixed(2)}%</td>
          </tr>`;
      });
      table_id_past.innerHTML = tabla;

      return categorias;
}

datos_api_past_stat()










//API de eventos futuros
let table_id_upcoming = document.getElementById("table_id_upcoming")

async function datos_api_upcoming_stat() {
  let data = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json())
  .catch(err => 
    {return fetch('./public/data/amazing.json')
      .then((response) => response.json())}
    )
  .then(data => 
     {return data})

      datos_upcoming = data.events.filter((futuro) => futuro.date > data.currentDate);
      
      let categorias = Array.from([...new Set(datos_upcoming.map((event) => event.category))]);
    
      let datos_por_categoria = categorias;
      datos_por_categoria = datos_por_categoria.map(categoria =>({
        "category": categoria,
        "revenue": 0,
        "asistencia_total":0,
        "cantidad_eventos":0,
        "capacidad":0
        
      }));

      datos_upcoming.forEach(evento =>  {
        
        datos_por_categoria[datos_por_categoria.findIndex(obj => obj.category == evento.category)].revenue += ( evento.price * (evento.assistance ? evento.assistance : evento.estimate));
        
        datos_por_categoria[datos_por_categoria.findIndex(obj => obj.category == evento.category)].asistencia_total += (evento.assistance ? evento.assistance : evento.estimate);

        datos_por_categoria[datos_por_categoria.findIndex(obj => obj.category == evento.category)].capacidad += (evento.capacity);
      
        datos_por_categoria[datos_por_categoria.findIndex(obj => obj.category == evento.category)].cantidad_eventos++;
      });

      let tabla = "";
      datos_por_categoria.forEach((categoria) => {
        let percent = (categoria.asistencia_total*100/categoria.capacidad)
        tabla += `
          <tr>
            <td>${categoria.category}</td>
            <td>$ ${categoria.revenue.toFixed(2)}</td>
            <td>${(percent).toFixed(2)}%</td>
          </tr>`;
      });
      table_id_upcoming.innerHTML = tabla;

      return categorias;
    }

datos_api_upcoming_stat()








//API del index
let table_id = document.getElementById("table_id")

let datos_index

let filtro_index

async function datos_api_stat() {
  let data = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json())
  .catch(err => 
    {return fetch('./public/data/amazing.json')
      .then((response) => response.json())}
    )
  .then(data => 
     {return data})


datos_index = data.events

let filtro_index = [...new Set(datos_index.map(event => event.category))];
pintar_tabla(filtro_index)

  return filtro_index;
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
    <td>${mayorAsistencia.nombreEvento} (${mayorAsistencia.porcentaje})</td>
    <td>${menorAsistencia.nombreEventoMenor} (${menorAsistencia.porcentajeMenor})</td>
    <td>${mayorCapacidad.nombreEventoMayorCapacidad} (${mayorCapacidad.capacidadMayor})</td>
    </tr>`;
  table_id.innerHTML = tabla;
}

datos_api_stat();

