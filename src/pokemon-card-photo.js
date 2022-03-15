import { useEffect, useState } from "react"
import "./types.css"
import "./pokemon-colors.css"
import "./card-colors2.css"

export default function Thumb({name, children}){
    const [pokemon, setPokemon] = useState(false)
    async function getPokemon(pokemon){
        let teste = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon)
        let teste2 = await teste.json()
        return teste2
    }
    useEffect(async()=>{
        let teste = await getPokemon(name)
        //let teste2 = await teste.json()
        setPokemon({
            is_front:true,
            photo:teste.sprites.other["official-artwork"].front_default,
            types:teste.types
        }) 
    },[])

    return(
    <>
        {pokemon &&
        <>
        <div
        className={`each-card ${pokemon.types[0].type.name}`}
        style={{padding:'10px', borderRadius:'5px'}}
        >
            <div className="card-img">
                <img
                src={pokemon.photo}
                alt={pokemon.name}
                />
            </div>
            <div>
                {children}
                <div className="type-container" 
                    style={{
                    margin:"auto", 
                    width:"fit-content"
                    }}>
                    {pokemon.types.map(poke=>
                    <>
                        <span 
                        className={`type type-${poke.type.name}`}
                        >{poke.type.name}</span>
                    </>)}
                </div>
            </div>
        </div>
        </>

     }
    </>)

}