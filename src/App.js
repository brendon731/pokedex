//import getPokemon from "./getpokemon"
import { useEffect, useState, useCallback } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import "./pokemon-colors.css"

import {pokemons} from "./pokemonnames.js"
import Alert from "react-bootstrap/Alert"

import Thumb from "./pokemon-card-photo.js"

import {Outlet} from "react-router-dom"


function App() {
  console.log("-----------")
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
    
    const [filter1, setFilter1]= useState("all")
    const [filter2, setFilter2]= useState(false)
    const [orderedByFilter, setOrderedByFilter] = useState("L-H")

    const [filtered, setFiltered] = useState("")

    //const [next, setNext] = useState("")
    const [nextSliceArray, setNextSliceArray] = useState([0, 20])
    const [searching, setSearching] = useState("")
    const [filteredFromSearching, setFilteredFromSearching] = useState([])
    const [searched, setSearched] = useState(false)
    const baseUrl = "https://pokeapi.co/api/v2/"
    const [pokemonList, setPokemonList] = useState("")
    const [isMenuOpen, setIsMenuOpen] = useState(false)

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
    function alphabetOrder(pokemonArray, search){
      console.log(searched, "---searched-----")
      pokemonArray.sort((a, b) => {
        let x = a.name
        let y = b.name
        return x === y ? 0 : x > y ? 1: -1})
        if(!filtered ){
         if( search){
           return pokemonArray
         }else{
           return pokemonArray.slice(0, 20)
         }
          }
          
        else{return pokemonArray}
        
    }
    function reverseAlphabetOrder(pokemonArray, search){
      console.log(searched, "---searched-----")
      pokemonArray.sort((a, b) => {
        let x = a.name
        let y = b.name
        return x === y ? 0 : x > y ? -1: 1})
        if(!filtered ){
         if( search){
           return pokemonArray
         }else{
           return pokemonArray.slice(0, 20)
         }
          }
          
        else{return pokemonArray}

    }        
    function idOrder(pokemonArray, search){

      console.log(searched, "---searched-----")
      pokemonArray.sort((a, b) => {
        let x = +a.id || +getId(a.url)
        let y = +b.id || +getId(b.url)
        return x === y ? 0 : x > y ? 1: -1})
        if(!filtered ){
         if( search){
           return pokemonArray
         }else{
           return pokemonArray.slice(0, 20)
         }
          }
          
        else{return pokemonArray}

    }

    function reverseIdOrder(pokemonArray, search){
      console.log(searched, "---searched-----")
      pokemonArray.sort((a, b) => {
        let x = +a.id || +getId(a.url)
        let y = +b.id || +getId(b.url)
        return x === y ? 0 : x > y ? -1: 1})
        if(!filtered ){
         if( search){
           return pokemonArray
         }else{
           return pokemonArray.slice(0, 20)
         }
          }
          
        else{return pokemonArray}
  
    }
    
    useEffect(()=>{
     
       if(nextSliceArray[0] !== 0){
         let pokes = pokemons.slice(nextSliceArray[0], nextSliceArray[1])
         setPokemonList([...pokemonList, ...pokes])
       }

    },[nextSliceArray])

    function GetOrdenation({pokemonArray="", search=false}){
      console.log(pokemonArray, "=-=-=-=-=-", search)
     
      let pokemonsToOrder = pokemonArray || pokemons
      console.log(pokemonsToOrder)
      
      setNextSliceArray([0, 20])

      switch(orderedByFilter){
        case "A-Z":
          setPokemonList(alphabetOrder(pokemonsToOrder, search)
          )  
          break
        case "Z-A":
          setPokemonList(reverseAlphabetOrder(pokemonsToOrder, search)
          )
          break
        case "L-H":
          setPokemonList(idOrder(pokemonsToOrder, search))
        break
        case "H-L":
          setPokemonList(reverseIdOrder(pokemonsToOrder, search))
          break
        default:
          setPokemonList(pokemons.slice(0, 20))
          break
      }
    }
    
    
    useEffect(()=>{console.log(pokemonList, "-------pokelist-------")},[pokemonList])

    useEffect(()=>{
        (async()=>{
          if(filtered){
            //console.log(filtered, 'resressresresres')
            setSearching("")
            let teste = await getPokemonList(`${baseUrl}${filters[filter1]}/${filtered}`)
            let pokes = teste.results || teste.pokemon_species || teste.pokemon.map(e=>e.pokemon)
            GetOrdenation({pokemonArray:pokes})
            //setNext(false)
            setNextSliceArray([0, 0])
          }
          console.log(filtered, "1111111111")
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
      
      console.log(searching, "searching")
    },[searching])

    const handleSearch = useCallback(()=>{
      console.log(filteredFromSearching, "filteredfromsearch-=-=-=-=-=")
      if(searching){
        setSearched(true)
        //setPokemonList(filteredFromSearching)
        GetOrdenation({pokemonArray:filteredFromSearching, search:true})
        //setNext(false)
        setNextSliceArray([0, 0])
      }else{
        if(filtered && filter1){
          (async()=>{

            setSearching("")
            let teste = await getPokemonList(`${baseUrl}${filters[filter1]}/${filtered}`)
            let pokes = teste.results || teste.pokemon_species || teste.pokemon.map(e=>e.pokemon)
            GetOrdenation({pokemonArray:pokes})
            //setNext(false)
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
      //console.log("scliciiiiing")
    },[nextSliceArray])

    useEffect(()=>{
      if(filtered || searched){
        GetOrdenation({pokemonArray:pokemonList, search:true})
        console.log("filtered existe", filtered, "----")
      }else{
        //setNextSliceArray([0, 20])
        GetOrdenation({})

        console.log("passei ninguem", "------------------------")
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
        
        console.log("filtertttttererer1", filter1)
        
      }
      setSearching("")

    },[filter1])

  return (
    <>
    <header>
      <div className="header-container">
      <div className="menu-icon" onClick={()=>setIsMenuOpen(!isMenuOpen)}>
        <i className="fas fa-bars"></i>
      </div>
      <div className={`filter-input ${!isMenuOpen?"closed":undefined}`}>

        <div className="input-container" >
          <div className="search">
            <input 
            type="text"
            placeholder="Search for name or id"
            className="search-input" 
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
            <i className="fas fa-search"></i>
          </button>
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
      </div>
      </div>
    </header>

    <Outlet/>
    <div className="card-container">
        {pokemonList.length?
        pokemonList.map((pokemon, index)=>
          <Thumb 
            key={pokemon.url + "index" + pokemon.id}
            id={getId(pokemon.url || pokemon.id)}
            >
            <h4 className="card-title">{pokemon.name}</h4>
          </Thumb>
         
        ):<Alert variant="danger">Pokemon Not found</Alert>
        }
      </div>
      {/*next && <button onClick={handleClick}>mais</button>*/}
      {nextSliceArray[1] && !filtered && !searched && <button onClick={handleSlice}>mais</button>}

    </>
  );
}

export default App;
