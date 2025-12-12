import { useState } from "react"
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    // STATES
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [viewPassword, setViewPassword] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [recoveringPass, setRecoveringPass] = useState(false);
    const [error, setError] = useState('');

    // Valores do context + navigate
    const { signup, login, resetPassword } = useAuth();
    const navigate = useNavigate();

    // Define se o botão de login/cadastro estará desativado ou não
    const cantAuth = !email || !password || !email.includes('@') || password.length < 6;

    // Função que envia e-mail de recuperação de senha para o uusário
    async function handleResetPassword() {
        if (!email) {
            setError('Insira um E-mail para receber as instruções de recuperação de senha.');
            return;
        }
        
        setRecoveringPass(true);
        try {
            await resetPassword(email);
            alert('As instruções para a verificação da senha foram enviadas para o E-mail inserido. Verifique sua caixa de spam.');
        } catch (err) {
            if (err.message.includes('user-not-found')) {
                return setError('Não possível enviar o link de recuperação para o E-mail que você informou.');
            }
        } finally {
            setRecoveringPass(false);
        }
    }

    // Função que autentica o usuário, seja para login ou cadastro e leva ele para a página das tarefas
    async function authUser() {
        if (!email || !password) {
            setError('Preencha todas as informações');
            return;
        }

        if (password.length < 6) {
            setError('A senha deve conter pelo menos 6 caracteres.');
            return;
        }

        setIsAuthenticating(true);
        try {
            if (isRegister) {
                await signup(email, password);
            } else {
                await login(email, password);
            }

            navigate('/');
        } catch (err) {
            if (err.message.includes('invalid-credential') || err.message.includes('auth/wrong-password') || err.message.includes('user-not-found')) {
                return setError('E-mail e/ou senha estão incorretos.')
            } else if (err.message.includes('invalid-email')) {
                return setError('Esse e-mail é inválido.')
            } else if (err.message.includes('email-already-in-use')) {
                return setError('Não foi possível realizar o cadastro.');
            }
        } finally {
            setIsAuthenticating(false);
        }
    }

    return (
        <section id="login-form-container">
            <h2>Gerenciador de tarefas fácil e rápido</h2>

            <div className="full-line"></div>

            <form id="login-form" onSubmit={e => {
                e.preventDefault();
                authUser();
            }}>
                <h3>{isRegister ? 'Cadastro' : 'Login'}</h3>
                
                { error && <h4 style={{color: '#9e0e0eff'}}>{error}</h4>}

                <div>
                    <p>E-mail</p>
                    <input name="email" type="email" placeholder="Insira seu e-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>

                <div>
                    <p>Senha</p>
                    <div className="pass-container">
                        <input type={viewPassword ? "text" : "password"} placeholder="Insira sua senha" value={password} onChange={e => setPassword(e.target.value)}/>

                        {viewPassword ? <i className="fa-solid fa-eye-slash" onClick={() => setViewPassword(!viewPassword)}/> : <i className="fa-solid fa-eye" onClick={() => setViewPassword(!viewPassword)}/>}
                    </div>
                </div>

                <button type="submit" className="main-btn" disabled={cantAuth}>
                    {isAuthenticating ? 'Carregando...' : isRegister ? 'Cadastrar' : 'Entrar'}
                </button>
            </form>

            <div className="btns-container">
                    <button className="secondary-btn" onClick={() => setIsRegister(!isRegister)}>{isRegister ? 'Faça login' : 'Cadastre-se'}</button>

                    <button className="secondary-btn" onClick={handleResetPassword}>{recoveringPass ? 'Enviando e-mail de recuperação de senha...' : 'Recuperar senha'}</button>
            </div>
        </section>
    )
}