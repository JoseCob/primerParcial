import React from 'react';

//Interfaz --> props para el modal
interface ModalProps{
    onClose: () => void; //Recibe la función de cierre desde App.tsx
}

//Renderizamos los elementos del modal --> Panel de Agregar notas
const NewNote_Modal: React.FC<ModalProps> =({onClose}) => {
    //Función para el botón Save
    const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('¡Botón Guardar Nota Clickeado!', event);
    }

    //Función para el botón Save
    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('¡Botón Cancelar Nota Clickeado!', event);
        onClose(); // Llamamos a la función pasada desde App.tsx
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
                        <span className="material-symbols-outlined iconbtn-modal">close</span>
                    </button>
                </div>
                <span className='tag-modalNN'>Etiquetas</span>
                <div className='btn-container-modalNN'>
                    <button className='btn-list-1NN'>Favorito</button>
                    <button className='btn-list-2NN'>Objetivos</button>
                    <button className='btn-list-3NN'>Pendiente</button>
                    <button className='btn-list-4NN'>Personal</button>
                    <button className='btn-list-5NN'>Trabajo</button>
                    <button className='btn-list-6NN'>Urgente</button>
                </div>

                {/*Cuerpo del Modal*/}
                <div className='body-modalNN'>
                    <label className='label-modalNN'>Categoría</label>
                    <div className='container-input-modalNN'>
                        <input className='input-modalNN' type='text' name='category' placeholder='Sin Especificar'/>
                    </div>
                    <label className='label-modalNN'>Título</label>
                    <div className='container-input-modalNN'>
                        <input className='input-modalNN' type="text" name="title" placeholder='Añadir Título' autoFocus/>
                    </div>
                    <label className='label-modalNN'>Nota</label>
                    <div className='container-input-modalNN'>
                        <textarea className='textarea-modalNN' name="content" placeholder='Añadir Nota'></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewNote_Modal;