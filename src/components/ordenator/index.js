import {useState} from "react"
import { Filters } from "../filters"
import {ReactComponent as SortIcon} from "../../assets/sort.svg"
const filterOptions = [
   
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
    const orderName = filterOptions.find(e => e.value === order) || filterOptions[0]
   
    const [isMenuOpened, setIsMenuOpened] = useState(false) 
    function selectOption(option){
        setOrder(option)
        setIsMenuOpened(!isMenuOpened)
    }
    return(
        <Filters>
            <button onClick={()=>setIsMenuOpened(!isMenuOpened)}>{orderName.name || "ordenar por"}
            <SortIcon/>
            </button>
            {isMenuOpened && 
                <ul className="list">
                    {filterOptions.map(option=>
                    <li key={option.value}
                    onClick={()=> selectOption(option.value)}
                    >{option.name}</li>
                    )}
                </ul>
            }
        </Filters>
    )
}