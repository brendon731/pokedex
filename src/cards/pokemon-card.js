import { useEffect, useState } from "react"
import "./../types.css"
//import "./pokemon-colors.css"
import "./../card-colors2.css"
// import "./styles.css"


import {Link} from "react-router-dom"
import { Card } from "./styles"

// async function getPokemon(pokemon){
//     let teste = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon)
//     let teste2 = await teste.json()
//     return teste2
// }
export default function Thumb({pokemon}){
    const [isLoading, setIsLoading] = useState(true)
    return(
    <>
    <Card>
        <Link 
            to={`/${pokemon.name}`} 
            className={pokemon.types[0]}
            >

            <span className="pokemon-id">#{pokemon.id}</span>
            <div className={`card-img ${isLoading ? "card-img-waiting" : null}`}>
                <img src={pokemon.photo} alt="ta chegando"
                // style={isLoading ? { backgroundColor:"grey", display: 'none' } : {}  }
                onLoad={() => setIsLoading(false)}
                />
            </div>

            <h4>{pokemon.name}</h4>
            <div className="type-container">
                {pokemon?.types?.map(type=>
                    <span 
                    key={pokemon.name + type + "card-photo"}
                    className={`type type-${type}`}
                    >{type}</span>
                    )}
            </div>
        </Link>
    </Card>        
    </>)

}