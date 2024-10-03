import { useState, useEffect } from 'react';
import './App.css';
import NewNote_Modal from './Modals/newNote-Modal';//Componente del modal --> Panel de Agregar notas
import Alert_Modal from './Modals/Alert-Modal';//Componente del modal de alerta
import EditNote_Modal from './Modals/editNote-Modal';//Componente del modal para editar notas

//Interfaz para las notas (props)
interface Note {
  title: string;
  description: string;
  category: string;
  panel: number;
  backgroundColor: string;//Agregamos el color de fondo a las notas
}

//Función para generar un color pastel aleatorio
const generateRandomPastelColor = () => {
  const r = Math.floor(Math.random() * 106 + 150);//Valor entre 150 y 255
  const g = Math.floor(Math.random() * 106 + 150);
  const b = Math.floor(Math.random() * 106 + 150);
  return `rgb(${r}, ${g}, ${b})`;
};

function App() {
  //Estado para manejar la visibilidad del modal al iniciar la página
  const [isModalVisible, setModalVisible] = useState(false);//Oculta el modal de agregar notas
  const [isAlertVisible, setAlertVisible] = useState(false);//Oculta el modal de confirmación
  const [isEditModalVisible, setEditModalVisible] = useState(false);//Oculta el modal de edición al cargar la página
  const [isExpanded, setExpanded] = useState(true);//Muestra el diseño expandido al renderizar la página
  //Almacena la función que debe ejecutarse después de confirmar la acción
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});

  //Estados para almacenar las notas de cada panel
  const [panel1Notes, setPanel1Notes] = useState<Note[]>([]);
  const [panel2Notes, setPanel2Notes] = useState<Note[]>([]);
  const [panel3Notes, setPanel3Notes] = useState<Note[]>([]);
  const [panel4Notes, setPanel4Notes] = useState<Note[]>([]);

  //Estado para la nota que está siendo editada
  const [noteBeingEdited, setNoteBeingEdited] = useState<Note | null>(null);

  //Cargar las notas desde localStorage cuando el componente se monte
  useEffect(() => {
    const storedPanel1Notes = localStorage.getItem('panel1Notes');
    const storedPanel2Notes = localStorage.getItem('panel2Notes');
    const storedPanel3Notes = localStorage.getItem('panel3Notes');
    const storedPanel4Notes = localStorage.getItem('panel4Notes');

    if (storedPanel1Notes) setPanel1Notes(JSON.parse(storedPanel1Notes));
    if (storedPanel2Notes) setPanel2Notes(JSON.parse(storedPanel2Notes));
    if (storedPanel3Notes) setPanel3Notes(JSON.parse(storedPanel3Notes));
    if (storedPanel4Notes) setPanel4Notes(JSON.parse(storedPanel4Notes));
  }, []);

  //Guardar las notas en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('panel1Notes', JSON.stringify(panel1Notes));
    localStorage.setItem('panel2Notes', JSON.stringify(panel2Notes));
    localStorage.setItem('panel3Notes', JSON.stringify(panel3Notes));
    localStorage.setItem('panel4Notes', JSON.stringify(panel4Notes));
  }, [panel1Notes, panel2Notes, panel3Notes, panel4Notes]);

  //Función del botón new note, para mostrar el modal al hacer clic
  const handleaddNote = (event: React.MouseEvent<HTMLButtonElement>) => {
    setModalVisible(true), event; //Muestra el modal al hacer clic
  };

  //Función que se ejecuta cuando se guarda una nueva nota
  const handleSaveNote = (newNote: Omit<Note, 'backgroundColor'>) => {
    const noteWithColor = { ...newNote, backgroundColor: generateRandomPastelColor() };//Generamos color al guardar
    switch (newNote.panel) {
      case 1:
        setPanel1Notes([...panel1Notes, noteWithColor]);
        break;
      case 2:
        setPanel2Notes([...panel2Notes, noteWithColor]);
        break;
      case 3:
        setPanel3Notes([...panel3Notes, noteWithColor]);
        break;
      case 4:
        setPanel4Notes([...panel4Notes, noteWithColor]);
        break;
      default:
        break;
    }
  };

  //Función para abrir el modal de edición y cargar los datos de la nota
  const handleeditNote = (note: Note) => {
    setNoteBeingEdited(note);//Establece la nota que se va a editar
    setEditModalVisible(true);//Muestra el modal de edición
  };

  //Función que se ejecuta cuando se actualiza una nota
  const handleUpdateNote = (updatedNote: Note) => {
    const moveNoteToNewPanel = (oldPanel: number, newPanel: number) => {
      //Eliminar la nota del panel original
      switch (oldPanel) {
        case 1:
          setPanel1Notes(panel1Notes.filter(note => note !== noteBeingEdited));
          break;
        case 2:
          setPanel2Notes(panel2Notes.filter(note => note !== noteBeingEdited));
          break;
        case 3:
          setPanel3Notes(panel3Notes.filter(note => note !== noteBeingEdited));
          break;
        case 4:
          setPanel4Notes(panel4Notes.filter(note => note !== noteBeingEdited));
          break;
        default:
          break;
      }

      //Añadir la nota al nuevo panel
      switch (newPanel) {
        case 1:
          setPanel1Notes([...panel1Notes, updatedNote]);
          break;
        case 2:
          setPanel2Notes([...panel2Notes, updatedNote]);
          break;
        case 3:
          setPanel3Notes([...panel3Notes, updatedNote]);
          break;
        case 4:
          setPanel4Notes([...panel4Notes, updatedNote]);
          break;
        default:
          break;
      }
    };

    //Si el panel ha cambiado, mover la nota al nuevo panel
    if (noteBeingEdited && updatedNote.panel !== noteBeingEdited.panel) {
      moveNoteToNewPanel(noteBeingEdited.panel, updatedNote.panel);
    } else {
      //Si el panel no cambió, actualizar la nota en el mismo panel
      const updateNotes = (notes: Note[]) => notes.map(note => note === noteBeingEdited ? updatedNote : note);

      switch (updatedNote.panel) {
        case 1:
          setPanel1Notes(updateNotes(panel1Notes));
          break;
        case 2:
          setPanel2Notes(updateNotes(panel2Notes));
          break;
        case 3:
          setPanel3Notes(updateNotes(panel3Notes));
          break;
        case 4:
          setPanel4Notes(updateNotes(panel4Notes));
          break;
        default:
          break;
      }
    }

    setEditModalVisible(false);//Oculta el modal de edición
    setNoteBeingEdited(null);//Limpia el estado de la nota editada
  };

  //Función para borrar todas las notas de un panel
  const handleDeleteAll = (panel: number) => {
    switch (panel) {
      case 1:
        setPanel1Notes([]);
        break;
      case 2:
        setPanel2Notes([]);
        break;
      case 3:
        setPanel3Notes([]);
        break;
      case 4:
        setPanel4Notes([]);
        break;
      default:
        break;
    }
  };

  //Función para eliminar una nota específica
  const handleDeleteNote = (panel: number, index: number) => {
    switch (panel) {
      case 1:
        setPanel1Notes(panel1Notes.filter((_, i) => i !== index));
        break;
      case 2:
        setPanel2Notes(panel2Notes.filter((_, i) => i !== index));
        break;
      case 3:
        setPanel3Notes(panel3Notes.filter((_, i) => i !== index));
        break;
      case 4:
        setPanel4Notes(panel4Notes.filter((_, i) => i !== index));
        break;
      default:
        break;
    }
  };

  //Función para cerrar el modal
  const handleCloseModal = () => {
    setModalVisible(false); //Cierra el modal al hacer clic
  };

  //Función para mostrar el modal de confirmación y establecer la acción a confirmar
  const showAlert = (action: () => void) => {
    setConfirmAction(() => action);//Guardamos la acción que se debe confirmar
    setAlertVisible(true);//Mostramos el modal de confirmación
  };

  //Función para confirmar la eliminación
  const confirmDelete = () => {
    confirmAction();//Ejecutamos la acción guardada
    setAlertVisible(false);//Cerramos el modal de confirmación
  };

  //Función para cerrar el modal de confirmación
  const closeAlert = () => {
    setAlertVisible(false);//Cerramos el modal de confirmación
  };

  //Función para manejar el estado expandido
  const handleExpandToggle = () => {
    setExpanded(!isExpanded);
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
      {isModalVisible && <NewNote_Modal onClose={handleCloseModal} onSave={handleSaveNote}/>}{/*Añadimos la función onClose del modal en el archivo newNote-Modal.tsx*/}
      
      {/* Modal para editar notas */}
      {isEditModalVisible && noteBeingEdited && (
        <EditNote_Modal
          note={noteBeingEdited}
          onClose={() => setEditModalVisible(false)}
          onSave={handleUpdateNote}
        />
      )}

      {/* Renderiza el modal de confirmación */}
      {isAlertVisible && <Alert_Modal closeAlert={closeAlert} confirmDelete={confirmDelete} />}{/*Añadimos las funciones de los botones del Alert-Modal.tsx}*/}

      {/*Panel para visualizar las notas agregadas*/}
      <p className='title-container'>Tus notas</p>
      <div className='panel-container'>
        {[{ panel: 1, notes: panel1Notes }, { panel: 2, notes: panel2Notes }, { panel: 3, notes: panel3Notes }, { panel: 4, notes: panel4Notes }].map(({ panel, notes }) => (
          <div key={panel} className='panel-content'>
            <h2 className='title-panel'>Panel {panel}</h2>
            {notes.length > 0 && (
              <div className='container-btn-panel'>
                <div className='tooltip'>
                  <span className='tooltip-btnNote'>Borrar todo</span>
                  <button className='btn-delete-all' onClick={() => showAlert(() => handleDeleteAll(panel))}>
                    <span className='material-symbols-outlined'>delete</span>
                  </button>
                </div>
              </div>
            )}
            {notes.length > 0 && (
               <div className={`expanded-view ${isExpanded ? 'container-note' : ''}`}>
                {notes.map((note, index) => (
                  <div className='card-note' key={index}>
                    <div className='tooltip-note'>
                      <h3 className='tooltip-card'>{note.title}</h3>
                      <div className='body-note' style={{ backgroundColor: note.backgroundColor }}>
                        <div className='header-note'>
                          <div className='tooltip'>
                            <span className='tooltip-btnNote'>Editar</span>
                            <button className='btn-note-edit' onClick={() => handleeditNote(note)}>
                              <span className="material-symbols-outlined">edit_note</span>
                            </button>
                          </div>
                          <div className='tooltip'>
                            <span className='tooltip-btnNote'>Eliminar</span>
                            <button className='btn-note-delete' onClick={() => showAlert(() => handleDeleteNote(panel, index))}>
                              <span className='material-symbols-outlined'>delete</span>
                            </button>
                          </div>
                        </div>
                        <div className='text-note'>
                          <h3>{note.title}</h3>
                        </div>
                        <div className='text-note'>
                          <p className='text-small-note'>{note.description}</p>
                        </div>
                        <div className='text-note'>
                          <p className='text-small-note'>{note.category}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                  {/* Botón para alternar la vista expandida */}
                  <div className='container-expand'>
                    <button className='btn-expand' onClick={handleExpandToggle}>
                      <span className="material-symbols-outlined">
                        {isExpanded ? 'arrow_drop_down' : 'arrow_drop_up'}
                      </span>
                    </button>
                  </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;