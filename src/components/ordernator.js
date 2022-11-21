import {useState} from "react"
const filterOptions = [
    {
        name:"",
        value:""
    },
    {
        name:"Lowest to Highest number",
        value:"L-H"
    
    },
    {
        name:"Highest to lowest number",
        value:"H-L"
    
    },
    {
        name:"A-Z",
        value:"A-Z"
    
    },
    {
        name:"Z-A",
        value:"Z-A"
    
    },
    
]
export function Ordenator({setOrder, order}){
    const orderName = filterOptions.find(e => e.value === order)
   
    const [isMenuOpened, setIsMenuOpened] = useState(false) 
    function selectOption(option){
        setOrder(option)
        setIsMenuOpened(!isMenuOpened)
    }
    return(
        <div>

            <button onClick={()=>setIsMenuOpened(!isMenuOpened)}>{orderName.name || "ordenar por"}</button>
            {isMenuOpened && 
            <div>
                <ul>
                    {filterOptions.map(option=>
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