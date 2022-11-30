let getUniqueRandoms = (array, qty)=>{
    let shuffeled = array.map((value)=>({value, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .slice(0,qty)
    return shuffeled
}
export default getUniqueRandoms;