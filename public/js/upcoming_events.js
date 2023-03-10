let upcoming_data = data.events.filter (upcoming => upcoming.date >= data.currentDate)
                    //"upcoming" son parametros que se pueden cambiar por cualquier nombre
upcoming_data.forEach(upcomingData => {
    new_cards(upcomingData, "upcoming_card")
  });

  let categories_filter_upcoming = [...new Set(upcoming_data.map(event => event.category))];

  categories_filter_upcoming.forEach( category_upcoming=> {
    new_categories(category_upcoming, "idcategory-upcoming")
  })