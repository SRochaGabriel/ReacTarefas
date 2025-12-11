import { useState } from "react"
import { useAuth } from "../context/AuthContext";

export default function Reauthentication({ isDelete, setReauthenticating }) {
    const [viewPassword, setViewPassword] = useState(false);
    const [viewNewPassowrd, setViewNewPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPass, setNewPass] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { deleteAccount, reauthenticate, updateUserEmail, updateUserPass, logout } = useAuth();

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