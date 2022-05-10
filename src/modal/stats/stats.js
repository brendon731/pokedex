import {ProgressBar} from 'react-bootstrap'
import "./styles.css"


export default function Stats({stats}){
    function getStats(stat){
        return `${((stat / 200) * 100).toFixed(2)}`
      }
    return(
    <div className="stats">
        <h4>Stats</h4>

        <ul className="stats__list">
        {stats.map(e=>
        <li key={e.stat.name + "stat"} className="stats__item">
            <span className="stats__name">{e.stat.name}</span>
            <ProgressBar 
            style={{ maxWidth:"350px", flexGrow:"1", alignSelf:"center"}}
            striped 
            animated
            variant="success" 
            now={getStats(e.base_stat)}
            label={e.base_stat}
            />
        </li>

        )}
        </ul>
    </div>)
}