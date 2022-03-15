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
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
    const [pokemonList, setPokemonList] = useState(false)

    async function getPokemonList(url1){
        let teste = await fetch(`${url1}`)
        let teste2 = await teste.json()
        return teste2
    }

    useEffect(()=>{
      (async()=>{
        setShow(false)
        let teste = await getPokemonList(url)
        if(pokemonList){
          setPokemonList({
            next:teste.next, 
            results:[
              ...pokemonList.results, 
              ...teste.results]
            })
        }else{
          setPokemonList(teste)
        }
        setTimeout(()=>{
          setShow(true)
        },1000)
      })()
    },[url])

    
  return (
    <> 
    {false && <>
      <div style={{backgroundColor:"black",position:"absolute", height:"100px", width:"100%"}}>
        <h1 style={{color:"white", position:"absolute"}}>loading........</h1>
      </div>
      </> }
    <Outlet/>
    <div className="card-container" 
      style={{display:"flex",
      flexWrap:"wrap",
      border:"1px solid black"
    }}
      >
        {pokemonList &&
        pokemonList.results.map(pokemon=>
        <>
          <Link 
          className="card-a"
          to={`/${pokemon.name}`} 
        >
              <Thumb 
                {...pokemon}>
                <h4 
                style={{margin:"10px auto 7px", 
                width:"fit-content",
                 fontSize:"20px",
                 textTransform:"capitalize"}}>{pokemon.name}</h4>
              </Thumb>
          </Link>
        </>
        )
        
        }
     

      </div>
      <button onClick={()=>setUrl(pokemonList.next)}>mais</button>

    </>
  );
}

export default App;
