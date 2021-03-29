function tuckIn(p1, p2) {
    let k = p1.length/2;
    k = k.toFixed(0);
    return p1.slice(0, k).concat(p2).concat(p1.slice(k))
}

function minMax(array) {
    let min = Infinity, max = -Infinity, i;
    for (i=0; i<array.length; i++) {
        if (array[i] < min){
            min = array[i];
        } 
        if (array[i] > max) {
            max = array[i];
        }
    }
    return [min, max];
}

function canNest(arr1, arr2) {
    let arr1MinMax = minMax(arr1);
    let arr2MinMax = minMax(arr2);
    return ((arr1MinMax[0] > arr2MinMax[0]) && (arr1MinMax[1] < arr2MinMax[1]));
}

var result1 = tuckIn([[1,2],[5,6]],[[3,4,7]]);
var result2 = minMax([0,6]);
var result3 = canNest([1,2,3,4],[0,6]);

