import { useEffect, useState } from "react"
import "./types.css"
import "./pokemon-colors.css"
import "./card-colors2.css"

import {Link} from "react-router-dom"

export default function Thumb({children, id, name}){
    const [pokemon, setPokemon] = useState(false)
    /*
    let poke = url.split("/")
    let pokemonSelected = poke[poke.length - 2]
    */
    async function getPokemon(pokemon){
        let teste = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon)
        let teste2 = await teste.json()
        return teste2
    }
    useEffect(async()=>{
        let teste = await getPokemon(id)
        //let teste2 = await teste.json()
        setPokemon({
            is_front:true,
            id:teste.id,
            name:teste.name,
            img:teste.sprites.other.dream_world.front_default,
            photo:teste.sprites.other["official-artwork"].front_default,
            types:teste.types
        }) 
    },[])

    return(
    <>
        {pokemon &&
        <>
        <Link 
            className={`each-card ${pokemon.types[0].type.name}`}
            to={`/${pokemon.name}`} 
            style={{position:"relative"}}
        >
            <span className="pokemon-id">
                #{pokemon.id}
            </span>
            <div className="card-img" 
            style={{backgroundImage:`url(${pokemon.photo})`}}>
                

            </div>
                {children}
                <h4>{name}</h4>
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
        </>

     }
    </>)

}