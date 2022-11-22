import "./styles.css"
import {Container} from "../container/styles" 

export default function About({text, name, weight, height, habitat, abilities, eggs, types}){
    return(
        <Container>
          <div className="about">

          <p className="about__text">{text}</p>
          <p style={{float:"left"}}><strong>Weight: </strong>{weight}kg</p>
          <p style={{float:"right"}}><strong>Height: </strong>{height}m</p>
          <p style={{clear:"both"}}><strong>Habitat: </strong>{habitat}</p>

          <ul>
            <li>
              <strong>Abilities:</strong>
            </li>
            {abilities.map(e=>
              <li key={name[0] + e.ability.name}>{e.ability.name}</li>
            )}
          </ul>
          <ul>
            <li>
              <strong>Egg groups:</strong>
            </li>
            {eggs.map(e=><li key={e.name + "egg"}>{e.name}</li>)}
          </ul>

          <ul>
            <li><strong>Type:</strong>
            </li>
              {types.map(type=>
              <li key={name[0] + type.type.name}>
                <span className={`type type-${type.type.name}`}>
                  {type.type.name}
                </span>
              </li>)}
          </ul>
          </div>

      </Container>
    )
}