function maxTotal(arr){
    let res = 0
    if (arr.length <= 5){
        for (const numb of arr){
            res += numb
        }
    } else{
        arr.sort(function(a, b){return a - b})
        for (let i = arr.length-5; i <= arr.length-1; i++){
            res += arr[i]
        }
    }
    return res
}