import {useState, useEffect} from "react"

import {Modal} from 'react-bootstrap'
import ".././App.css"
import ".././pokemon-colors.css"
import EvolutionChain from "./evolutionChain/evolution-chain.js"
import {getMultipliers} from "../teste.js"
import PhotoAndName from "./photoAndName/photoAndName.js"
import Stats from "./stats/stats.js"
import AttackAndDefense from "./attackAndDefense/attackAndDefense.js"
import About from "./about/about.js"

import {useParams, useNavigate} from "react-router-dom"
export default function Example(props) {
  let navigate = useNavigate()
  let pokemonFromParam = useParams().pokemon.toLowerCase()
  const [attack_and_defense, setAttack_and_defense] = useState(false)
  const [pokemon, setPokemon] = useState(false)
  const [isPokemonFound, setIsPokemonFound] = useState(true)

  async function getp(poke){
      let teste = await fetch("https://pokeapi.co/api/v2/" + poke)
      let teste2 = await teste.json()

      return teste2
    }
  function GetEnglishText(param){
      let text = param.filter(l=>l.language.name==="en").map(e=>e.flavor_text)
    return text[0]
  }
  
  function getPokemonInfo(poke){
    getp(`pokemon/${poke}`)
    .then(teste=>{
      getp(`pokemon-species/${teste.species.name}`).
        then(teste2=>{
          console.log(teste2)
          setPokemon({ 
            id:teste2.id,
            photo:teste.sprites.other["official-artwork"].front_default,
            weight:teste.weight / 10,
            height:teste.height / 10,
            stats:teste.stats,
            abilities:teste.abilities,
            types:teste.types,
            species:teste.species.url,
            
            name:teste2.varieties.map(e=>e.pokemon.name),
            eggs:teste2.egg_groups,
            habitat:teste2.habitat === null?"undefined":teste2.habitat.name,
            chain:teste2.evolution_chain.url,
            color:teste2.color.name,
            text:GetEnglishText(teste2.flavor_text_entries)
          })
            setIsPokemonFound(true)
        }).
        then(res=>{
          let types = teste.types.map(e=>e.type.name)
          let {attack, defense} = getMultipliers(types)
          let keys_attack = Object.entries(attack)
          let keys_defense = Object.entries(defense)
          console.log(keys_attack, keys_defense)
          setAttack_and_defense({
            attack:keys_attack.sort(),
            defense:keys_defense.sort()
          })
        })
      
      .catch(error=>{
        setIsPokemonFound(false) 
        console.log(error, "deu error na f de dentro") })
    })
    .catch(err=>{
      setIsPokemonFound(false) 
    })
  }
  
  useEffect(()=>{
    getPokemonInfo(pokemonFromParam)
    
  },[pokemonFromParam])

  useEffect(()=>{
    console.log(isPokemonFound, "=-=-=-=-")
  },[isPokemonFound])
  

  
  
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

          <div className="container">
            <PhotoAndName 
            name={pokemon.name}
            photo={pokemon.photo}
            changed={getPokemonInfo}/>

            <Stats stats={pokemon.stats}/>
            
            <AttackAndDefense {...attack_and_defense}/>
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
 