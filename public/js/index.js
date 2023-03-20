let categories_filter

let data_index

let id_category = document.getElementById("idcategory");
let id_filter_search = document.getElementById("id_bar");


id_filter_search.addEventListener('input',super_filter)

id_category.addEventListener('change',super_filter)

function super_filter(){
  let first_filter = search_filter(data_index, id_filter_search.value)
  let second_filter = category_filter(first_filter)
  new_cards (second_filter, "home_card")
}

async function datos_api() {
  let data = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then((response) => response.json())
.catch(err => 
  {return fetch('./public/data/amazing.json')
    .then((response) => response.json())}
  )
.then(data => 
   {return data})


category_home = data.events.map((data) => data.category);
data_index = data.events

categories_filter = Array.from([...new Set(category_home)]);
new_cards(data_index, "home_card")

categories_filter.forEach((category) => {
  new_categories(category, "idcategory");
});


  return data;
}

datos_api()