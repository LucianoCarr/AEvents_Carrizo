let categories_filter_past

let data_past

let id_category = document.getElementById("idcategory-past");
let id_filter_search = document.getElementById("id_bar");


id_filter_search.addEventListener('input',super_filter)

id_category.addEventListener('change',super_filter)


function super_filter(){
    let first_filter = search_filter(data_past, id_filter_search.value)
    let second_filter = category_filter(first_filter)
    new_cards (second_filter, "past_card")
}


async function datos_api_past() {
  let data = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then((response) => response.json())
.catch(err => 
  {return fetch('./public/data/amazing.json')
    .then((response) => response.json())}
  )
.then(data => 
   {return data})
data_past = data.events.filter((past) => past.date < data.currentDate);

categories_filter_past = Array.from([...new Set(data_past.map((event) => event.category))]);
new_cards(data_past, "past_card")

categories_filter_past.forEach((category_past) => {
  new_categories(category_past, "idcategory-past");
});

  return data.events;
}

datos_api_past()