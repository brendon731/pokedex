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
    <h4 style={{marginBottom:"15px"}}>Family</h4>

  {pokemonChain.length && 

    <ul style={{margin:"10px"}}
      className="chain-list"
    >
    {pokemonChain.map(e=><>
    <Link to={`/${e}`}>
      <li 
      className="each-card-chain"
      style={{
        maxWidth:"175px", 
        flexGrow:"1", 
        boxSizing:"border-box"}}
        >
          <Thumb name={e}>
          <h6 style={{margin:"5px auto", width:"fit-content", textTransform:"capitalize"}}>{e}</h6>
          </Thumb>
      </li>
        </Link>

    </>)}
    </ul>
  
  }
  </>)

}