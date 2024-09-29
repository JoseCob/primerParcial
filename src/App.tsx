//import { useState } from 'react'
import './App.css'

function App() {
  //Aqui empiezan las funciones
  //const [count, setCount] = useState(0)

  return (
    <>
    {/*AppBar de la página*/}
      <nav>
        <ul>
          <li>
            <h2>¡Bienvenido!</h2>
          </li>
          <li className = "center-nav">
            <h1>NoteShiny</h1>
            <img alt="icon" className="imgNav" src="/src/assets/star_animated.gif"></img>
          </li>
        </ul>
      </nav>

    {/*Botón addNote */}
      <div className='container-btn'>
        {/* Botón para abrir el panel de las notas */}
        <button type='button'>new note
          <span className="material-symbols-outlined iconbtn">add_notes</span>
        </button>
      </div>
    </>
  )
}

export default App