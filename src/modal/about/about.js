import "./styles.css"


export default function About({text, name, weight, height, habitat, abilities, eggs, types}){
    return(
        <div className="about" >
        <p className="about__text" style={{paddingBottom:"10px"}}>{text}</p>
        <p style={{float:"left"}}><strong>Weight: </strong>{weight}kg</p>
        <p style={{float:"right"}}><strong>Height: </strong>{height}m</p>
        <p style={{clear:"both"}}><strong>Habitat: </strong>{habitat}</p>
          <strong>Abilities:</strong>
          <ul>
            {abilities.map(e=>
              <li key={name[0] + e.ability.name}>{e.ability.name}</li>
            )}
          </ul>
        <div className="eggs">
          <strong>Egg groups:</strong>
          <ul>
            {eggs.map(e=><li key={e.name + "egg"}>{e.name}</li>)}
          </ul>
        </div>
          <strong>Type:</strong>
          <ul>
              {types.map(type=>
              <li key={name[0] + type.type.name}>
                <span className={`type type-${type.type.name}`}>
                  {type.type.name}
                </span>
              </li>)}
          </ul>
      </div>
    )
}