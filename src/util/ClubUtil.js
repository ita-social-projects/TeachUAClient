
export function  clubFeedback(value){
    var clubRate = 0;
    for (let i = 0; i < value.length; i++) {
        clubRate += value[i].rate;
    }
    return clubRate / value.length;
}
