import { useState } from "react"
import { useAuth } from "../context/AuthContext";

export default function Reauthentication({ isDelete, setReauthenticating }) {
    // states para ver ou esconder senha, para cada input, para erro e para loading
    const [viewPassword, setViewPassword] = useState(false);
    const [viewNewPassowrd, setViewNewPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPass, setNewPass] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // valores do contexto
    const { deleteAccount, reauthenticate, updateUserEmail, updateUserPass, logout } = useAuth();

    // Função de deleção de usuário, primeiro aguarda a reautenticação dele, depois aguarda o retorno da função de deletar conta e depois recarrega a página
    async function deleteUserAcc() {
        if (!email || !password) {
            return setError('Preencha seu E-mail e senha atuais para poder realizar essa operação.');
        }

        setIsLoading(true);

        try {
            await reauthenticate(email, password);
            await deleteAccount();
            window.location.reload();
        } catch(err) {
            if (err.message.includes('invalid-credential')) return setError('E-mail ou senha inválidos.');
        } finally {
            setIsLoading(false);
        }
    }

    // Função de edição do usuário, primeiro aguarda a reautenticação, depois aguarda as funções de update
    // Caso atualize a senha, realiza logout junto
    // Ao final, recarrega a página
    async function editUser() {
        if (!email || !password) {
            return setError('Preencha seu E-mail e senha atuais para poder realizar essa operação.');
        }

        if (!newEmail && !newPass) {
            return setError('Nenhum dado a ser atualizado foi inserido.');
        }

        setIsLoading(true);

        try {
            await reauthenticate(email, password);

            if (newEmail) {
                await updateUserEmail(newEmail);
            }

            if (newPass) {
                await updateUserPass(newPass);
                logout();
            }

            window.location.reload();
        } catch (err) {
            if (err.message.includes('invalid-credential') || err.message.includes('wrong-password')) return setError('E-mail ou senha inválidos.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        // Form que confirma as infos do usuário antes de editar ou deletar
        <form className="reauth-form" onSubmit={e => {
            e.preventDefault();

            isDelete ? deleteUserAcc() : editUser();
        }}>
            <h3>Confirme suas informações</h3>
            <p>Para prosseguir, precisamos confirmar suas credenciais</p>

            { error && <h4 style={{color: '#9e0e0eff'}}>{error}</h4>}

            <input name="email" type="email" placeholder="Insira seu E-mail cadastrado" value={email} onChange={e => setEmail(e.target.value)}/>

            <div className="pass-container">
                <input type={viewPassword ? 'text' : 'password'} placeholder="Insira sua senha cadastrada" value={password} onChange={e => setPassword(e.target.value)}/>

                {viewPassword ? <i className="fa-solid fa-eye-slash" onClick={() => setViewPassword(!viewPassword)} /> : <i className="fa-solid fa-eye" onClick={() => setViewPassword(!viewPassword)} />}
            </div>

            {/* Caso o usuário não esteja deletando a conta, mas sim editando as infos */}
            {!isDelete && (
                <>
                    <div className="full-line"></div>
                    <h3>Insira suas novas informações</h3>
                    <p>Só preencha os campos de dados que deseja atualizar</p>

                    <input name="email" type="email" placeholder="Insira o novo E-mail" value={newEmail} onChange={e => setNewEmail(e.target.value)}/>

                    <div className="pass-container">
                        <input type={viewNewPassowrd ? 'text' : 'password'} placeholder="Insira sua nova senha" value={newPass} onChange={e => setNewPass(e.target.value)}/>

                        {viewNewPassowrd ? <i className="fa-solid fa-eye-slash" onClick={() => setViewNewPassword(!viewNewPassowrd)} /> : <i className="fa-solid fa-eye" onClick={() => setViewNewPassword(!viewNewPassowrd)} />}
                    </div>
                </>
            )}

            {/* Botões de exclusão da conta ou alteração das infos*/}
            <div className="btns-container">
                <button type="button" className="main-btn" onClick={() => setReauthenticating(false)}>Cancelar</button>
                <button type="submit" className="main-btn">
                    {
                        isDelete ? (isLoading ? 'Deletando...' : 'Deletar conta') :
                            isLoading ? 'Salvando...' : 'Salvar alterações'    
                    }
                </button>
            </div>
        </form>
    )
}