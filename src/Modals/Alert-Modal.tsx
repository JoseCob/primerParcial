import React from 'react';

//Interfaz --> props para el modal
interface ModalProps{
    closeAlert: () => void;//Recibe la función de cierre de la alerta desde App.tsx
    confirmDelete: () => void;//Recibe la función de confirmación
}

//Renderizamos los elementos del modal --> Panel de Agregar notas
const Alert_Modal: React.FC<ModalProps> =({closeAlert, confirmDelete }) => {
    return (
        <div className='alert-modal'>
            <div className='modalAlert'>
                {/*header del Modal*/}
                <div className='header-modalAlert'>
                    <p>¿Seguro Que Deseas Eliminarlo?</p>
                </div>

                {/*Cuerpo del Modal*/}
                <div className='body-modalAlert'>
                    <p>Todo el contenido se perdera</p>
                    <div className='btn-alert-modal'>
                        <button className="btnAlert-cancel" onClick={closeAlert}>Cancelar
                            <span className="material-symbols-outlined iconbtn-modal">cancel</span>
                        </button>
                        <button className="btnAlert-confirm" onClick={confirmDelete}>Confirmar
                            <span className="material-symbols-outlined iconbtn-modal">check_circle</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Alert_Modal;