import { useEffect, useState } from "react"



export function SecondFilter({setSelectedFilter, selectedFilter, optionsList}){
    useEffect(()=>{console.log("renderizouuuu")},[])

    const [isMenuOpened, setIsMenuOpened] = useState(false)
    

    function selectOption(option){
        setSelectedFilter(option)   
        
        setIsMenuOpened(!isMenuOpened)
    }
    return(<>
    <div>

        <button onClick={()=>setIsMenuOpened(!isMenuOpened)}>{selectedFilter || "select one"}</button>
        {isMenuOpened && 
        <div>
            <ul>
                {optionsList.map(option=>
                <li key={option.name}
                onClick={()=> selectOption(option.name)}
                >{option.name}</li>
                )}
            </ul>
        </div>
        }
        </div>


        
        </>
    )
}