import {useEffect, useState} from "react"
import Thumb from "./pokemon-card-photo.js"
import {Link} from "react-router-dom"

export default function EvolutionChain(props){
    const [pokemonChain, setPokemonChain] = useState([])
    //const [curPokemon, setCurPokemon] = useState("")
    //console.log(props)
    let evoChain = []

    function getEvolutionChain(chain) {
      
      evoChain.push({name:chain.species.name, url:chain.species.url});
      chain["evolves_to"].forEach(e => {
        getEvolutionChain(e);
      });
      return evoChain;
    }

    async function getPokemon(){
      let teste2 = await fetch(props.url)
      let teste3 = await teste2.json()
      return getEvolutionChain(teste3.chain)
  }

  useEffect(async()=>{
      let chain = await getPokemon()
      setPokemonChain(chain)
  },[])

  function getId(url){
    let poke = url.split("/")
    let pokemonSelected = poke[poke.length - 2]
    return pokemonSelected
  }

  return(<>
    <h4 style={{marginBottom:"7px"}}>Family</h4>

  {pokemonChain.length && 

    <div  className="evolution-chain-container">
      {pokemonChain.map(e=>
          <Thumb id={getId(e.url)}>
          <h6 style={{margin:"3px auto 5px", width:"fit-content", textTransform:"capitalize"}}>{e.name}</h6>
          </Thumb>
      
      )}
    </div>
  
  }
  </>)

}