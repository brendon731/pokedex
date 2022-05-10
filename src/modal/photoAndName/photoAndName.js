
import "./styles.css"


export default function PhotoAndName({name,photo, changed}){
    return(<>
     <div className="photoAndName">
        {name.length === 1?
        <h2 className="photoAndName__name">{name[0]}</h2>:
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
      </div>
    </>)

}