import { useEffect, useState } from "react"
import "./../types.css"
//import "./pokemon-colors.css"
import "./../card-colors2.css"
import "./styles.css"


import {Link} from "react-router-dom"

async function getPokemon(pokemon){
    let teste = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon)
    let teste2 = await teste.json()
    return teste2
}
export default function Thumb({pokemon}){
    // console.log(pokemon, "---pokemon------")
    // const [pokemon, setPokemon] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
   
    // useEffect(async()=>{
    //     let teste = await getPokemon(id)
    //     setPokemon({
    //         is_front:true,
    //         id:teste.id,
    //         name:teste.name,
    //         img:teste.sprites.other.dream_world.front_default,
    //         photo:teste.sprites.other["official-artwork"].front_default,
    //         types:teste.types
    //     }) 
    //     setIsLoading(false)
    // },[])

    // if(isLoading) return  (<Link  to="/" className={`card card-loading`}>
    {/* <span className="pokemon-id">#id</span>
    <div className="card-img"></div>
        
        <h4>kuyuk</h4>
        <div className="type-container"></div> */}

{/* </Link>) */}
    return(
    <>
    
        
    <Link 
            className={`card ${pokemon.types[0].type.name}`}
            to={`/${pokemon.name}`} 
            style={{position:"relative"}}
        >
            <span className="pokemon-id">#{pokemon.id}</span>
            <div className={`card-img ${isLoading ? "card-img-waiting" : null}`}
            // style={isLoading ? {} : { backgroundColor:"grey"}}
            >
                <img src={pokemon.photo} alt="ta chegando"
                style={isLoading ? {} : { backgroundColor:"grey",display: 'none' }}
                onLoad={() => setIsLoading(true)}
                />
            </div>
                
                <h4>{pokemon.name}</h4>
                <div className="type-container" 
                    >
                    {pokemon.types.map(poke=>
                        <span 
                        key={pokemon.name + poke.type.name + "card-photo"}
                        className={`type type-${poke.type.name}`}
                        >{poke.type.name}</span>
                    )}
                </div>
        
        </Link>
     
    </>)

}