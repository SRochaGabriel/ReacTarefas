import { useEffect, useRef } from 'react';
import ReactDom from 'react-dom';

export default function Modal({ children, setShowUserModal, setShowTaskModal, setEditTaskModal, modaltype }) {
    const modalRef = useRef();
    
    return ReactDom.createPortal(
    <section className="modal" ref={modalRef} onClick={e => {
        if(modalRef.current && modalRef.current === e.target) {
            modaltype === 'task' ? setShowTaskModal(false) :
                modaltype === 'user' ? setShowUserModal(false) : setEditTaskModal(false);
        }
    }}>
        <div className="modal-content">
            <button className='close-modal-btn' onClick={() => {
                modaltype === 'task' ? setShowTaskModal(false) :
                    modaltype === 'user' ? setShowUserModal(false) : setEditTaskModal(false);
            }}>
                <i className="fa-solid fa-circle-xmark"/>
            </button>
            {children}
        </div>
    </section>, document.getElementById('portal'))
}