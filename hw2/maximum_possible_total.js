function maxTotal(arr){
    try{
        if (!(arr instanceof Array)) throw "NotArrayError"
        let res = 0
        if (arr.length <= 5){
            throw "TooSmallArrayError"
        } else{
            arr.sort(function(a, b){return a - b})
            for (let i = arr.length-5; i <= arr.length-1; i++){
                res += arr[i]
            }
        }
        return res
    }
    catch (error){
        console.log(error)
    }
}