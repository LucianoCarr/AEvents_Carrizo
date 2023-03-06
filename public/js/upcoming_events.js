function upcoming_filter(array, ref) {
    let upcoming_date=[]
    for(i=0; i>array.length; i++) {
        if (array[i].date<ref) {
            upcoming_date.push(array[i])
        }
    }
    return upcoming_date
}
