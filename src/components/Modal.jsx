import { useContext, useEffect, useState } from "react"
import {GameContext} from '../context/GameContext.jsx'
import '../styles/Modal.css'
import { toast } from "react-toastify"

const Modal = ({setShowModal}) =>{

  const [data, setData] = useContext(GameContext)
  const [pregunta, setPregunta] = useState("")
  const [respuesta, setRespuesta] = useState("")
  const [variable, setVariable] = useState("")
  const [variable2, setVariable2] = useState("")
  const [num, setNum] = useState(0)
  const [input, setInput] = useState("")
  const [value, setValue] = useState("")
  const letters = ["x","w","z"]
  const any = ""
  
  useEffect(()=>{
    generar()
  },[])
 

  function generar(){

    const varr =  letters[Math.floor(Math.random()*letters.length)]
    const valuu = Math.floor(Math.random()*12)+1

    const info = {
      questions: [
        `Escribe el código para crear una variable llamada ${varr} con el valor ${valuu}`,
        `Escribe el código para mostrar en pantalla el valor de la variable ${varr}`,
        `Escribe el código para solicitar al usuario un texto y guardarlo en la variable ${varr}`,
        `Escribe el código para solicitar al usuario un número entero y guardarlo en la variable ${varr}`,
        `Escribe el código para solicitar al usuario un número decimal y guardarlo en la variable ${varr}`,
        `Escribe el código para aumentar en ${valuu} el valor de una variable llamada ${varr}`
      ],
    
      answers: [
        `${varr} = ${valuu}`,
        `print(${varr})`,
        `${varr}=input("${any}")`,
        `${varr}=int(input("${any}"))`,
        `${varr}=float(input("${any}"))`,
        `${varr}=${varr}+${valuu}`
      ]
    }

    const rand = Math.floor(Math.random()*info.questions.length)
    setVariable(varr) 
    setValue(valuu)                   
    setPregunta(info.questions[rand])
    setRespuesta(info.answers[rand])
    setNum(rand)

    
  }

  function comprobar(){
    const t1 = respuesta.replace(/\s/g, "")
    const t2 = input.replace(/\s/g, "")
    let corregido = t2
    console.clear()
    console.log(t1)
    console.log(t2)

    if(num == 2){
      const parte1 = t2.slice(0,9)
      const parte2 = t2.slice(-2)
      console.log(parte1+parte2)
      corregido = parte1+parte2
    }
    else if(num == 3){
      const parte1 = t2.slice(0,13)
      const parte2 = t2.slice(-3)
      console.log(parte1+parte2)
      corregido = parte1+parte2
    }
    else if(num == 4){
      const parte1 = t2.slice(0,15)
      const parte2 = t2.slice(-3)
      console.log(parte1+parte2)
      corregido = parte1+parte2
    }

    if(t1 === corregido){
      setData((prev)=>({
        ...prev,
        energy: prev.energy + 1
      }))
      toast.success("¡Has ganado +1 de energía!",{
        theme:'dark'
      })
      setShowModal(false)
    }
    else{
      toast.error("¡Incorrecto!, vuelve a intentarlo",{
        theme:'dark'
      })
      setShowModal(false)
    }
  }

  return(
    <div className='modalito'>
      <div className='window'>
        <h3>{pregunta}</h3>
        <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} placeholder='Respuesta...' />
        <div className='modalButtons'>
          <button onClick={comprobar}>Verificar</button>
          <button onClick={()=>setShowModal(false)}>Cerrar</button>
        </div>

      </div>
      
    </div>
  )
}
export default Modal