export function Input({setRadioSelect, radioSelect, move}){
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