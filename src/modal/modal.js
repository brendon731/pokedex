import {useState, useEffect} from "react"

import {Modal} from 'react-bootstrap'
import "./modal.css"
import EvolutionChain from "./evolutionChain/evolution-chain.js"
import PhotoAndName from "./photoAndName/photoAndName.js"
import Stats from "./stats/stats.js"
import AttackAndDefense from "./attackAndDefense/attackAndDefense.js"
import About from "./about/about.js"

import {useParams, useNavigate} from "react-router-dom"
function GetEnglishText(param){
    let text = param.filter(l=>l.language.name==="en").map(e=>e.flavor_text)
  return text[0]
}
async function getp(poke){
    let res = await fetch("https://pokeapi.co/api/v2/" + poke)
    let resJson = await res.json()

    return resJson
  }
export default function Example() {

  let navigate = useNavigate()
  let pokemonFromParam = useParams().pokemon.toLowerCase()

  const [pokemon, setPokemon] = useState(false)
  const [isPokemonFound, setIsPokemonFound] = useState(true)

  async function getPokemonInfo(poke){
    try{
    let pokemonFetched = await getp(`pokemon/${poke}`)
    let pokemonFromSpecies = await getp(`pokemon-species/${pokemonFetched.species.name}`)
    setPokemon({ 
      photo:pokemonFetched.sprites.other["official-artwork"].front_default,
      weight:pokemonFetched.weight / 10,
      height:pokemonFetched.height / 10,
      stats:pokemonFetched.stats,
      abilities:pokemonFetched.abilities,
      types:pokemonFetched.types,
      species:pokemonFetched.species.url,
      
      id:pokemonFromSpecies.id,
      name:pokemonFromSpecies.varieties.map(e=>e.pokemon.name),
      eggs:pokemonFromSpecies.egg_groups,
      habitat:pokemonFromSpecies.habitat === null?"undefined":pokemonFromSpecies.habitat.name,
      chain:pokemonFromSpecies.evolution_chain.url,
      color:pokemonFromSpecies.color.name,
      text:GetEnglishText(pokemonFromSpecies.flavor_text_entries)
    })
  
  }catch(error){
    setIsPokemonFound(false) 
  }
}

  useEffect(()=>{
    getPokemonInfo(pokemonFromParam)
    
  },[pokemonFromParam])
  
  return (
    <>
     {isPokemonFound?
      <Modal
        show={true}
        onHide={() => navigate("/")}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
          {pokemon &&
          <>
        
        <Modal.Body 
        style={{backgroundImage:`url(pokemonwall.png)`, backgroundSize:"cover", backgroundColor:"black"}}
        >
        <Modal.Header closeButton 
        style={{border:'none', padding:"5px 5px 5px 0"}}
        >
          
        </Modal.Header>
          <div className="modal__container">
            <PhotoAndName 
            name={pokemon.name}
            photo={pokemon.photo}
            changed={getPokemonInfo}/>

            <Stats stats={pokemon.stats}/>
            
            <AttackAndDefense types={pokemon.types}/>

            <About {...pokemon}/>

            <EvolutionChain url={pokemon.chain} />
          </div> 
        </Modal.Body>
        
            </>}
      </Modal >:
      <Modal
      show={true}
      onHide={() => navigate("/")}
      size="lg"
      aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton className="red" style={{border:"none"}}>
          <h3>Pokemon {`"${pokemonFromParam}"`} not found</h3>
        </Modal.Header>

        
      </Modal>
      }
    </>
  );
  }
 