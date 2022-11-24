import {useState, useEffect} from "react"
import "./styles.css"
import {getMultipliers} from "../../teste.js"
import { Container } from "../container/styles"
import { Input } from "./input/index" 
import { Multiplier } from "./multipliers"
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
    
    return( 
    <Container>
        <h2>
        <Input
            move={"attack"}
            radioSelect={radioSelect}
            setRadioSelect={setRadioSelect}
            />
        <Input
            move={"defense"}
            radioSelect={radioSelect}
            setRadioSelect={setRadioSelect}
            />
        </h2>

        <div className="attackAndDefense">
            <div hidden={radioSelect === "defense"}>
                {attack_and_defense.attack && 
                attack_and_defense.attack.map(e=>
                    <Multiplier key={e + "attack"} factor={e}/>
                    )}
            </div>
            <div hidden={radioSelect === "attack"}>
                {attack_and_defense.defense && 
                attack_and_defense.defense.map(e=>
                    <Multiplier key={e + "defense"} factor={e}/>
                    
                    )}
            </div>
        </div>

  </Container>)
}