import {useEffect, useState} from "react"
import Thumb from "../../cards/pokemon-card.js"
import {Link} from "react-router-dom"
import "./styles.css"
import {Cards} from "./evoChainCard/index"

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
    async function getPokemonInfo(id){
      let teste2 = await fetch("https://pokeapi.co/api/v2/pokemon/" + id)
      let json = await teste2.json()
      return {
        is_front:true,
      id:json.id,
      name:json.name,
      img:json.sprites.other.dream_world.front_default,
      photo:json.sprites.other["official-artwork"].front_default,
      types:json.types
    }
    }
  async function getPokemon(){
    let teste2 = await fetch(props.url)
    let teste3 = await teste2.json()
    return getEvolutionChain(teste3.chain)
  }
  function getFamilyInfo(chain){
    return new Promise((resolve, reject)=>{
      Promise.all(chain.map(e=>getPokemonInfo(getId(e.url))))
      .then(res=>resolve(res))
      .catch(err=>console.log("deu merda na chain"))
    })
  }
  useEffect(async()=>{
      let chain = await getPokemon()
      console.log(chain)
      let info = await getFamilyInfo(chain)
      setPokemonChain(info)
  },[props])

  function getId(url){
    let poke = url.split("/")
    let pokemonSelected = poke[poke.length - 2]
    return pokemonSelected
  }
  
  return(
    <div className="evolution-chain">

      <h2 style={{marginBottom:"7px"}}>Family</h2>

      {pokemonChain.length && 

        <div  className="evolution-chain-container">
          {pokemonChain.map(e=>
              <Cards 
              pokemon={e}
              // id={getId(e.url)}
              // name={e.name}
              key={"evolution-chain" + e.name}
              />
          
          )}
        </div>
    
    }
    </div>

  )

}