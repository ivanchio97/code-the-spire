import { useState } from 'react'
import './App.css'
import Game from './views/Game'
import { GameProvider } from './context/GameContext'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Rewards from './views/Rewards'

function App() {
  const [count, setCount] = useState(0)

  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Game />} />
          <Route path='/rewards' element={<Rewards />}  />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  )
}

export default App
