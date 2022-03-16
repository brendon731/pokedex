import getPokemon from "./getpokemon"
import { useEffect, useState, useCallback } from "react";
import Example from "./modal"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import "./pokemon-colors.css"

import Thumb from "./pokemon-card-photo.js"

import {Link, Outlet} from "react-router-dom"

function App() {
    const [show, setShow] = useState(false);

    const [pokemon, setPokemon] = useState("")
    const filters = ["all","shape", "habitat", "type", "ability", "generation"]
    
    const [filter1, setFilter1]= useState("all")
    const [filter2, setFilter2]= useState({results:["all"]})

    const [filtered, setFiltered] = useState("")

    const [next, setNext] = useState("")
    const [fetchedFilter, setFetchedFilter] = useState([])
    const baseUrl = "https://pokeapi.co/api/v2/"
    const [url, setUrl] = useState("pokemon?limit=100&offset=0")
    const [pokemonList, setPokemonList] = useState(false)

    async function getPokemonList(url1){
        let teste = await fetch(`${baseUrl}${url1}`)
        let teste2 = await teste.json()
        return teste2
    }
    
    async function fetchSelectedFilter(filter){
      let teste = []
      switch (filter){
        case "ability":
          teste = await getPokemonList(filter)
          return teste
        case "type":
          teste = await getPokemonList(filter)
          return teste
        case "shape":
          teste = await getPokemonList("pokemon-shape")
          return teste
        case "habitat":
          teste = await getPokemonList("pokemon-habitat")
          return teste
        case "generation":
          teste = await getPokemonList(filter)
          return teste
        default:
          teste = await getPokemonList("pokemon-species")
          return teste.results
          
      }
    }
    async function fetchPokemonsFromFilter(filter, pokemonFiltered){
      let teste = []
      switch (filter){
        case "ability":
          teste = await getPokemonList(`${filter}/${pokemonFiltered}`)
          return teste.pokemon.map(e=>e.pokemon)
        case "type":
          teste = await getPokemonList(`${filter}/${pokemonFiltered}`)
          return teste.pokemon.map(e=>e.pokemon)
        case "shape":
          teste = await getPokemonList("pokemon-shape/"+pokemonFiltered)
          return teste.pokemon_species
        case "habitat":
          teste = await getPokemonList("pokemon-habitat/"+pokemonFiltered)
          return teste.pokemon_species
        case "generation":
          teste = await getPokemonList("generation/"+pokemonFiltered)
          return teste.pokemon_species
        default:
          teste = await getPokemonList(url)
          return teste.results
          
      }
    }
    /*
    useEffect(()=>{
      (async()=>{
        
        let teste = await getPokemonList(url)
          setPokemonList(teste.results)
      
      })()
    },[])*/

    useEffect(()=>{
      
        (async()=>{
          if(filter1 ==="all"){
            let teste = await fetchSelectedFilter(filter1)
            setPokemonList(teste)
            setFilter2({results:["all"]})

          }else{
            let teste = await fetchSelectedFilter(filter1)
            console.log(teste, "----------")
            setFilter2({results:["all", ...teste.results]})
          }
        })()
    },[filter1])
    
    useEffect(()=>{
        (async()=>{
          if(filtered){
            let teste = await fetchPokemonsFromFilter(filter1, filtered)
            console.log(filtered, "filtered")
            console.log(teste, "=================")
              setPokemonList(teste)
          }
        })()
      
    },[filtered])

    useEffect(()=>{console.log(pokemonList, "pokemonList")},[pokemonList])
    useEffect(()=>{console.log(filter2, "filter2")},[filter2])



    
  return (
    <> 
    <div className="filter">
      <select onChange={evt=>{setFilter1(evt.target.value)}}>
      {filters.map(e=>
        <option key={e + "filters"}>{e}</option>
        )}
      </select>

        {filter2 &&
          <select onChange={evt=>{setFiltered(evt.target.value)}}>
          {filter2.results.map(e=>
            <option key={e.name + "filter2"}>{e.name}</option>
            )}
        </select>
        }
      
      
    </div>
    <Outlet/>
    <div className="card-container" 
      style={{display:"flex",
      flexWrap:"wrap",
      border:"1px solid black"
    }}
      >
        {pokemonList &&
        pokemonList.map(pokemon=>
        <>
          <Link 
          key={pokemon.name+"app"}
          className="card-a"
          to={`/${pokemon.name}`} 
        >
              <Thumb 
                {...pokemon}>
                <h4 
                style={{
                margin:"10px auto 7px", 
                width:"fit-content",
                fontSize:"20px",
                textTransform:"capitalize"}}>{pokemon.name}</h4>
              </Thumb>
          </Link>
        </>
        )
        
        }
     

      </div>
      {/*<button onClick={()=>setUrl(pokemonList.next)}>mais</button>*/}

    </>
  );
}

export default App;
