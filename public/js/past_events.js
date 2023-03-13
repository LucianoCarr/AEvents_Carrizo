let past_data = data.events.filter (past => past.date < data.currentDate)
                            //"past" son parametros que se pueden cambiar por cualquier nombre
past_data.forEach(pastData => {
    new_cards(pastData, "past_card")
  });


  
  let categories_filter_past = [...new Set(past_data.map(event => event.category))];

  categories_filter_past.forEach( category_past=> {     //"category_past" lo mismo
    new_categories(category_past, "idcategory-past")
  })