import {useEffect, useState} from "react"
import Thumb from "./pokemon-card-photo.js"

import {Link, useNavigate} from "react-router-dom"
export default function EvolutionChain(props){
    const [pokemonChain, setPokemonChain] = useState([])
    const [curPokemon, setCurPokemon] = useState("")
    let navigate = useNavigate()
    //console.log(props)
    async function getPokemon(){
      //let teste = await fetch(props.url)
      //let teste1 = await teste.json()
      //console.log("-----", teste1)
      let teste2 = await fetch(props.url)
      let teste3 = await teste2.json()
      return teste3
  }

  useEffect(async()=>{
      let teste = await getPokemon()
      let first = teste.chain.species.name
      let second = 
      teste.chain.evolves_to.length?
      teste.chain.evolves_to[0].species.name:
      undefined
      let third = 
      teste.chain.evolves_to[0].evolves_to.length?
      teste.chain.evolves_to[0].evolves_to[0].species.name:
      undefined
      //console.log(first, second, third, '========')
      setPokemonChain([first, second, third])
  },[])
  
   useEffect(()=>{console.log("iniciou")},[])
  useEffect(()=>{console.log(pokemonChain, "pokemooooon")},[pokemonChain])

  return(<>
  {pokemonChain.length && 
  
    <ul>
    {pokemonChain.map(e=><>
    
      <li 
      onClick={()=>navigate(`/${e}`)}
      >

        <div>
          <Thumb name={e}>
          <span className="type">{e}</span>
          </Thumb>
        </div>
      </li>

    </>)}
    </ul>
  
  }
  </>)

}