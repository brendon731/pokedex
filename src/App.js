import getPokemon from "./getpokemon"
import { useEffect, useState, useCallback } from "react";
import Example from "./modal"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import "./pokemon-colors.css"

import {pokemons, pokes} from "./pokemonnames.js"
import Alert from "react-bootstrap/Alert"



import Thumb from "./pokemon-card-photo.js"

import {Link, Outlet} from "react-router-dom"

function App() {
  console.log("-----------")
    const filters = {
      all:"pokemon-species",
      shape:"pokemon-shape",
      habitat:"pokemon-habitat",
      type:"type",
      generation:"generation",
      "Higest to lowest number":"Z-A"
    }
    
    const [filter1, setFilter1]= useState("all")
    const [filter2, setFilter2]= useState(false)

    const [filtered, setFiltered] = useState("")

    const [next, setNext] = useState("")

    const [nuOfPoke, setNuOfPoke] = useState(878)
    const initialNumberToFetch = 878

    const [searching, setSearching] = useState("")
    const [filteredFromSearching, setFilteredFromSearching] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    //const [fetchedFilter, setFetchedFilter] = useState([])
    const baseUrl = "https://pokeapi.co/api/v2/"
    const [url, setUrl] = useState("pokemon-species?limit=100&offset=0")
    const [pokemonList, setPokemonList] = useState(false)

    async function getPokemonList(url1){
        let teste = await fetch(`${url1}`)
        let teste2 = await teste.json()
        return teste2
    }
    
    async function fetchSelectedFilter(filter){
      let teste = []
      let fullUrl = baseUrl + filter
      setNext(false)
      switch (filter){
        case "ability":
          teste = await getPokemonList(fullUrl)
          return teste
        case "type":
          teste = await getPokemonList(fullUrl)
          return teste
        case "shape":
          teste = await getPokemonList(baseUrl + "pokemon-shape")
          return teste
        case "habitat":
          teste = await getPokemonList(baseUrl + "pokemon-habitat")
          return teste
        case "generation":
          teste = await getPokemonList(fullUrl)
          return teste
        default:
          teste = await getPokemonList(baseUrl + "pokemon-species")
          setNext(teste.next)
          return teste.results
          
      }
    }
    async function fetchPokemonsFromFilter(filter, pokemonFiltered){
      let teste = []
      console.log("detro filter")
      setNext(false)
      if(pokemonFiltered !== "all"){
        switch (filter){
          case "ability":
            teste = await getPokemonList(`${baseUrl + filter}/${pokemonFiltered}`)
            return teste.pokemon.map(e=>e.pokemon)
          case "type":
            teste = await getPokemonList(`${baseUrl + filter}/${pokemonFiltered}`)
            return teste.pokemon.map(e=>e.pokemon)
          case "shape":
            teste = await getPokemonList(baseUrl + "pokemon-shape/"+pokemonFiltered)
            return teste.pokemon_species
          case "habitat":
            teste = await getPokemonList(baseUrl + "pokemon-habitat/"+pokemonFiltered)
            return teste.pokemon_species
          case "generation":
            teste = await getPokemonList(baseUrl + "generation/"+pokemonFiltered)
            return teste.pokemon_species
          default:
            teste = await getPokemonList(baseUrl + "pokemon-species/")
            setNext(teste.next)
            return teste.results
            
        }
    }else{
      teste = await getPokemonList("pokemon-species/")
      return teste.results
    }
  }
    function getId(url){
      if(isNaN(url)){
        let poke = url.split("/")
        let pokemonSelected = poke[poke.length - 2]
        return pokemonSelected
      }
      return url
    }
    useEffect(()=>{
      
        (async()=>{
          //console.log(teste, "----------nao")
          if(filters[filter1] === "Z-A"){

            let teste = await getPokemonList(baseUrl + `pokemon-species?offset=${nuOfPoke}&limit=20`)
            setNext({previous:teste.previous})
            teste.results.reverse()
            setPokemonList(teste.results)
          }else{
              let teste = await getPokemonList(baseUrl + filters[filter1])
              setNext({next:teste.next})
            if(filter1 === "all"){
              setFilter2(false)
              setPokemonList(teste.results)
            }else{
              setFilter2({results:[...teste.results]})
            }
          }
          
        })()
    },[filter1])
    
    useEffect(()=>{
        (async()=>{
          if(filtered){
            console.log(filtered)
           let teste = await getPokemonList(`${baseUrl}${filters[filter1]}/${filtered}`)
           setPokemonList(teste.results || teste.pokemon_species || teste.pokemon.map(e=>e.pokemon))

          }
        })()
      
    },[filtered])
    useEffect(()=>{
      
    },[])
    const handleClick = useCallback(()=>{
      (async()=>{
        
          let teste = await getPokemonList(next.previous || next.next)
          if(next.previous){
            teste.results.reverse()
            setNext({previous:teste.previous})
          }else{
            setNext({next:teste.next})
          }
          setPokemonList([...pokemonList, ...teste.results])
          console.log("outro effect", url)
      })()
    },[next, pokemonList])

    //useEffect(()=>{console.log(pokemonList, "pokemonList")},[pokemonList])
    useEffect(()=>{
      let filter = pokemons.filter(e=>e.name.includes(searching))
      setFilteredFromSearching(filter)
      console.log(searching)

    },[searching])

    const handleSearch = useCallback(()=>{
      setPokemonList(filteredFromSearching)
      
    },[pokemonList, filteredFromSearching])

    
  return (
    <> 
    <div>
      <div className="search-input">
        <input type="text" id="search" value={searching} 
       
        onChange={(evt)=>setSearching(evt.target.value)}/>
        {searching &&
        <div id="search-history">
          <ul style={{width:"100%"}}>
            {filteredFromSearching.map((e, index)=>
            <li 
            key={"search-history" + index}

            onMouseDown={(evt)=>{setSearching(e.name)}}
            style={{
            border:"1px solid #0000001f", 
            display:"block",
            padding:"5px", 
            width:"100%",
            cursor:"pointer"
            }}>{e.name}</li>)}  
          </ul>
        </div>}
      </div>
      <button onClick={handleSearch} disabled={!searching}>procurar</button>
    </div>

    <div className="filter">
      <select onChange={evt=>{setFilter1(evt.target.value)}}>
      {Object.keys(filters).map(e=>
        <option key={e + "filters"}>{e}</option>
        )}
      </select>

        {filter2 &&
          <select onChange={evt=>{setFiltered(evt.target.value)}}>
            <option defaultValue={"all"} hidden>select {filter1}</option>
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
        {pokemonList.length?
        pokemonList.map(pokemon=>
          <Thumb 
            key={pokemon.name + "index"}
            id={getId(pokemon.url || pokemon.id)}
            >
            <h4 
            style={{
            margin:"10px auto 7px", 
            width:"fit-content",
            fontSize:"20px",
            textTransform:"capitalize"}}>{pokemon.name}</h4>
          </Thumb>
         
        ):<Alert variant="danger">Pokemon Not found</Alert>
        }
      </div>
      {next && <button onClick={handleClick}>mais</button>}

    </>
  );
}

export default App;
