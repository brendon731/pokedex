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
    const [pokemonList, setPokemonList] = useState([])

    /*async function getPokemon(pokemon){
        let teste = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon)
        let teste2 = await teste.json()
        return teste2
    }*/
    async function getPokemonList(){
        let teste = await fetch("https://pokeapi.co/api/v2/pokemon")
        let teste2 = await teste.json()
        return teste2.results
    }

    useEffect(()=>{
      (async()=>{
        setPokemonList(await getPokemonList())
      })()
    },[])

    const handleShowModal = useCallback(()=>{
      setShow(()=>!show)
    },[show])

    const handlePokemon = useCallback(evt=>{
     // console.log(evt, 'evt')
      setPokemon(evt)
      setShow(()=>!show)

    },[pokemon, show])
  return (
    <>  
    <Outlet/>
    <div style={{display:"flex", flexWrap:"wrap", border:"2px solid blue"}}>
      
    
        {pokemonList.map(pokemon=>
        <>
        <Link to={`/${pokemon.name}`}>
          <div 
            style={{border:"1px solid red",
            flexGrow:"1", 
            width:"150px"
           }}
          >
            <Thumb 
              {...pokemon}>
              <p>{pokemon.name}</p>
            </Thumb>
          </div>
        </Link>
        </>
        )}
      </div>
    </>
  );
}

export default App;
