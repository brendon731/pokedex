
import { useEffect, useState } from "react"
import { pokemons } from "../../pokemonnames"
import { Container, List } from "./styles"

export function Searcher({setSearch, search}){
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
        setIsListOpened(false)
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
                <button onClick={closeSearchList}>Pesquisar</button>
                {
                    searchList.length?
                    <ul>
                        {searchList.map(e=>(
                            <li onMouseDown={evt=>{
                                setSearch(e.name)
                                closeSearchList()
                            }}>{e.name}</li>
                            ))}
                    </ul>:null
                    }
            </div>
        </Container>
    )
}