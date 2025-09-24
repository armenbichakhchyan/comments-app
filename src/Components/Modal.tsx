import * as ReactDOM from 'react-dom';

const Modal = ({children}) => {
    return ReactDOM.createPortal(
        <div className='modal__overlay'>
            <div className="modal__backdrop" />

            <div  className='modal__content'>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default Modal;