import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { GameProvider } from './context/GameContext'
import { ScoreProvider } from './context/ScoreContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GameProvider>
        <ScoreProvider>
          <App />
        </ScoreProvider>
      </GameProvider>
    </BrowserRouter>
  </StrictMode>,
)
