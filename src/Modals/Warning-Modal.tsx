import React from 'react';

//Interfaz --> props para el modal
interface ModalProps{
    Accept: () => void;//Recibe la función de confirmación
}

//Renderizamos los elementos del modal --> Advertencia de validacion para Agregar Notas
const Alert_Modal: React.FC<ModalProps> = ({Accept}) => {
    return (
        <div className='alert-modal'>
            <div className='modalAlert'>
                {/*header del Modal*/}
                <div className='header-modal-warning'>
                    <p>Porfavor, complete los campos obligatorios para crear la nota</p>
                </div>
                {/*Cuerpo del Modal*/}
                <div className='body-modalAlert'>
                    <div className='btn-alert-modal'>
                        <button className="btnAlert-Accept" onClick={Accept}>Aceptar
                            <span className="material-symbols-outlined iconbtn-modal">check</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Alert_Modal;