import "react"

export default function PokemonGender(pokemon){

    const [pokemon, setPokemon] = useState({})

    async function getPokemonSpecies(pokemon){
      let teste = await fetch("https://pokeapi.co/api/v2/pokemon-species" + pokemon)
      let teste2 = await teste.json()
      return teste2
  }
  useEffect(()=>{
      let teste = await getPokemonSpecies("charizard")

      setPokemon({
          gender:teste.gender
      })
  },[])
}