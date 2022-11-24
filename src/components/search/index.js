
import { useEffect, useState } from "react"
import { pokemons } from "../../pokemonnames"
import { Container } from "./styles"

export function Searcher({setSearch, search, searchPokemon}){
    const [searchList, setSearchList] = useState([])
    const [isListOpened, setIsListOpened] = useState(false)
    function testSearch(title){
        if(!search) return true
        const regex = new RegExp(search, "i")
        return regex.test(title)
      }
    useEffect(()=>{
        setSearchList(pokemons.filter(e=>testSearch(e.name)))
    },[search])
    
    function closeSearchList(){
    }
    return(
        <Container>
            <div className="search__container">
                <input 
                type="search"
                value={search} 
                onChange={evt=> {
                    setIsListOpened(true)
                    setSearch(evt.target.value) }  
                }
                    />
                
                {
                    searchList.length?
                    <ul className="search__list">
                        {searchList.map(e=>(
                            <li 
                            key={e.name + "search"}
                            onMouseDown={evt=>{
                                setSearch(e.name)
                                closeSearchList()
                            }}>{e.name}</li>
                            ))}
                    </ul>:null
                    }
            </div>
            <button onClick={()=>{
                    searchPokemon(search)

                }}>Pesquisar</button>
        </Container>
    )
}