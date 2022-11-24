import {useState, useEffect} from "react"
import { Searcher } from "../search"
import { Ordenator } from "../ordenator"
import { Filter } from "../filter"
import { SecondFilter } from "../secondFilter";
import pokemons_card from "../../data-pokemon-card.json"
// import styles from "./header.modules.css"
import {Head} from "./styles"
const INCREASEAMOUNT = 20

export function Header(
    {typeOfOrder,
    fetchedAll,
    setFetchedAll,
    order,
    pokemonList,
    setPokemonList,
    setIsLoading,
    setOrder
}
     ){

    const [firstFilterSelected, setFirstFilterSelected] = useState("")
    const [secondFilterOptions, setSecondFilterOptions] = useState([])
    const [selectedFilter, setSelectedFilter] = useState("")
    const [search, setSearch] = useState("")

    async function getPokemonListFiltered(url, category){
        let teste = await fetch(`https://pokeapi.co/api/v2/${url}/${category}`,{
        mode:"cors"
        })
        let teste2 = await teste.json()
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
    
    function testSearch(title){
        if(!search) return true
        const regex = new RegExp(search, "i")
        return regex.test(title)
    }
    
    useEffect(()=>{
      let newList = []
      if(fetchedAll){
        newList = 
        typeOfOrder([...pokemonList], order)
        .filter( ({ name }) => testSearch(name) )
  
        setPokemonList([...newList])
  
      }else{
          newList = typeOfOrder([...pokemons_card], order)
          .filter( ({ name }) => testSearch(name) )
          .slice(0, INCREASEAMOUNT)
  
          setPokemonList([...newList])
      }
      
    },[order])
    
  useEffect(()=>{
      (async()=>{
        if(firstFilterSelected){
  
            let data = await getPokemonListFilter(firstFilterSelected)
            setSecondFilterOptions(data)
            
          }else{
  
            const newList = typeOfOrder(pokemons_card, order)
            .filter( ({ name }) => testSearch(name) )
            .slice(0, INCREASEAMOUNT)
  
            setPokemonList([...newList])
            setSecondFilterOptions([])
            setFetchedAll(false)
  
  
          }
          setSelectedFilter(``)
      })()
    },[firstFilterSelected])
  
    useEffect(()=>{
      (async()=>{
        if(selectedFilter){
          setIsLoading(true)
          let data = await getPokemonListFiltered(firstFilterSelected, selectedFilter)
          let data2 = data.map(e=>e.name)
          let ordered = pokemons_card.filter(({ name }) => testSearch(name) && data2.includes(name))
          setPokemonList(typeOfOrder(ordered, order))
          setFetchedAll(true)
        }
        
        setIsLoading(false)
      })()
    },[selectedFilter])
  
    async function searchPokemon(){
      setIsLoading(true)
      if(firstFilterSelected && selectedFilter){
        
        let data = await getPokemonListFiltered(firstFilterSelected, selectedFilter)
        let names = data.map(e=>e.name)
        let ordered = pokemons_card.filter(({ name }) => testSearch(name) && names.includes(name))
        setPokemonList(typeOfOrder(ordered, order))
  
      }else{
  
        setFetchedAll(false)
        let newList = typeOfOrder(pokemons_card, order) 
        .filter(({name}) => testSearch(name))
        .slice(0, INCREASEAMOUNT)
        setPokemonList(typeOfOrder(newList, order))
      }
      setIsLoading(false)
  
  
  
    }
    return(
    <Head>

        <div className="first_half">
            <div className="container">
                <Searcher 
                setSearch={setSearch} 
                search={search}
                searchPokemon={searchPokemon}
                />
            </div>
        </div>
        <div className="second_half">
            
            <div className="container">

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
                <Ordenator
                order={order}
                setOrder={setOrder}
                />
            </div>
        </div>

    </Head>
    )
}