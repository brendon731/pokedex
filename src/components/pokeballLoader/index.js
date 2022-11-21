
import {Pokeball} from "./styles"

export function Loader(){
    return(
        <div className="modal"
        style={{
        height:"100vh",
        display:"flex",    
        backgroundImage:`url(pokemonwall.png)`, 
        backgroundSize:"cover",
        backgroundRepeat:"no-repeat", 
        backgroundColor:"black"}}
        >
            <Pokeball>
                <div className="red"></div>
                <div className="white"></div>
            </Pokeball>
        </div>
    )
}