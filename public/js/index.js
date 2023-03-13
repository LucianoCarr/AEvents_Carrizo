data.events.forEach(home => {          
    new_cards(home, "home_card")
  });

  //"...new set" es un filtro que viene con valores predeterminados

  let category_home = data.events.map(data => data.category)
  
  let categories_filter = [...new Set(category_home)];  

  categories_filter.forEach( category=> {
  new_categories(category, "idcategory")
})



