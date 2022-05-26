import { useEffect, useState, useCallback } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import {pokemons} from "./pokemonnames.js"
import Alert from "react-bootstrap/Alert"

import Thumb from "./cards/pokemon-card.js"

import {Outlet} from "react-router-dom"

const orderFilter = {
  "Lowest to Highest number":"L-H",
  "Highest to lowest number":"H-L",
    "A-Z":"A-Z",
    "Z-A":"Z-A"
}
  const filters = {
    all:"pokemon-species",
    shape:"pokemon-shape",
    habitat:"pokemon-habitat",
    type:"type",
    generation:"generation"
  }

async function getPokemonList(url1){
  let teste = await fetch(`${url1}`)
  let teste2 = await teste.json()
  return teste2
}
function getId(url){
  if(isNaN(url)){
    let poke = url.split("/")
    let pokemonSelected = poke[poke.length - 2]
    return pokemonSelected
  }
  return url
}
function alphabetOrder(pokemonArray, search, filtered, filter1){
  pokemonArray.sort((a, b) => {
    let x = a.name
    let y = b.name
    return x === y ? 0 : x > y ? 1: -1})
    if(!filtered || filter1 === "all"){
      if( search){
        return pokemonArray
      }else{
        return pokemonArray.slice(0, 20)
      }
    }
      
    else{return pokemonArray}
    
}
function reverseAlphabetOrder(pokemonArray, search, filtered, filter1){
  pokemonArray.sort((a, b) => {
    let x = a.name
    let y = b.name
    return x === y ? 0 : x > y ? -1: 1})
    if(!filtered || filter1 === "all"){
      if( search){
        return pokemonArray
      }else{
        return pokemonArray.slice(0, 20)
      }
      }
      
    else{return pokemonArray}

}        
function idOrder(pokemonArray, search, filtered, filter1){

  pokemonArray.sort((a, b) => {
    let x = +a.id || +getId(a.url)
    let y = +b.id || +getId(b.url)
    return x === y ? 0 : x > y ? 1: -1})
    if(!filtered || filter1 === "all"){
      if( search){
        return pokemonArray
      }else{
        return pokemonArray.slice(0, 20)
      }
      }
      
    else{return pokemonArray}

}

function reverseIdOrder(pokemonArray, search, filtered, filter1){
  pokemonArray.sort((a, b) => {
    let x = +a.id || +getId(a.url)
    let y = +b.id || +getId(b.url)
    return x === y ? 0 : x > y ? -1: 1})
    if(!filtered || filter1 === "all"){
      if( search){
        return pokemonArray
      }else{
        return pokemonArray.slice(0, 20)
      }
      }
      
    else{return pokemonArray}

}
function App() {
  
  
  const [filter1, setFilter1]= useState("all")
  const [filter2, setFilter2]= useState(false)
  const [orderedByFilter, setOrderedByFilter] = useState("L-H")

  const [filtered, setFiltered] = useState("")

  const [nextSliceArray, setNextSliceArray] = useState([0, 20])
  const [searching, setSearching] = useState("")
  const [filteredFromSearching, setFilteredFromSearching] = useState([])
  const [searched, setSearched] = useState(false)
  const baseUrl = "https://pokeapi.co/api/v2/"
  const [pokemonList, setPokemonList] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(()=>{
    
      if(nextSliceArray[0] !== 0){
        let pokes = pokemons.slice(nextSliceArray[0], nextSliceArray[1])
        setPokemonList([...pokemonList, ...pokes])
      }

  },[nextSliceArray])

  function GetOrdenation({pokemonArray="", search=false}){
    
    let pokemonsToOrder = pokemonArray || pokemons
    
    setNextSliceArray([0, 20])

    switch(orderedByFilter){
      case "A-Z":
        setPokemonList(alphabetOrder(pokemonsToOrder, search, filtered, filter1)
        )  
        break
      case "Z-A":
        setPokemonList(reverseAlphabetOrder(pokemonsToOrder, search, filtered, filter1)
        )
        break
      case "L-H":
        setPokemonList(idOrder(pokemonsToOrder, search, filtered, filter1))
      break
      case "H-L":
        setPokemonList(reverseIdOrder(pokemonsToOrder, search, filtered, filter1))
        break
      default:
        setPokemonList(pokemons.slice(0, 20))
        break
    }
  }
  useEffect(()=>{
      (async()=>{
        if(filtered){
          setSearching("")
          let teste = await getPokemonList(`${baseUrl}${filters[filter1]}/${filtered}`)
          let pokes = teste.results || teste.pokemon_species || teste.pokemon.map(e=>e.pokemon)
          GetOrdenation({pokemonArray:pokes})
          setNextSliceArray([0, 0])
        }
      })()
      
  },[filtered])

  useEffect(()=>{
    let filter = []
    if(!filtered){
        filter = pokemons.filter(e=>e.name.includes(searching.toLowerCase()) || +e.id === +searching)
    }else{
      filter = pokemonList.filter(e=>e.name.includes(searching.toLowerCase()) || +e.id === +searching)

    }
    setFilteredFromSearching(filter)
    
  },[searching])

  const handleSearch = useCallback(()=>{
    if(searching){
      setSearched(true)
      GetOrdenation({pokemonArray:filteredFromSearching, search:true})
      setNextSliceArray([0, 0])
    }else{
      if(filtered && filter1){
        (async()=>{

          setSearching("")
          let teste = await getPokemonList(`${baseUrl}${filters[filter1]}/${filtered}`)
          let pokes = teste.results || teste.pokemon_species || teste.pokemon.map(e=>e.pokemon)
          GetOrdenation({pokemonArray:pokes})
          setNextSliceArray([0, 0])
        })()

      }else{
        setSearched(false)
        GetOrdenation({search:false})
      }
    }
    
  },[pokemonList, filteredFromSearching, nextSliceArray, searched])

  const handleSlice = useCallback(()=>{
    setNextSliceArray([nextSliceArray[0]+20, nextSliceArray[1]+20])
  },[nextSliceArray])

  useEffect(()=>{
    if(filtered || searched){
      GetOrdenation({pokemonArray:pokemonList, search:true})
    }else{
      GetOrdenation({})

    }
    
  },[orderedByFilter])

  useEffect(()=>{
    if(filter1 !== "all"){
      (async()=>{
        let filt = await getPokemonList(baseUrl + filters[filter1])
        setFilter2(filt)
      })()
    }else{        
      setSearched(false)
      setFilter2(false)
      setFiltered(false)
      GetOrdenation({search:false})
      setNextSliceArray([0, 20])
    }
    setSearching("")

  },[filter1])

  return (
    <>
    <header>
      <div className={`filter-input ${!isMenuOpen?"closed":undefined}`}>

        <div className="first-half" >
          <span 
          className="animation-running"
          onClick={(evt)=>{
            setIsMenuOpen(!isMenuOpen)
            evt.target.classList.remove("animation-running")
            
            }}>
          <i className="fa fa-bars"></i> 
          </span>
          <div className="header-container">

            <img src="pokeapi.png" height="50px" className="logo"/>
            <div className="search-input-and-button">
              <div className="search">
                <input 
                type="text"
                placeholder="Search for name or id"
                value={searching} 
                onKeyPress={(evt)=>{
                  if(evt.key==="Enter"){
                    handleSearch() 
                    evt.target.blur()
                  }}}
                onChange={(evt)=>setSearching(evt.target.value)}/>
                {searching &&
                <div id="search-history">
                  <ul style={{width:"100%"}}>
                    {filteredFromSearching.map((e, index)=>
                    <li 
                    key={"search-history" + index}
                    onMouseDown={(evt)=>{
                      setSearching(e.name) 
                      }
                    }
                  >{e.name}</li>)}  
                  </ul>
                </div>}
              </div>
              <button onClick={handleSearch} className="search-button">
              <i className="fa fa-search"></i>
              </button>
            </div>

          </div>
        </div>
        <div className="second-half">
          <div className="header-container">
              
              <div className="filters-container">
                <fieldset>
                  <legend>Filtered by...</legend>
                  <select onChange={evt=>{setFilter1(evt.target.value)}} 
                    className="filter"
                    >
                    {/*<option defaultValue={"filtered"} hidden>Filtered by...</option>*/}

                    {Object.keys(filters).map(e=>
                      <option key={e + "filters"}>{e}</option>
                      )}
                  </select>

                  {filter2 &&
                    <select onChange={evt=>{setFiltered(evt.target.value)}}
                    className="filter"
                    >
                      <option defaultValue={"all"} hidden>select {filter1}</option>
                    {filter2.results.map(e=>
                      <option key={e.name + "filter2"}>{e.name}</option>
                      )}
                  </select>
                  }
                </fieldset>

              </div>
              <div className="ordered">
              <fieldset>
                  <legend>Ordered by...</legend>
                <select
                  className="filter"
                  onChange={(evt)=>setOrderedByFilter(orderFilter[evt.target.value])}
                  >
                    {/*<option defaultValue={"ordenated"} hidden>ordered by ...</option>*/}

                  {Object.keys(orderFilter).map(e=>
                    <option key={e + "filters"}>{e}</option>
                    )}
                </select>
              </fieldset>

              </div>
            </div>
        </div>
      </div>
    </header>

    <Outlet/>
    <div className="card-container">

        {pokemonList.length?
        pokemonList.map(pokemon=>
          <Thumb 
            key={pokemon.url + "index" + pokemon.id}
            id={getId(pokemon.url || pokemon.id)}
            name={pokemon.name}
            />
         
        ):<Alert variant="danger">Pokemon Not found</Alert>
        }
      </div>
      {nextSliceArray[1] && !filtered && !searched && <button onClick={handleSlice} className="load-more">mais</button>}

    </>
  );
}

export default App;
