import { useRef } from 'react';
import ReactDom from 'react-dom';

export default function Modal({ children, setShowUserModal, setShowTaskModal, setEditTaskModal, modaltype }) {
    // definindo uma Ref que vai ser associada ao modal
    const modalRef = useRef();
    
    // criando um modal via createPortal na div de id 'portal' dentro de index.html
    return ReactDom.createPortal(
    // modal que fecha caso um clique ocorra na área do modal, mas fora da área de conteúdo
    <section className="modal" ref={modalRef} onClick={e => {
        if(modalRef.current && modalRef.current === e.target) {
            modaltype === 'task' ? setShowTaskModal(false) :
                modaltype === 'user' ? setShowUserModal(false) : setEditTaskModal(false);
        }
    }}>
        {/* área de contéudo com um botão de fechamento do modal e que recebe o resto do conteúdo via children */}
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