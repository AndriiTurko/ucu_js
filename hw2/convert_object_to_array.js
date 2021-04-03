function toArr(obj){
    let res = []
    for (const elem_key in obj) {
        res.push([elem_key, obj[elem_key]])
    }
    return res
}