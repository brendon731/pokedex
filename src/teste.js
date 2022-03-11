const scrip = require('./scrip.json')
function getDefenseAndAttack({attack, defense}){
    let attack_array = Object.keys(attack)
    let defense_array = Object.keys(defense)

    let attack_and_defense = {
        attack:{},
        defense:{}
    }

    attack_array.forEach(type=>{
        if(attack_and_defense.attack.hasOwnProperty(`${attack[type]}`)){
            attack_and_defense.attack[`${attack[type]}`].push(type) 
        }else{
            attack_and_defense.attack[`${attack[type]}`] = [type]
        }
    })
    defense_array.forEach(type=>{
        if(attack_and_defense.defense.hasOwnProperty(`${defense[type]}`)){
            attack_and_defense.defense[`${defense[type]}`].push(type) 
        }else{
            attack_and_defense.defense[`${defense[type]}`] = [type]
        }
    })

    return attack_and_defense
}
export function getMultipliers(tp) {
    const types = tp
    var multipliers = {
        defense: {},
        attack: {}
    }
    types.forEach( (type) => {
        var damage_relations = scrip[type]
        var no_damage_to = damage_relations.attack.zero
        var no_damage_from = damage_relations.defense.zero
        var half_damage_to = damage_relations.attack.half
        var half_damage_from = damage_relations.defense.half
        var double_damage_to = damage_relations.attack.double
        var double_damage_from = damage_relations.defense.double
        no_damage_to.forEach((type) => {
          if(multipliers.attack.hasOwnProperty(type)){multipliers.attack[type] = multipliers.attack[type] * 0}
          else{multipliers.attack[type] = 0}
        })
        no_damage_from.forEach((type) => {
          if(multipliers.defense.hasOwnProperty(type)){multipliers.defense[type] = multipliers.defense[type] * 0}
          else{multipliers.defense[type] = 0}
        })
        half_damage_to.forEach((type) => {
          if(multipliers.attack.hasOwnProperty(type)){multipliers.attack[type] = multipliers.attack[type] * 0.5}
          else{multipliers.attack[type] = 0.5}
        })
        half_damage_from.forEach((type) => {
          if(multipliers.defense.hasOwnProperty(type)){multipliers.defense[type] = multipliers.defense[type] * 0.5}
          else{multipliers.defense[type] = 0.5}
        })
        double_damage_to.forEach((type) => {
          if(multipliers.attack.hasOwnProperty(type)){multipliers.attack[type] = multipliers.attack[type] * 2}
          else{multipliers.attack[type] = 2}
        })
        double_damage_from.forEach((type) => {
          if(multipliers.defense.hasOwnProperty(type)){multipliers.defense[type] = multipliers.defense[type] * 2}
          else{multipliers.defense[type] = 2}
        })
    })
    return getDefenseAndAttack(multipliers)
}


/*
let {attack, defense} = getMultipliers(["grass", "poison"])
let keys_attack = Object.entries(attack)
let keys_defense = Object.entries(defense)
console.log(keys_defense, keys_attack)

console.log("--------")
keys_attack.forEach(e=>{
    console.log(e[0])
    e[1].forEach(type=>{
        console.log(type)
    })
    console.log("----------")
})
console.log(keys_attack.sort())
*/



