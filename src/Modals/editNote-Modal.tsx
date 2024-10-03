import React, { useState } from 'react';
import { z } from 'zod';
import Alert_Modal from './Warning-Modal'; //Importamos el modal de advertencia

// Interfaz para las notas (props)
interface Note {
    title: string;
    description: string;
    category: string;
    panel: number;
    backgroundColor: string;
}  

//Interfaz --> props para el modal
interface ModalProps {
    note: Note; // Pasamos la nota que se va a editar
    onClose: () => void; // Función para cerrar el modal
    onSave: (updatedNote: Note) => void; // Función para guardar la nota editada
}

//Esquema de validación con Zod
const noteSchema = z.object({
    title: z.string().min(1, 'El título es obligatorio'),
    description: z.string().min(1, 'La nota es obligatoria'),
    category: z.string(),
    panel: z.number(),
});  

//Renderizamos los elementos del modal --> Panel de Agregar notas
const EditNote_Modal: React.FC<ModalProps> =({ note, onClose, onSave }) => {
    const [title, setTitle] = useState(note.title);
    const [description, setDescription] = useState(note.description);
    const [category, setCategory] = useState(note.category);
    const [panel, setPanel] = useState(note.panel);
    const [isAlertVisible, setAlertVisible] = useState(false); //Estado para mostrar el modal de advertencia

    // Función para cerrar la alerta
    const handleAcceptAlert = () => {
        setAlertVisible(false); //Cerramos el modal de advertencia
    };

    //Función para el botón Save
    const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('¡Botón Guardar Nota Clickeado!', event);
        try {
            // Validamos los datos usando Zod
            const validatedNote = noteSchema.parse({
                title,
                description,
                category: category || 'Sin categoría', //Si está vacío, asignamos "Sin categoría" por defecto
                panel,
            });
      
            // Llamamos a la función onSave con la nota actualizada, preservando el backgroundColor
            onSave({
                ...note,
                ...validatedNote,
            });
            onClose();
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.log('Errores de validación:', error.errors);
                //Si hay errores de validación, mostramos el modal de advertencia
                setAlertVisible(true);
            }
        }
    };

    //Función para el botón Save
    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('¡Botón Cancelar Nota Clickeado!', event);
        onClose(); //Llamamos a la función pasada desde App.tsx
    }

    return (
        <div className='addNote-Modal'>
            <div className='modalNN'>
                {/*header del Modal*/}
                <div className='header-modalNN'>
                    <button className="btnAN-save" onClick={handleSave}>Guardar
                        <span className="material-symbols-outlined iconbtn-modal">save</span>
                    </button>
                    <button className="btnAN-cancel" onClick={handleClose}>Cancelar
                        <span className="material-symbols-outlined iconbtn-modal">cancel</span>
                    </button>
                </div>

                {/*Cuerpo del Modal*/}
                <div className='body-modalNN'>
                    <label className='label-modalNN'>-- Vista del panel --</label>
                    <div>
                        <select className='select-modalNN' aria-label='panel-select' value={panel} onChange={(e) => setPanel(Number(e.target.value))}>
                            <option value="1">Panel 1</option>
                            <option value="2">Panel 2</option>
                            <option value="3">Panel 3</option>
                            <option value="4">Panel 4</option>
                        </select>
                    </div>
                    <label className='label-modalNN'>Categoría</label>
                    <div className='container-input-modalNN'>
                        <input className='input-modalNN' type='text'  value={category} onChange={(e) => setCategory(e.target.value)} placeholder='+ Sin Especificar'/>
                    </div>
                    <label className='label-modalNN'>Título *</label>
                    <div className='container-input-modalNN'>
                        <input className='input-modalNN' type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Añadir Título' autoFocus/>
                    </div>
                    <label className='label-modalNN'>Nota *</label>
                    <div className='container-input-modalNN'>
                        <textarea className='textarea-modalNN' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Añadir Nota'></textarea>
                    </div>
                </div>
            </div>
            {/* Modal de advertencia si hay errores */}
            {isAlertVisible && <Alert_Modal Accept={handleAcceptAlert} />}
        </div>       
    );
};

export default EditNote_Modal;