import {useState} from "react"

const filter = {
    all:"pokemon-species",
    shape:"pokemon-shape",
    habitat:"pokemon-habitat",
    type:"type",
    generation:"generation"
  }
  const filters = [
    {
        name:"",
        value:""
    },
    {
        name:"shape",
        value:"pokemon-shape"
    },
    {
        name:"habitat",
        value:"pokemon-habitat"
    },
    {
        name:"type",
        value:"type"
    },
    {
        name:"generation",
        value:"generation"
    }
  ]
  async function getPokemonListFilter(url1){
    let teste = await fetch(`https://pokeapi.co/api/v2/${url1}`)
    let teste2 = await teste.json()
    return teste2.results
}
export function Filter({firstFilterOptions, setFirstFilterOptions, setSecondFilterOptions}){
    const orderName = filters.find(e => firstFilterOptions === e.value)
   
    const [isMenuOpened, setIsMenuOpened] = useState(false) 
    function selectOption(option){
        setFirstFilterOptions(option)
        
        setIsMenuOpened(!isMenuOpened)
    }
    
    return(
        <div>

            <button onClick={()=>setIsMenuOpened(!isMenuOpened)}>{orderName?.name || "All"}</button>
            {isMenuOpened && 
            <div>
                <ul>
                    {filters.map(option=>
                    <li key={option.value}
                    onClick={()=> selectOption(option.value)}
                    >{option.name}</li>
                    )}
                </ul>
            </div>
            }
        </div>
    )
}