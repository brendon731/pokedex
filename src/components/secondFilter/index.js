import { useEffect, useState } from "react"
import { Filters } from "../filters"



export function SecondFilter({setSelectedFilter, selectedFilter, optionsList}){

    const [isMenuOpened, setIsMenuOpened] = useState(false)
    

    function selectOption(option){
        setSelectedFilter(option)   
        
        setIsMenuOpened(!isMenuOpened)
    }
    return(<>
    <Filters>

        <button onClick={()=>setIsMenuOpened(!isMenuOpened)}>{selectedFilter || "select one"}</button>
        {isMenuOpened && 
            <ul>
                {optionsList.map(option=>
                <li key={option.name}
                onClick={()=> selectOption(option.name)}
                >{option.name}</li>
                )}
            </ul>
        }
        </Filters>
        </>
    )
}