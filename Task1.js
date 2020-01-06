function partCalculator(arr){
    const sum = arr.reduce((acc,el)=>{
        console.log(1, el, parseFloat(el))
        return acc+parseFloat(el)
    },0)

    return arr.map(el=>{
        console.log(2, el, (parseFloat(el)*100/sum))
        return Math.round((parseFloat(el)*100/sum)*1000)/1000

    })
}