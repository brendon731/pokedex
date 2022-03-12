import {useEffect, useState} from "react"
import Thumb from "./pokemon-card-photo.js"

import {Link, useNavigate} from "react-router-dom"
export default function EvolutionChain(props){
    const [pokemonChain, setPokemonChain] = useState([])
    const [curPokemon, setCurPokemon] = useState("")
    let navigate = useNavigate()
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
  
   useEffect(()=>{console.log("iniciou")},[])
  useEffect(()=>{console.log(pokemonChain, "pokemooooon")},[pokemonChain])

  return(<>
    <h4 style={{marginBottom:"20px"}}>Family</h4>

  {pokemonChain.length && 

    <ul style={{margin:"20px"}}>
    {pokemonChain.map(e=><>
    
      <li 
      onClick={()=>navigate(`/${e}`)}
      style={{
        maxWidth:"150px", 
        flexGrow:"1", 
        border:'3px solid red',
      height:"fit-content"}}
      >
          <Thumb name={e}>
          <span className="type">{e}</span>
          </Thumb>
      </li>

    </>)}
    </ul>
  
  }
  </>)

}