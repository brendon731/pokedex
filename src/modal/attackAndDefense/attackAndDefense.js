import {useState} from "react"
import "./styles.css"


export default function  AttackAndDefense({attack, defense}){
  const [radioSelect, setRadioSelect] = useState("attack")

    function multipliers(e){
        return (
        <div className="multipliers__each__multiplier" key={e[0] + e[1][0] + "attack"}>
            <span>{e[0]}x</span>
            <ul>
                {e[1].map(type=>
                <li key={type + e[0]} className="multiplier__each__type">
                    <span className={`type type-${type}`}>{type}</span>
                </li>
                )}
            </ul>
        </div>)
    }
    function multipliersInput(move){
        return(<>
        <input
        id={move}
        type="radio"
        name="mesmo"
        onChange={(evt=>{setRadioSelect(move)})} 
        checked={radioSelect === move}
        />
        <label htmlFor={move}>{move}</label>
        </>)
    }
    return( 
    <div className="multipliers">
        
        {multipliersInput("attack")}
        {multipliersInput("defense")}

        <div className="attackAndDefense">
            <div hidden={radioSelect === "defense"}>
                {attack && attack.map(e=>multipliers(e))}
            </div>
            <div hidden={radioSelect === "attack"}>
                {defense && defense.map(e=>multipliers(e))}
            </div>
        </div>

  </div>)
}