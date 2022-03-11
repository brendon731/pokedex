const ob ={
    bug: 0.5,
    dragon: 0.5,
    fire: 0.5,
    flying: 0.5,
    grass: 1,
    poison: 0.25,
    steel: 0,
    ground: 1,
    rock: 1,
    water: 2,
    ghost: 0.5,
    fairy: 2
   }
let newob = {}
 let a = Object.keys(ob)
 console.log(a)
 
a.forEach(type=>{
    if(newob.hasOwnProperty(`${ob[type]}x`)){
        newob[`${ob[type]}x`].push(type) 
    }else{
        newob[`${ob[type]}x`] = []
    }
})

console.log(Object.keys(newob).sort())