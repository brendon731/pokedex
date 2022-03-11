import { useEffect, useState } from "react"
import "./types.css"
import "./pokemon-colors.css"


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
            front_default:teste.sprites.front_default,
            back_default:teste.sprites.back_default,
            types:teste.types
        }) 
    },[])
    useEffect(()=>{},[pokemon])

    return(
    <>
    <div className={pokemon}>

        <img 
        style={{margin:"auto", display:"block"}}
        src={pokemon.is_front?
            pokemon.front_default:
            pokemon.back_default
        }
        
        />
        <div style={{border:"1px solid green"}}>
            {children}
            <div>
                {pokemon && pokemon.types.map(poke=>
                <>
                    <span 
                    className={`type ${poke.type.name}`}
                    >{poke.type.name}</span>
                </>)}
            </div>
        </div>
    </div>
    
    </>)

}