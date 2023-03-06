function past_filter(array, ref) {
    let past_date=[]
    for(i =0; i< array.length; i++) {
        if (array[i].date< ref) {
            past_date.push(array[i])
        }
    }
    return past_date
}