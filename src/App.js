import { useEffect, useState } from "react";
import "./App.css"

import Thumb from "./cards/pokemon-card.js"
import pokemons_card from "./data-pokemon-card.json"
import {Outlet} from "react-router-dom"
import { Ordenator } from "./components/ordenator";
import { Filter } from "./components/filter";
import { SecondFilter } from "./components/secondFilter";
import {Searcher} from "./components/search"
import { Loader } from "./components/pokeballLoader";
import { Header } from "./components/header";


// async function getPokemonListFiltered(url, category){
//   let teste = await fetch(`https://pokeapi.co/api/v2/${url}/${category}`,{
//     mode:"cors"
//   })
//   let teste2 = await teste.json()
//   if(teste2.pokemon){
//     return teste2.pokemon.map(e=>e.pokemon)
//   }
//   if(teste2.pokemon_species)return teste2.pokemon_species
// }
// async function getPokemonListFilter(url){
//   let teste = await fetch(`https://pokeapi.co/api/v2/${url}`, {
//     headers:{
//       mode:"cors"
//     }
//   })
//   let teste2 = await teste.json()
//   return teste2.results
// }
function getOrdenation(list, type){
  return list.sort((a, b)=> a[type] > b[type] ? 1 : -1)
}

const INCREASEAMOUNT = 20
function App() {
  const [pokemonList, setPokemonList] = useState([])
  const [amount, setAmount] = useState(0)
  const [order, setOrder] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // const [firstFilterSelected, setFirstFilterSelected] = useState("")
  // const [secondFilterOptions, setSecondFilterOptions] = useState([])
  // const [selectedFilter, setSelectedFilter] = useState("")
  const [search, setSearch] = useState("")

  const [fetchedAll, setFetchedAll] = useState(false)

  function testSearch(title){
    if(!search) return true
    const regex = new RegExp(search, "i")
    return regex.test(title)
  }
  
  function increaseAmount(){
    let newList = typeOfOrder(pokemons_card, order)
    .filter( ({ name }) => testSearch(name) )
    .slice(amount, amount + INCREASEAMOUNT)
    setPokemonList([...pokemonList, ...newList])
    setAmount(amount + INCREASEAMOUNT)

    if(newList.length < INCREASEAMOUNT){
      setFetchedAll(true)}
    
  }
  
  

  function typeOfOrder(newList, type){
    setAmount(INCREASEAMOUNT)
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
  // useEffect(()=>{
  //   let newList = []
  //   // console.log(fetchedAll)
  //   if(fetchedAll){
  //     newList = 
  //     typeOfOrder([...pokemonList], order)
  //     .filter( ({ name }) => testSearch(name) )

  //     setPokemonList([...newList])

  //   }else{
  //       newList = typeOfOrder([...pokemons_card], order)
  //       .filter( ({ name }) => testSearch(name) )
  //       .slice(0, INCREASEAMOUNT)

  //       // setAmount(INCREASEAMOUNT)
  //       setPokemonList([...newList])
  //   }
    
  // },[order])
  
// useEffect(()=>{
//     (async()=>{
//       if(firstFilterSelected){

//           let data = await getPokemonListFilter(firstFilterSelected)
//           setSecondFilterOptions(data)
          
//         }else{

//           const newList = typeOfOrder(pokemons_card, order)
//           .filter( ({ name }) => testSearch(name) )
//           .slice(0, INCREASEAMOUNT)

//           // setAmount(INCREASEAMOUNT)
//           setPokemonList([...newList])
//           setSecondFilterOptions([])
//           setFetchedAll(false)


//         }
//         setSelectedFilter(``)
//     })()
//   },[firstFilterSelected])

//   useEffect(()=>{
//     (async()=>{
//       if(selectedFilter){
//         setIsLoading(true)
//         let data = await getPokemonListFiltered(firstFilterSelected, selectedFilter)
//         let data2 = data.map(e=>e.name)
//         let ordered = pokemons_card.filter(({ name }) => testSearch(name) && data2.includes(name))
//         // setAmount(
//         setPokemonList(typeOfOrder(ordered, order))
//         setFetchedAll(true)
//       }
      
//       setIsLoading(false)
//     })()
//   },[selectedFilter])

  // async function searchPokemon(){
  //   setIsLoading(true)
  //   if(firstFilterSelected && selectedFilter){
      
  //     let data = await getPokemonListFiltered(firstFilterSelected, selectedFilter)
  //     let names = data.map(e=>e.name)
  //     let ordered = pokemons_card.filter(({ name }) => testSearch(name) && names.includes(name))
  //     setPokemonList(typeOfOrder(ordered, order))

  //     // newList = pokemonList.filter(({name}) => testSearch(name)) 
  //   }else{

  //     setFetchedAll(false)
  //     let newList = typeOfOrder(pokemons_card, order) 
  //     .filter(({name}) => testSearch(name))
  //     .slice(0, INCREASEAMOUNT)
  //     // setAmount(INCREASEAMOUNT)
  //     setPokemonList(typeOfOrder(newList, order))
  //   }
  //   setIsLoading(false)



  // }

  return(
    <>
    <Outlet/>
      <div className="container">
        <Header
        typeOfOrder={typeOfOrder}
        fetchedAll={fetchedAll}
        setFetchedAll={setFetchedAll}
        order={order}
        setOrder={setOrder}
        pokemonList={pokemonList}
        setPokemonList={setPokemonList}
        setIsLoading={setIsLoading}
        
        />
        {/* 
        <header>
          <div className="first-half">

            <Searcher 
            setSearch={setSearch} 
            search={search}
            searchPokemon={searchPokemon}
            />
            <Ordenator
            order={order}
            setOrder={setOrder}
            />
          </div>
          <div className="second-half">

            <Filter
            firstFilterSelected={firstFilterSelected}
            setFirstFilterSelected={setFirstFilterSelected}
            setSecondFilterOptions={setSecondFilterOptions}
            />

            {!!secondFilterOptions?.length && 
            <SecondFilter
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
            optionsList={secondFilterOptions}
            />}
          </div>
        </header> 
        */}
        <div className="card-container">

          {isLoading?
          <Loader/>:
          pokemonList.length && pokemonList.map(pokemon=>
            (<Thumb 
            className="card"
            key={pokemon.name}
            pokemon={pokemon}
            />)
            )
            }
        </div>
          
      {!fetchedAll && <div onClick={increaseAmount}>carregar mais</div>}
      </div>
      </>
  )}

  
export default App;
