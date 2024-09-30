import { useState } from 'react'
import './App.css'
import NewNote_Modal from './Modals/newNote-Modal'; //Componente del modal --> Panel de Agregar notas

function App() {
  //Estado para manejar la visibilidad del modal al iniciar la página
  const [isModalVisible, setModalVisible] = useState(false);

  //Función del botón new note, para mostrar el modal al hacer clic
  const handleaddNote = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('¡Botón Agregar Notas Clickeado!', event);
    setModalVisible(true);//Muestra el modal al hacer clic
  }
  
  //Función para cerrar el modal (se la pasaremos al modal del newNote-Modal.tsx)
  const handleCloseModal = () => {
    setModalVisible(false);//Cierra el modal al hacer clic
  };

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

      {/*Botón Agregar notas*/}
      <div className='container-btn'>
        {/* Botón para abrir el Panel de Agregar notas */}
        <button onClick={handleaddNote}>new note
          <span className="material-symbols-outlined iconbtn">add_notes</span>
        </button>
      </div>
      {/* Aquí controlamos si se muestra el modal */}
      {isModalVisible && <NewNote_Modal onClose={handleCloseModal} />}{/*Añadimos la función onClose del modal en el archivo newNote-Modal.tsx*/}

      {/*Panel para visualizar las notas agregadas*/}
    </>
  )
}

export default App