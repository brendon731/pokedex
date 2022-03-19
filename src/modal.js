import {useState, useEffect} from "react"

import {Modal, ProgressBar} from 'react-bootstrap'
import "./App.css"
import "./pokemon-colors.css"
import EvolutionChain from "./evolution-chain.js"
import {getMultipliers} from "./teste.js"
import {useParams, useNavigate} from "react-router-dom"
export default function Example(props) {
  let navigate = useNavigate()
  console.log(useParams().pokemon)
  let pokemonFromParam = useParams().pokemon.toLowerCase()
  //const [selectedPokemon, setSelectedPokemon] = useState(useParams().pokemon)
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
        .catch(error=>{console.log(error, "deu error na f de dentro")})
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
  

  function getStats(stat){
    return `${((stat / 200) * 100).toFixed(2)}`
  }
  
  const [radioSelect, setRadioSelect] = useState("attack")
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
        <Modal.Header closeButton 
        className={pokemon.color} 
        style={{border:'none', padding:"15px 15px 0"}}>
          
        </Modal.Header>
        
        <Modal.Body 
        className={pokemon.color}
        >

          <div className="container">

            <div className="img">
              {pokemon.name.length === 1?
              <h2 
              style={{
              margin:"auto",
              width:"fit-content",
              WebkitTextStroke:"2px rgb(0, 0, 194)", 
              fontWeight:"900",
              color:`rgb(211, 211, 0)`,
              textTransform:"uppercase",
              letterSpacing:"1px"
            }}
              
              >{pokemon.name[0]}</h2>:
              <select

              style={{backgroundColor:"black", 
              margin:"auto",
              display:"block",
              fontSize:"18px",
              textTransform:"capitalize",
              color:"rgb(185, 185, 185)"}}
               onChange={(evt)=>{getPokemonInfo(evt.target.value)}}>
                {pokemon.name.map(e=>
                  <option style={{textAlign:"center"}} key={e + "pokemon-variante"}>{e}</option>
                )}
              </select>
              }
              <img 
              alt={pokemon.name}
              src={pokemon.photo}
              style={{maxWidth:"250px", margin:"auto",  display:"block"}}
              />
            </div>
            <div className="stats">
              <h4>Stats</h4>

              <ul >
                {pokemon.stats.map(e=>
                <li key={e.stat.name + pokemon.name + "stat"}>
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

                )}
              </ul>
            </div>
            
            <div className="multiplier">
              <input
              id="attack" 
              type="radio"
              name="mesmo"
              onChange={(evt=>{setRadioSelect("attack")})} 
              checked={radioSelect === "attack"}
              />
              <label htmlFor="attack">Attack</label>
              <input 
              id="defense"
              type="radio"
              name="mesmo"
              onChange={(evt=>{setRadioSelect("defense")})} 
              checked={radioSelect === "defense"}
              />
              <label htmlFor="defense">Defense</label>


              <div className="attackAndDefense">
                <div hidden={radioSelect === "defense"}>
                  {attack_and_defense.attack && 
                  attack_and_defense.attack.map(e=>
                  
                  <div className="each-multiplier" key={e[0] + e[1][0] + "attack"}>
                    <span>{e[0]}x</span>
                    <ul>
                        {e[1].map(type=>
                        <li key={type + e[0]}>
                        <span 
                        className={`type type-${type}`}
                        >
                          {type}</span>
                          </li>
                        )}
                    </ul>
                  </div>
                    
                    
                  )}
                </div>
                <div hidden={radioSelect === "attack"}>
                  {attack_and_defense && 
                  attack_and_defense.defense.map(e=>
                  
                  <div className="each-multiplier" key={e[0] + e[1][0] + "defense"}>
                    <span>{e[0]}x</span>
                    <ul>
                        {e[1].map(type=>
                          <li key={e[0] + type}>
                            <span className={`type type-${type}`}>{type}</span>
                          </li>
                        )}
                    </ul>
                    </div>
                    
                  )}
                </div>
              </div>

            </div>
            <div className="about" >
              <h3 style={{
                textAlign:"center",
                fontWeight:"normal", 
                fontSize:"16px", 
                margin:"0 0 20px 0"}}>{pokemon.text}
              </h3>
              <div 
              style={{display:"flex", 
              justifyContent:"space-between",
              padding:"5px 20px 5px 0"
              }}>
                <p >Weight: <span>{pokemon.weight}kg</span></p>
                <p>Height: <span>{pokemon.height}m</span></p>
              </div>
              <p>Habitat: <span>{pokemon.habitat}</span></p>
              <div className="abilities">
                <p>Abilities:</p>
                <ul>
                  {pokemon.abilities.map(e=>
                    <li key={pokemon.name[0] + e.ability.name}>{e.ability.name}</li>
                  )}
                </ul>
            </div>
              <div className="eggs">
                <p>Egg groups:</p>
                <ul>
                  {pokemon.eggs.map(e=><li key={e.name + "egg"}>{e.name}</li>)}
                </ul>
              </div>
              <div className="types">
                <p>Type:</p>
                <ul>
                    {pokemon.types.map(type=>
                    <li key={pokemon.name[0] + type.type.name}>
                      <span className={`type type-${type.type.name}`}>
                        {type.type.name}
                      </span>
                    </li>)}
                </ul>
              </div>
            </div>
            
            <div className="evolution-chain">
              <EvolutionChain url={pokemon.chain} />
            </div>
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
 