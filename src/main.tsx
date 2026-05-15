import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { Preloader } from './components/Preloader'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Preloader />
    <App />
  </BrowserRouter>,
)
