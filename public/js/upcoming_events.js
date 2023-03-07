function upcoming_filter(array, date_reference) {
    let upcoming_date=[]
    for(i=0; i<array.length; i++) {
        if (array[i].date> date_reference) {
            upcoming_date.push(array[i])
        }
    }
    return upcoming_date
}


let upcoming_data = upcoming_filter(data.events, data.currentDate)


new_cards (upcoming_data, "upcoming_card")
