import {Children, createContext, useState} from 'react'

export const GameContext = createContext()

export function GameProvider({children}){
  
  const newGame = {
    name: "",
    level: 1,
    exp: 1,
    minATK: 1,
    maxATK: 5,
    minDEF: 1,
    maxDEF: 5,
    maxEnergy: 4,
    energy: 0,
    health: 70,
    maxHealth: 70,
    turn:1,
    attempts: 3,
    hurted: false,
    block: 0
  }
  const [data, setData] = useState(newGame)

  return(
    <GameContext.Provider value= {[data, setData]} >
      {children}
    </GameContext.Provider>
  )
}