let upcoming_data = data.events.filter (upcoming => upcoming.date >= data.currentDate)
                    //"upcoming" se son parametros que se pueden cambiar por cualquier nombre
upcoming_data.forEach(lluvia => {
    new_cards(lluvia, "upcoming_card")
  });

