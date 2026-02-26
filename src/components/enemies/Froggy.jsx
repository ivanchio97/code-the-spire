import { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import ranita from '../../assets/enemies/ranita.png'
import '../../styles/Game.css'
import Bar from '../Bar'
import { GameContext } from "../../context/GameContext"
import { toast } from 'react-toastify'

const Froggy = ({ id, combatEvent, setAttakedPlayer, setDanioJugador }) => {

  const navigate = useNavigate()
  const [data, setData] = useContext(GameContext)
  const [multi, setMulti] = useState(1)

  // 👉 estado lógico
  const [hp, setHp] = useState(5 + (5*data.level))
  const [maxHp, setMaxHp] = useState(hp)
  const [block, setBlock] = useState(0)

  // 👉 intención del enemigo
  const [intent, setIntent] = useState("❓")
  const [desc, setDesc] = useState("")

  // 👉 estados visuales (mantienen tus animaciones actuales)
  const [pegando, setPegando] = useState(false)
  const [animation, setAnimation] = useState(false)
  const [danio, setDanio] = useState(0)

  const actions = ["🛡","⚔","❓"]

  // 🎯 IA del enemigo por turno
  useEffect(()=>{

    const ran = Math.floor(Math.random()*actions.length)
    const actual = actions[ran]

    if(data.turn % 2 === 1){
      // turno del jugador → enemigo decide intención
      setIntent(actual)

      if(actual === "🛡") setDesc("El enemigo ganará bloqueo")
      else if(actual === "⚔") setDesc("El enemigo te atacará")
      else setDesc("El enemigo aplicará un efecto")
    }
    else{
      // turno del enemigo → ejecuta acción

      if(intent === "⚔"){
        const atk = Math.floor(Math.random()*5 * multi ) + data.level

        setPegando(true)
        setAttakedPlayer(true)
        setDanioJugador(atk)
        setData(prev => {
          let dmg = atk
          let playerBlock = prev.block || 0

          if(playerBlock > 0){
            const absorbed = Math.min(playerBlock, dmg)
            playerBlock -= absorbed
            dmg -= absorbed
          }

          return {
            ...prev,
            block: playerBlock,
            health: prev.health - dmg,
            hurted: true,
            turn: prev.turn + 1
          }
        })
      }

      if(intent === "🛡"){
        const def = ( Math.floor(Math.random()*10) + 18 ) + data.level
        setBlock(b => b + def)
        setData(prev => ({ ...prev, turn: prev.turn + 1 }))
      }
      if(intent === "❓"){
        toast.warning(`El enemigo eleminó tu bloqueo!`,{theme:'dark'})
        setData(prev => ({ 
          ...prev, 
          block:0,
          turn: prev.turn + 1 
        }))
      }
    }

  },[data.turn])

  // 🎯 recibe daño del jugador
  useEffect(()=>{

    if(!combatEvent) return
    if(combatEvent.target !== id) return
    if(combatEvent.type !== "attack") return

    let dmg = combatEvent.value

    // aplicar bloqueo primero
    if(block > 0){
      const absorbed = Math.min(block, dmg)
      setBlock(b => b - absorbed)
      dmg -= absorbed
    }

    // aplicar vida restante
    if(dmg > 0){
      setHp(h => h - dmg)
    }
    

    // animaciones actuales intactas
    setDanio(combatEvent.value)
    setAnimation(true)

  },[combatEvent])

  useEffect(()=>{
    if(hp < 1){
      toast.success("¡Has derrotado al enemigo!",{
        theme:"dark"
      })
      navigate("/rewards")
    }
  },[hp])

  return(
    <div className="enemy" title={desc} onAnimationEnd={()=>setPegando(false)}>

      <Bar hp={hp} maxHp={maxHp} block= {block} />

      <div>{intent}</div>

      <img src={ranita} alt="" className={pegando ? "pegarEnemigo" : ""} />

      <p
        className={animation ? "damage damageUp" : "damage"}
        onAnimationEnd={()=>setAnimation(false)}
      >
        {danio}
      </p>

    </div>
  )
}

export default Froggy