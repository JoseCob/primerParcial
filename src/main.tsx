import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx' //Archivo de la página principal
import './index.css' //Estilos de los componentes

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)