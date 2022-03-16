import {useEffect, useState} from "react"
import Thumb from "./pokemon-card-photo.js"

import {Link, useNavigate} from "react-router-dom"
export default function EvolutionChain(props){
    const [pokemonChain, setPokemonChain] = useState([])
    const [curPokemon, setCurPokemon] = useState("")
    //console.log(props)
    let evoChain = []

    function getEvolutionChain(chain) {
      
      evoChain.push(chain.species.name);
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

  return(<>
    <h4 style={{marginBottom:"7px"}}>Family</h4>

  {pokemonChain.length && 

    <div  className="evolution-chain-container">
      {pokemonChain.map(e=><>
      <Link to={`/${e}`} className="each-card-chain" key={e+"evolution-chain"}>
        <Thumb name={e}>
        <h6 style={{margin:"3px auto 5px", width:"fit-content", textTransform:"capitalize"}}>{e}</h6>
        </Thumb>
    
      </Link>

      </>)}
    </div>
  
  }
  </>)

}