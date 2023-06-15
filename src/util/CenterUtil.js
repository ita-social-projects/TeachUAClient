
export function centerFeedback(value){
    var clubRate = 0;
    for (let i = 0; i < value.length; i++) {
        clubRate += value[i].rating;
    }
    return clubRate / value.length;
}