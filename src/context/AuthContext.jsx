import { createContext, useContext, useEffect, useState } from "react";
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, deleteUser, EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from "firebase/auth";

// criando contexto
const AuthContext = createContext();

// exportando função que acessa o contexto criado
export function useAuth() {
    return useContext(AuthContext);
}

// criando o provider do contexto que vai encapsular a aplicação
export function AuthProvider({ children }) {
    // Definindo states para usuário e para o loading do usuário
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    // função de cadastro que usa o auth do firebase
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // função de login
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // função de logout que também seta o state 'user' para null
    function logout() {
        setUser(null);
        return signOut(auth);
    }

    // função que deleta o usuário atual
    function deleteAccount() {
        return deleteUser(auth.currentUser);
    }

    // função que atualiza o email do usuário
    function updateUserEmail(newEmail) {
        return updateEmail(auth.currentUser, newEmail);
    }

    // função que atualiza a senha do usuário
    function updateUserPass(newPass) {
        return updatePassword(auth.currentUser, newPass);
    }

    // função que envia o email de recuperação de senha para o usuário
    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    // função que reautentica o usuário, é chamada antes das funções de delete e update
    function reauthenticate(email, password) {
        const credential = EmailAuthProvider.credential(email, password);

        return reauthenticateWithCredential(auth.currentUser, credential);
    }

    // efeito que verifica o estado de autenticação do usuário, caso haja um usuário, seta ele no state 'user', caso contrário, retorna um erro
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            try {
                if (!user) {
                    throw Error('not-user-auth');
                }

                setUser(user);
            } catch (err) {
                console.log(err.message);
            } finally {
                setLoadingUser(false);
            }
        });

        return unsubscribe;
    }, [])
    
    // valores que serão passados no contexto
    const value = { user, loadingUser, signup, login, logout, deleteAccount, reauthenticate, updateUserEmail, updateUserPass, resetPassword };

    // Retornando o provider de AuthContexto com os valores do contexto e recebendo children dentro do bloco
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}