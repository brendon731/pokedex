import {useState, useEffect, useCallback} from "react"

import {Modal, Button, ProgressBar} from 'react-bootstrap'
import "./App.css"
import "./pokemon-colors.css"
import EvolutionChain from "./evolution-chain.js"
import {getMultipliers} from "./teste.js"
import {useLocation, useParams, useNavigate} from "react-router-dom"

export default function Example(props) {
  let navigate = useNavigate()
  console.log(useParams().pokemon)
  let pokemonFromParam = useParams().pokemon
  const [selectedPokemon, setSelectedPokemon] = useState(useParams().pokemon)
  //const [isContentLoaded, setIsContentLoaded] = useState(false)
  const [attack_and_defense, setAttack_and_defense] = useState(false)
  const [pokemon, setPokemon] = useState(false)
  console.log(selectedPokemon, "Selected")
  async function getp(poke){
      let teste = await fetch("https://pokeapi.co/api/v2/" + poke)
      let teste2 = await teste.json()

      return teste2
    }
  function GetEnglishText(param){
      let text = param.filter(l=>l.language.name==="en").map(e=>e.flavor_text)
    return text[0]
  }
  /*
  function getTypes(types){
    

    let {attack, defense} = getMultipliers(["grass"])
    let keys_attack = Object.entries(attack)
    let keys_defense = Object.entries(defense)

    setAttack_and_defense({
      attack:keys_attack,
      defense:keys_defense
    })
  }*/
  function getPokemonInfo(poke){
    getp(`pokemon/${poke}`)
    .then(teste=>{
      getp(`pokemon-species/${teste.species.name}`).
        then(teste2=>{
          setPokemon({ 
            name:teste2.varieties.map(e=>e.pokemon.name),
            photo:teste.sprites.other["official-artwork"].front_default,
            weight:teste.weight / 10,
            height:teste.height / 10,
            stats:teste.stats,
            abilities:teste.abilities,
            types:teste.types,
            species:teste.species.url,

            eggs:teste2.egg_groups,
            habitat:teste2.habitat.name,
            chain:teste2.evolution_chain.url,
            color:teste2.color.name,
            text:GetEnglishText(teste2.flavor_text_entries)
          })
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
        .catch(error=>{console.log(error, "deu error na f de dentro")})
    })
    .catch(err=>{console.log(err, "deu error-------")})
  }
  
  useEffect(()=>{
    getPokemonInfo(pokemonFromParam)
    //console.log(selectedPokemon, "SELECTED")
    
  },[pokemonFromParam])

  useEffect(()=>{
    console.log(attack_and_defense, "=-=-=-=-")
  },[attack_and_defense])
  

  function getStats(stat){
    return `${((stat / 200) * 100).toFixed(2)}`
  }
  
  const [radioSelect, setRadioSelect] = useState("attack")
  return (
    <>
     
      <Modal
        show={true}
        onHide={() => navigate("/")}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
          {pokemon && 
          <>
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {pokemon.name.length === 1?
              pokemon.name[0]:

              <select onChange={(evt)=>{getPokemonInfo(evt.target.value)}}>
                {pokemon.name.map(e=><>
                  <option>{e}</option>
                </>)}
              </select>
              }
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body 
        className={pokemon.color}
        >
          <div className="container">

          <div >
            <img 
            src={pokemon.photo} 
            style={{width:"100%", 
            maxWidth:"250px",
            margin:'auto', 
            color: "lighten(100%)"
            }}/>
          </div>
          <div className="body">

          <div className="about" style={{border:"1px solid black"}}>
            <p style={{fontWeight:"normal"}}>{pokemon.text}</p>
            <p>Weight: <span>{pokemon.weight}kg</span></p>
            <p>Height: <span>{pokemon.height}m</span></p>
            <p>Habitat: <span>{pokemon.habitat}</span></p>
            <div className="abilities">
              <p >Abilities:</p>
              <ul>
                {pokemon.abilities.map(e=>
                  <li>{e.ability.name}</li>
                )}
              </ul>
            </div>
            <div className="eggs">
              <p>Egg groups:</p>
              <ul>
                {pokemon.eggs.map(e=><li>{e.name}</li>)}
              </ul>
            </div>
            <div className="types">
              <p>Type:</p>
              <ul>
                {pokemon.types.map(type=><>
                  <li>{type.type.name}</li>
                </>)}
              </ul>
            </div>
          </div>
          <div class="multiplier">
            <input type="radio"
            name="mesmo"
            onChange={(evt=>{setRadioSelect("attack")})} 
            checked={radioSelect === "attack"}
            />
            <input 
            type="radio"
            name="mesmo"
            onChange={(evt=>{setRadioSelect("defense")})} 
            checked={radioSelect === "defense"}
            />
            <div>

            
              <div hidden={radioSelect === "defense"}>
                {attack_and_defense.attack && 
                attack_and_defense.attack.map(e=>
                <>
                <div>

                  <span>{e[0]}</span>
                  {e[1].map(type=>
                  <span className={`type ${type}`}>{type}</span>
                  )}
                  </div>
                  
                  </>
                )}
              </div>
              <div hidden={radioSelect === "attack"}>
                {attack_and_defense && 
                attack_and_defense.defense.map(e=>
                <>
                <div>

                  <span>{e[0]}</span>
                  {e[1].map(type=>
                  <span className={`type ${type}`}>{type}</span>
                  )}
                  </div>
                  
                  </>
                )}
              </div>
            </div>

          </div>
          <div className="stats">
            <ul >
              {pokemon.stats.map(e=><>
              <li>
                <span style={{width:"120px"}}>{e.stat.name}</span>
                  <ProgressBar 
                  style={{ maxWidth:"350px", flexGrow:"1", alignSelf:"center"}}
                  striped 
                  animated
                  variant="success" 
                  now={getStats(e.base_stat)}
                  label={e.base_stat}
                  />
              </li>

              </>)}
            </ul>
          </div>
          
          <div className="evolution-chain">
            <EvolutionChain url={pokemon.chain} />
          </div>
        </div>
      </div>
          
        </Modal.Body>
            </>}
      </Modal>
    </>
  );
  }
 