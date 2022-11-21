import { useEffect, useState, useCallback } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import {pokemons} from "./pokemonnames.js"
// import Alert from "react-bootstrap/Alert"

import Thumb from "./cards/pokemon-card.js"

import {Outlet} from "react-router-dom"
import { Ordenator } from "./components/ordernator";
import { Filter } from "./components/filter";
import { SecondFilter } from "./components/secondFilter";
 

async function getPokemonListFiltered(url, category){
  let teste = await fetch(`https://pokeapi.co/api/v2/${url}/${category}`,{
    mode:"cors"
  })
  let teste2 = await teste.json()
  // console.log(teste2.pokemon.map(e=>e.pokemon))
  if(teste2.pokemon){
    return teste2.pokemon.map(e=>e.pokemon)
  }
  if(teste2.pokemon_species)return teste2.pokemon_species
}
async function getPokemonListFilter(url){
  let teste = await fetch(`https://pokeapi.co/api/v2/${url}`, {
    headers:{
      mode:"cors"
    }
  })
  let teste2 = await teste.json()
  return teste2.results
}

function getId(url){
  if(isNaN(url)){
    let poke = url.split("/")
    let pokemonSelected = poke[poke.length - 2]
    return pokemonSelected
  }
  return url
}
// function alphabetOrder(pokemonArray, search, filtered, filter1){
//   pokemonArray.sort((a, b) => {
//     let x = a.name
//     let y = b.name
//     return x === y ? 0 : x > y ? 1: -1})
//     if(!filtered || filter1 === "all"){
//       if( search){
//         return pokemonArray
//       }else{
//         return pokemonArray.slice(0, 20)
//       }
//     }
      
//     else{return pokemonArray}
    
// }
// function reverseAlphabetOrder(pokemonArray, search, filtered, filter1){
//   pokemonArray.sort((a, b) => {
//     let x = a.name
//     let y = b.name
//     return x === y ? 0 : x > y ? -1: 1})
//     if(!filtered || filter1 === "all"){
//       if( search){
//         return pokemonArray
//       }else{
//         return pokemonArray.slice(0, 20)
//       }
//       }
      
//     else{return pokemonArray}

// }        
// function idOrder(pokemonArray, search, filtered, filter1){

//   pokemonArray.sort((a, b) => {
//     let x = +a.id || +getId(a.url)
//     let y = +b.id || +getId(b.url)
//     return x === y ? 0 : x > y ? 1: -1})
//     if(!filtered || filter1 === "all"){
//       if( search){
//         return pokemonArray
//       }else{
//         return pokemonArray.slice(0, 20)
//       }
//       }
      
//     else{return pokemonArray}

// }

// function reverseIdOrder(pokemonArray, search, filtered, filter1){
//   pokemonArray.sort((a, b) => {
//     let x = +a.id || +getId(a.url)
//     let y = +b.id || +getId(b.url)
//     return x === y ? 0 : x > y ? -1: 1})
//     if(!filtered || filter1 === "all"){
//       if( search){
//         return pokemonArray
//       }else{
//         return pokemonArray.slice(0, 20)
//       }
//       }
      
//     else{return pokemonArray}

// }
function App() {
  const [pokemonList, setPokemonList] = useState([])
  const [amount, setAmount] = useState(10)
  const [order, setOrder] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [firstFilterOptions, setFirstFilterOptions] = useState("")
  const [secondFilterOptions, setSecondFilterOptions] = useState([])
  const [selectedFilter, setSelectedFilter] = useState("")

  async function getPokemon(id){
    // let teste = await getPokemon(id)
    let data = await fetch("https://pokeapi.co/api/v2/pokemon/" + id)
    let json = await data.json()
    return{
      is_front:true,
      id:json.id,
      name:json.name,
      img:json.sprites.other.dream_world.front_default,
      photo:json.sprites.other["official-artwork"].front_default,
      types:json.types
    }
    
    
  }
  
  function call(pokemons, amount=10){
    return new Promise((resolve, reject)=>{

      Promise.all(
        [...pokemons.slice(amount - 10, amount)].map(e=>getPokemon(e.id))
        )
        .then(res=>resolve(res))
        .catch(err=>{
          // reject("deu merda")
          console.log("------er----", err)})
      })

  }
  function callFiltered(pokemons){
    return new Promise((resolve, reject)=>{

      Promise.all(
        [...pokemons].map(e=>getPokemon(getId(e.url)))
        )
        .then(res=>resolve(res))
        .catch(err=>{
          // reject("deu merda")
          console.log("------er----", err)})
      })

  }
  function increaseAmount(){
    // setIsLoading(true)
    let newList = typeOfOrder(pokemons, order)
    call(newList, amount + 20)
    .then(res=>setPokemonList([...pokemonList, ...res]))
    .catch(err=>console.log(err))
    setAmount(amount + 10)

    
  }
  
  function getOrdenation(list, type){
    return list.sort((a, b)=> a[type] > b[type] ? 1 : -1)
  }

  function typeOfOrder(newList, type){
    setAmount(20)
    switch(type){
      case "A-Z":
        return getOrdenation(newList, "name")
      case "L-H":
        return getOrdenation(newList, "id")
      case "H-L":
        return getOrdenation(newList, "id").reverse()
      case "Z-A":
        return getOrdenation(newList, "name").reverse()
      default:
        return getOrdenation(newList, "id") 
    }
  
  }
  
  useEffect(()=>{
    let newList = []
    if(firstFilterOptions){
      newList = typeOfOrder([...pokemonList], order)
      setPokemonList([...newList])

    }else{

      newList = typeOfOrder(pokemons, order)
      call(newList)
      .then(res=>setPokemonList(res))
      .catch(err=>console.log(err))
    }
    
  },[order])
  
  useEffect(()=>{
    (async()=>{
      if(firstFilterOptions){
          let data = await getPokemonListFilter(firstFilterOptions)
          setSecondFilterOptions([...typeOfOrder(data, order)])
          
        }else{
          const newList = typeOfOrder(pokemons, order)

          setSecondFilterOptions([])
          let data = await call(newList)
          setPokemonList([...data])

        }
        setSelectedFilter(``)
    })()
  },[firstFilterOptions])

  useEffect(()=>{
    (async()=>{
      if(selectedFilter){
        setIsLoading(true)
        let data = await getPokemonListFiltered(firstFilterOptions, selectedFilter)
        let pokes = await callFiltered(data)
        
        setPokemonList(typeOfOrder(pokes, order))
      }
      
      setIsLoading(false)
    })()
        
        
  },[selectedFilter])
  return(
    <>
    <Outlet/>
      <div className="container">
        <header>
          <Ordenator
          order={order}
          setOrder={setOrder}
          />

          <Filter
          firstFilterOptions={firstFilterOptions}
          setFirstFilterOptions={setFirstFilterOptions}
          setSecondFilterOptions={setSecondFilterOptions}
          />

          {secondFilterOptions?.length && 
          <SecondFilter
          setSelectedFilter={setSelectedFilter}
          selectedFilter={selectedFilter}
          optionsList={secondFilterOptions}
          />}
        </header>
        <div className="card-container">

          {isLoading?
          <div>carregando</div>:
          pokemonList.length && pokemonList.map(pokemon=>
            (<Thumb 
            className="card"
            key={pokemon.name}
            pokemon={pokemon}
            />)
            )
            }
        </div>
          
      </div>
      {isLoading && <h1 style={{margin:"5em 0"}}>carregando.....</h1>}
      <div onClick={increaseAmount}>carregar mais</div>
      </>
  )}

  
//   const [filter1, setFilter1]= useState("all")
//   const [filter2, setFilter2]= useState(false)
//   const [orderedByFilter, setOrderedByFilter] = useState("L-H")

//   const [filtered, setFiltered] = useState("")

//   const [nextSliceArray, setNextSliceArray] = useState([0, 20])
//   const [searching, setSearching] = useState("")
//   const [filteredFromSearching, setFilteredFromSearching] = useState([])
//   const [searched, setSearched] = useState(false)
//   const baseUrl = "https://pokeapi.co/api/v2/"
//   const [pokemonList, setPokemonList] = useState("")
//   const [isMenuOpen, setIsMenuOpen] = useState(false)

//   useEffect(()=>{
    
//       if(nextSliceArray[0] !== 0){
//         let pokes = pokemons.slice(nextSliceArray[0], nextSliceArray[1])
//         setPokemonList([...pokemonList, ...pokes])
//       }

//   },[nextSliceArray])

//   function GetOrdenation({pokemonArray="", search=false}){
    
//     let pokemonsToOrder = pokemonArray || pokemons
    
//     setNextSliceArray([0, 20])

//     switch(orderedByFilter){
//       case "A-Z":
//         setPokemonList(alphabetOrder(pokemonsToOrder, search, filtered, filter1)
//         )  
//         break
//       case "Z-A":
//         setPokemonList(reverseAlphabetOrder(pokemonsToOrder, search, filtered, filter1)
//         )
//         break
//       case "L-H":
//         setPokemonList(idOrder(pokemonsToOrder, search, filtered, filter1))
//       break
//       case "H-L":
//         setPokemonList(reverseIdOrder(pokemonsToOrder, search, filtered, filter1))
//         break
//       default:
//         setPokemonList(pokemons.slice(0, 20))
//         break
//     }
//   }
//   useEffect(()=>{
//       (async()=>{
//         if(filtered){
//           setSearching("")
//           let teste = await getPokemonList(`${baseUrl}${filters[filter1]}/${filtered}`)
//           let pokes = teste.results || teste.pokemon_species || teste.pokemon.map(e=>e.pokemon)
//           GetOrdenation({pokemonArray:pokes})
//           setNextSliceArray([0, 0])
//         }
//       })()
      
//   },[filtered])

//   useEffect(()=>{
//     let filter = []
//     if(!filtered){
//         filter = pokemons.filter(e=>e.name.includes(searching.toLowerCase()) || +e.id === +searching)
//     }else{
//       filter = pokemonList.filter(e=>e.name.includes(searching.toLowerCase()) || +e.id === +searching)

//     }
//     setFilteredFromSearching(filter)
    
//   },[searching])

//   const handleSearch = useCallback(()=>{
//     if(searching){
//       setSearched(true)
//       GetOrdenation({pokemonArray:filteredFromSearching, search:true})
//       setNextSliceArray([0, 0])
//     }else{
//       if(filtered && filter1){
//         (async()=>{

//           setSearching("")
//           let teste = await getPokemonList(`${baseUrl}${filters[filter1]}/${filtered}`)
//           let pokes = teste.results || teste.pokemon_species || teste.pokemon.map(e=>e.pokemon)
//           GetOrdenation({pokemonArray:pokes})
//           setNextSliceArray([0, 0])
//         })()

//       }else{
//         setSearched(false)
//         GetOrdenation({search:false})
//       }
//     }
    
//   },[pokemonList, filteredFromSearching, nextSliceArray, searched])

//   const handleSlice = useCallback(()=>{
//     setNextSliceArray([nextSliceArray[0]+20, nextSliceArray[1]+20])
//   },[nextSliceArray])

//   useEffect(()=>{
//     if(filtered || searched){
//       GetOrdenation({pokemonArray:pokemonList, search:true})
//     }else{
//       GetOrdenation({})

//     }
    
//   },[orderedByFilter])

//   useEffect(()=>{
//     if(filter1 !== "all"){
//       (async()=>{
//         let filt = await getPokemonList(baseUrl + filters[filter1])
//         setFilter2(filt)
//       })()
//     }else{        
//       setSearched(false)
//       setFilter2(false)
//       setFiltered(false)
//       GetOrdenation({search:false})
//       setNextSliceArray([0, 20])
//     }
//     setSearching("")

//   },[filter1])

//   return (
//     <>
//     <header>
//       <div className={`filter-input ${!isMenuOpen?"closed":undefined}`}>

//         <div className="first-half" >
//           <span 
//           className="animation-running"
//           onClick={(evt)=>{
//             setIsMenuOpen(!isMenuOpen)
//             evt.target.classList.remove("animation-running")
            
//             }}>
//           <i className="fa fa-bars"></i> 
//           </span>
//           <div className="header-container">

//             <img src="pokeapi.png" height="50px" className="logo"/>
//             <div className="search-input-and-button">
//               <div className="search">
//                 <input 
//                 type="text"
//                 placeholder="Search for name or id"
//                 value={searching} 
//                 onKeyPress={(evt)=>{
//                   if(evt.key==="Enter"){
//                     handleSearch() 
//                     evt.target.blur()
//                   }}}
//                 onChange={(evt)=>setSearching(evt.target.value)}/>
//                 {searching &&
//                 <div id="search-history">
//                   <ul style={{width:"100%"}}>
//                     {filteredFromSearching.map((e, index)=>
//                     <li 
//                     key={"search-history" + index}
//                     onMouseDown={(evt)=>{
//                       setSearching(e.name) 
//                       }
//                     }
//                   >{e.name}</li>)}  
//                   </ul>
//                 </div>}
//               </div>
//               <button onClick={handleSearch} className="search-button">
//               <i className="fa fa-search"></i>
//               </button>
//             </div>

//           </div>
//         </div>
//         <div className="second-half">
//           <div className="header-container">
              
//               <div className="filters-container">
//                 <fieldset>
//                   <legend>Filtered by...</legend>
//                   <select onChange={evt=>{setFilter1(evt.target.value)}} 
//                     className="filter"
//                     >
//                     {/*<option defaultValue={"filtered"} hidden>Filtered by...</option>*/}

//                     {Object.keys(filters).map(e=>
//                       <option key={e + "filters"}>{e}</option>
//                       )}
//                   </select>

//                   {filter2 &&
//                     <select onChange={evt=>{setFiltered(evt.target.value)}}
//                     className="filter"
//                     >
//                       <option defaultValue={"all"} hidden>select {filter1}</option>
//                     {filter2.results.map(e=>
//                       <option key={e.name + "filter2"}>{e.name}</option>
//                       )}
//                   </select>
//                   }
//                 </fieldset>

//               </div>
//               <div className="ordered">
//               <fieldset>
//                   <legend>Ordered by...</legend>
//                 <select
//                   className="filter"
//                   onChange={(evt)=>setOrderedByFilter(orderFilter[evt.target.value])}
//                   >
//                     {/*<option defaultValue={"ordenated"} hidden>ordered by ...</option>*/}

//                   {Object.keys(orderFilter).map(e=>
//                     <option key={e + "filters"}>{e}</option>
//                     )}
//                 </select>
//               </fieldset>

//               </div>
//             </div>
//         </div>
//       </div>
//     </header>

//     <Outlet/>
//     <div className="card-container">

//         {pokemonList.length?
//         pokemonList.map(pokemon=>
//           <Thumb 
//             key={pokemon.url + "index" + pokemon.id}
//             id={getId(pokemon.url || pokemon.id)}
//             name={pokemon.name}
//             />
         
//         ):<Alert variant="danger">Pokemon Not found</Alert>
//         }
//       </div>
//       {nextSliceArray[1] && !filtered && !searched && <button onClick={handleSlice} className="load-more">mais</button>}

//     </>
//   );
// }

export default App;
