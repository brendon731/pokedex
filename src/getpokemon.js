


export default async function getPokemon(pokemon){
    let baseUrl = "https://pokeapi.co/api/v2/pokemon"
    let teste = fetch(`${baseUrl}/${pokemon}`)
    let teste2 = await teste.json()

    return teste2
    /*fetch(`${baseUrl}/${pokemon}`)
    .then(res=>{res.json()})
    .then(response=>response)
    .catch(error=>{console.log(error)})
    */

}