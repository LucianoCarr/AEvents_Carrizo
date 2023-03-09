let past_data = data.events.filter (past => past.date < data.currentDate)
                            //"past" se son parametros que se pueden cambiar por cualquier nombre
past_data.forEach(lluvia => {
    new_cards(lluvia, "past_card")
  });

