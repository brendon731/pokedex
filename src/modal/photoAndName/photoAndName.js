
import { Container } from "../container/styles"
import "./styles.css"


export default function PhotoAndName({name, photo, changed}){
    return(<>
     <Container>
        {name.length === 1?
        <h1 className="photoAndName__name">{name[0]}</h1>:
        <select
        className="photoAndName__select__name"
          onChange={(evt)=>{changed(evt.target.value)}}>
          {name.map(e=>
            <option className="photoAndName__select__name__option" key={e + "pokemon-variante"}>{e}</option>
          )}
        </select>
        }
        <img 
        alt={name}
        src={photo}
        className="photoAndName__photo"
        />
      </Container>
    </>)

}