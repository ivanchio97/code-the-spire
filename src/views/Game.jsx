import { useContext, useState, useEffect } from 'react'
import Profile from '../components/Profile'
import rojo from '../assets/rojo.png'
import '../styles/Game.css'
import Modal from '../components/Modal'
import Bee from '../components/enemies/Bee'
import Fire from '../components/enemies/FireSlime'
import Bar from '../components/Bar'
import { GameContext } from '../context/GameContext'
import { toast } from 'react-toastify'
import Froggy from '../components/enemies/Froggy'

function Game(){

  const [data, setData] = useContext(GameContext)

  const [showModal, setShowModal] = useState(false)

  // 👉 lista escalable de enemigos
  const enemigos = [
    { id: "bee", component: Bee, name: "Abeja" },
    { id: "fire", component: Fire, name: "Slime de fugeo"},
    { id: "froggy", component: Froggy, name: "Ranita" }
  ]
  

  // 👉 enemigo actual
  const [actualEnemy, setActualEnemy] = useState(null)

  // 👉 evento de combate
  const [combatEvent, setCombatEvent] = useState(null)

  // 👉 animaciones jugador
  const [animPlayerAttack, setAnimPlayerAttack] = useState(false)
  const [attakedPlayer, setAttakedPlayer] = useState(false)
  const [danioJugador, setDanioJugador] = useState(0)
  //inicializar combate

  // 👉 elegir enemigo aleatorio al cargar
  useEffect(() => {
    const random = Math.floor(Math.random() * enemigos.length)
    setActualEnemy(enemigos[random])
  }, [])

  useEffect(()=>{
    if(data.health < 1){
      alert("HAS PERDIDO. Reiniciando juego....")
      window.location.reload();
    }
  },[data.health])

  function pasar(){
    setData(prev => ({
      ...prev,
      turn: prev.turn + 1,
      energy: 0,
      attempts: prev.maxEnergy
    }))
  }

  function atacar(){
    if(data.energy < 1 || !actualEnemy) return

    const value = Math.floor(Math.random()*data.maxATK) + data.minATK
    setAnimPlayerAttack(true)

    setCombatEvent({
      type: "attack",
      source: "player",
      target: actualEnemy.id,
      value
    })

    setData(prev => ({
      ...prev,
      energy: prev.energy - 1
    }))
  }

  function defender(){
    if(data.energy < 1) return

    const block = Math.floor(Math.random()*data.maxDEF) + data.minDEF

    toast.info(`Has ganado ${block} de bloqueo!`, { theme:'dark' })

    setData(prev => ({
      ...prev,
      block: (prev.block || 0) + block,
      energy: prev.energy - 1
    }))
  }

  function curar(){
    if(data.energy < 2) return

    const heal = 5

    setData(prev => ({
      ...prev,
      health: Math.min(prev.maxHealth, prev.health + heal),
      energy: prev.energy - 2
    }))
  }

  function resetPlayerAnim(){
    setAnimPlayerAttack(false)
  }

  function restarIntento(){
    if (data.attempts > 0){
      setShowModal(true)
      setData(prev => ({
        ...prev,
        attempts: prev.attempts - 1
      }))
    }
  }

  return(
    <div className='game' >

      <Profile />

      <main>

        {/* PLAYER */}
        <div className={data.hurted ? "player hurt" : "player"}>

          <Bar hp={data.health} maxHp={data.maxHealth} block={data.block} />

          <img
            src={rojo}
            alt=""
            className={animPlayerAttack ? "pegarJugador" : ""}
            onAnimationEnd={resetPlayerAnim}
          />

          <p
            className={attakedPlayer ? "damage damageUp" : "damage"}
            onAnimationEnd={()=>setAttakedPlayer(false)}
          >
            {danioJugador}
          </p>

        </div>

        {/* ENEMY */}
        <div className='enemies'>
          {actualEnemy && (
            <actualEnemy.component
              id={actualEnemy.id}
              combatEvent={combatEvent}
              setAttakedPlayer={setAttakedPlayer}
              setDanioJugador={setDanioJugador}
            />
          )}
        </div>

      </main>

      <div className='ground'></div>

      {/* ACTIONS */}
      <div className='actions'>

        <div className='energy' onClick={restarIntento}>
          {data.energy}
        </div>

        <div><span className='cost'>1</span><button onClick={atacar}>⚔</button></div>
        <div><span className='cost'>1</span><button onClick={defender}>🛡</button></div>
        <div><span className='cost'>2</span><button onClick={curar}>💖</button></div>
        <div><span className='cost'>0</span><button onClick={pasar}>🔚</button></div>

      </div>

      {showModal && <Modal setShowModal={setShowModal}/>}

      <div className='attempts' onClick={restarIntento} >Intentos: {data.attempts}</div>

    </div>
  )
}

export default Game