import {useEffect, useState} from "react"
import Thumb from "../../cards/pokemon-card.js"
import {Link} from "react-router-dom"
import "./styles.css"
export default function EvolutionChain(props){
    const [pokemonChain, setPokemonChain] = useState([])
    
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

  return(
    <div className="evolution-chain">

      <h4 style={{marginBottom:"7px"}}>Family</h4>

      {pokemonChain.length && 

        <div  className="evolution-chain-container">
          {pokemonChain.map(e=>
              <Thumb id={getId(e.url)} key={"evolution-chain" + e.url} name={e.name}>
              
              </Thumb>
          
          )}
        </div>
    
    }
    </div>

  )

}