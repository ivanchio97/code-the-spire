import { useContext } from "react"
import { GameContext } from "../context/GameContext"
import '../styles/Profile.css'
import Bar from "./Bar"

function Profile(){

  const [data, setData] = useContext(GameContext)

  return(
    <div className='profile'>
      <div className='playerImage'>
        <div className='emoji'>😎</div>
      </div>
      <div className='playerInfo'>
        <h2> ❤ {data.health}</h2>
        <p className="level">Nivel: {data.level}</p>
      </div>
    </div>
  )
}
export default Profile