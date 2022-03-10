import {useState, useEffect} from "react"

import {Modal, Button, ProgressBar} from 'react-bootstrap'
import "./App.css"
import "./pokemon-colors.css"
import EvolutionChain from "./evolution-chain.js"

export default function Example(props) {
    //const [show, setShow] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false)
  const [pokemon, setPokemon] = useState(false)
  const [selectedPokemon, setSelectedPokemon] = useState(props.poke)

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
        })
        .catch(error=>{console.log(error, "deu error na f de dentro")})
    })
    .catch(err=>{console.log(err, "deu error-------")})
  }
  useEffect(()=>{
    getPokemonInfo(selectedPokemon)
    


/*
    (async()=>{

      let teste = await getp(`pokemon/${props.poke}`)
      setPokemon({
        name:teste.name,
        photo:teste.sprites.other["official-artwork"].front_default,
        weight:teste.weight / 10,
        height:teste.height / 10,
        stats:teste.stats,
        abilities:teste.abilities,
        types:teste.types,
        species:teste.species.url
      })
      console.log("////////", pokemon)

      let teste2 = await getp(`pokemon-species/${props.poke}`)
        setPokemon({...pokemon,
        color:teste2.color.name
  
        })
        console.log("dentro da sync")
        console.log(pokemon)
    })()
    console.log("fora da sync")*/
  },[selectedPokemon])

  useEffect(()=>{console.log(pokemon)},[pokemon])
  
  
  function getStats(stat){
    return `${((stat / 200) * 100).toFixed(2)}`
  }
  return (
    <>
     
      <Modal
        show={true}
        onHide={() => props.clicked()}
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
            <div className="type">
              <p>Type:</p>
              <ul>
                {pokemon.types.map(type=><>
                  <li>{type.type.name}</li>
                </>)}
              </ul>
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
            <EvolutionChain url={pokemon.chain}/>
          </div>
        </div>
        </div>
          
        </Modal.Body>
            </>}
      </Modal>
    </>
  );
  }
 