let categories_filter_upcoming 

let data_upcoming

let id_category = document.getElementById("idcategory-upcoming");
let id_filter_search = document.getElementById("id_bar");


id_filter_search.addEventListener('input',super_filter)

id_category.addEventListener('change',super_filter)


function super_filter(){
  let first_filter = search_filter(data_upcoming, id_filter_search.value)
  let second_filter = category_filter(first_filter)
  new_cards (second_filter, "upcoming_card")
}


async function datos_api_upcoming() {
  let data = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then((response) => response.json())
.catch(err => 
  {return fetch('./public/data/amazing.json')
    .then((response) => response.json())}
  )
.then(data => 
   {return data})

  data_upcoming = data.events.filter((upcoming) => upcoming.date > data.currentDate)

categories_filter_upcoming = Array.from([...new Set(data_upcoming.map(event => event.category))]);
new_cards(data_upcoming, "upcoming_card");

categories_filter_upcoming.forEach((category_upcoming)=> {
  new_categories(category_upcoming, "idcategory-upcoming")
});

  return data.events;
}

datos_api_upcoming()