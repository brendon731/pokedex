export function Multiplier({factor}){
    const [multiplier, types] = factor
    return (
        <div className="multipliers__each__multiplier" key={multiplier + types[0] + "attack"}>
            <ul>
                <li>{multiplier}x</li>
                {types.map(type=>
                <li key={type + multiplier} className="multiplier__each__type">
                    <span className={`type type-${type}`}>{type}</span>
                </li>
                )}
            </ul>
        </div>)
}