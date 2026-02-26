import {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Profile from '../components/Profile'
import { GameContext } from '../context/GameContext'
import '../styles/Rewards.css'
import { toast } from 'react-toastify'

const Rewards = () => {
  const navigate = useNavigate()
  const [data, setData] = useContext(GameContext)
  const premios = [
    {
      id: 1,
      color: "#A13E39",
      emoji: "⚔",
      text: "⚔ +2 MAX y 1 MIN"
    },
    {
      id: 2,
      color: "#4280A0",
      emoji: "🛡",
      text: "🛡 +2 MAX y 1 MIN"
    },
    {
      id: 3,
      color: "#345303",
      emoji: "💖",
      text: "💖 +2 MAX y CURA +2"
    }
  ]
  const [rewards, setRewards] = useState(premios)

  function elegir(num){
    if(num == 1){
      toast.info("¡Recompensa elegida! ✨", {
        theme:"dark"
      })
      setData((prev)=>({
        ...prev,
        maxATK: prev.maxATK + 2,
        minATK:prev.minATK + 1,
        level: prev.level + 1,
        energy:0,
        attempts: prev.maxEnergy
      }))
      navigate("/")
    }
    else if(num == 2){
      toast.info("¡Recompensa elegida! ✨", {
        theme:"dark"
      })
      setData((prev)=>({
        ...prev,
        maxDEF: prev.maxDEF + 2,
        minDEF:prev.minDEF + 1,
        level: prev.level + 1,
        energy:0,
        attempts: prev.maxEnergy
      }))
      navigate("/")
    }
    else if(num == 3){
      toast.info("¡Recompensa elegida! ✨", {
        theme:"dark"
      })
      setData((prev)=>({
        ...prev,
        health: prev.health + 2, 
        maxHealth: prev.maxHealth + 2,
        level: prev.level + 1,
        energy:0,
        attempts: prev.maxEnergy
      }))
      navigate("/")
    }
  }

  return(
    <div className='game2'>
      <Profile />
      <div className='stats'>
        <h3 className='subiste'>¡Subiste de nivel!</h3>

          <div className="numbers">
            <p>⚔ ATK: {data.minATK}~{data.maxATK}</p>
            <p>🛡 DEF: {data.minDEF}~{data.maxDEF}</p>
            <p>💖 SALUD: {data.health}/{data.maxHealth}</p>
          </div>
          <h4 className='elige'>Elige una recompensa</h4>
          <div className="rewards">
          {
          rewards.map((element)=>{
            return(
              <button style={{backgroundColor:element.color}} 
                key={element.id} className='recompensa'
                onClick={()=>elegir(element.id)}
                >
                <div className='recompensaEmoji' >{element.emoji}</div>
                <p className='recompensaTexto'>{element.text}</p>
              </button>
              )
            })
          }
          </div>

      </div>

    </div>
  )
}
export default Rewards