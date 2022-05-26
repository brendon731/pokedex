import {useState, useEffect} from "react"
import "./styles.css"
import {getMultipliers} from "../../teste.js"


export default function  AttackAndDefense(props){
  const [attack_and_defense, setAttack_and_defense] = useState(false)
    useEffect(()=>{
        let typesNames = props.types.map(e=>e.type.name)
        let {attack, defense} = getMultipliers(typesNames)
        let keys_attack = Object.entries(attack)
        let keys_defense = Object.entries(defense)
        setAttack_and_defense({
            attack:keys_attack.sort(),
            defense:keys_defense.sort()
        })
    },[])
    

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
                {attack_and_defense.attack && attack_and_defense.attack.map(e=>multipliers(e))}
            </div>
            <div hidden={radioSelect === "attack"}>
                {attack_and_defense.defense && attack_and_defense.defense.map(e=>multipliers(e))}
            </div>
        </div>

  </div>)
}