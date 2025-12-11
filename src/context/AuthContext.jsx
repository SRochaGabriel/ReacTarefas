import { createContext, useContext, useEffect, useState } from "react";
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, deleteUser, EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        setUser(null);
        return signOut(auth);
    }

    function deleteAccount() {
        return deleteUser(auth.currentUser);
    }

    function updateUserEmail(newEmail) {
        return updateEmail(auth.currentUser, newEmail);
    }

    function updateUserPass(newPass) {
        return updatePassword(auth.currentUser, newPass);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    function reauthenticate(email, password) {
        const credential = EmailAuthProvider.credential(email, password);

        return reauthenticateWithCredential(auth.currentUser, credential);
    }

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
    
    const value = { user, loadingUser, signup, login, logout, deleteAccount, reauthenticate, updateUserEmail, updateUserPass, resetPassword };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}