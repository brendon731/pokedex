import { useEffect, useState } from "react"
// import "./../../../types.css"

import {Link} from "react-router-dom"
import { Card } from "./styles"


export function Cards({pokemon}){
    const [isLoading, setIsLoading] = useState(false)
    return(
    <>
    <Card>

    <Link 
        to={`/${pokemon.name}`} 
            // style={{position:"relative"}}
        className={pokemon?.types[0].type.name}
        >
            <div>

                {/* <span className="pokemon-id">#{pokemon.id}</span> */}
                <div className={`card-img`}>
                    <img src={pokemon?.photo} alt="ta chegando"
                    onLoad={() => setIsLoading(true)}
                    />
                </div>
                <div>

                <h4 className="pokemon__name">{pokemon?.name}</h4>
                <div className="type-container">
                    {pokemon?.types?.map(poke=>
                        <span 
                        key={pokemon.name + poke.type.name + "card-photo"}
                        className={`type type-${poke.type.name}`}
                        >{poke.type.name}</span>
                        )}
                </div>
                </div>
            </div>
        
        </Link>
    </Card>
     
    </>)

}