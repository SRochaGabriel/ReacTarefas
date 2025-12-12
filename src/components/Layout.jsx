import { useState } from "react";
import { useAuth } from "../context/AuthContext"
import Modal from "./Modal";
import Reauthentication from "./Reauthentication";

export default function Layout({ children }) {
    // Definindo states
    const [reauthenticating, setReauthenticating] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    // Valores do contexto
    const { user, logout } = useAuth();

    // Layout padrão da aplicação
    return (
        <>  
            {/* Header que exibe botões de 'usuário' e 'sair' caso o usuário esteja logado */}
            <header>
                <h1>ReacTarefas</h1>

                {user && (
                    <div id="profile-options-container">
                        <button onClick={() => setShowUserModal(true)}>
                            Usuário <i className="fa-solid fa-user"/>
                        </button>
                        <button onClick={logout}>
                            Sair <i className="fa-solid fa-right-from-bracket"/>
                        </button>
                    </div>
                )}
            </header>

            {/* Modal que exibe as informações do usuário */}
            {showUserModal && (
                <Modal setShowUserModal={setShowUserModal} modaltype={'user'}>
                    <div className="user-info-container">
                        <div className="user-info-header">
                            <h3>Sua conta</h3>
                            <i className="fa-solid fa-user"/>
                        </div>

                        <div className="full-line"></div>

                        {/* Caso o usuário vá editar infos ou deletar a conta, exibe o componente 'Reauthentication', caso contrário, apenas exibe os botões de 'editar' e 'deletar' */}
                        {reauthenticating ? <Reauthentication setReauthenticating={setReauthenticating} isDelete={isDelete}/> :
                            (
                                <>
                                    <div className="user-info-body">
                                        <h3>E-mail:</h3>
                                        <p>{user.email}</p>
                                    </div>

                                    <div className="btns-container">
                                        <button className="main-btn" onClick={() => {
                                            setIsDelete(false);
                                            setReauthenticating(true);
                                        }}>Editar informações</button>
                                        <button className="main-btn" onClick={() => {
                                            setIsDelete(true);
                                            setReauthenticating(true);
                                        }}>Deletar conta</button>
                                    </div>
                                </>
                        )}

                    </div>
                </Modal>
            )}

            {/* conteúdo principal que é definido via children */}
            <main>
                {children}
            </main>

            {/* rodapé */}
            <footer>
                Desenvolvido por <a href="http://github.com/srochagabriel" target="_blank"><i className="fa-brands fa-github"/> SRochaGabriel</a>
            </footer>
        </>
    )
}