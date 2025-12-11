import { useState } from "react";
import { useAuth } from "../context/AuthContext"
import Modal from "./Modal";
import Reauthentication from "./Reauthentication";

export default function Layout({ children }) {
    const [reauthenticating, setReauthenticating] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const { user, logout } = useAuth();

    return (
        <>
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

            {showUserModal && (
                <Modal setShowUserModal={setShowUserModal} modaltype={'user'}>
                    <div className="user-info-container">
                        <div className="user-info-header">
                            <h3>Sua conta</h3>
                            <i className="fa-solid fa-user"/>
                        </div>

                        <div className="full-line"></div>

                        {reauthenticating ? 
                            <Reauthentication setReauthenticating={setReauthenticating} isDelete={isDelete}/> : 
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

            <main>
                {children}
            </main>

            <footer>
                Desenvolvido por <a href="http://github.com/srochagabriel" target="_blank"><i className="fa-brands fa-github"/> SRochaGabriel</a>
            </footer>
        </>
    )
}