function avgWordLengthCalc(sentence){
    try{
        if (!(sentence instanceof String)){
            throw 'NotStringError'
        }
        let amountOfWords = 0
        let lengthOfWords = 0
        sentence = sentence.replace(/[^A-Za-z0-9\s]/g,"").replace(/\s{2,}/g, " ")
        for (const word of sentence.split(" ")){
            amountOfWords++
            lengthOfWords += word.length
        }
        return (lengthOfWords/amountOfWords).toFixed(2)
    }
    catch (error) {
        console.log(error)
    }
}