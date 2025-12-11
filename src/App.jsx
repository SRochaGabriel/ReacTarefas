import { useNavigate } from 'react-router';
import Layout from './components/Layout';
import Login from './components/Login';
import { useAuth } from './context/AuthContext';
import { useEffect } from 'react';

function App() {
  const { user, loadingUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loadingUser && user) {
      navigate('/');
    }
  }, [user, loadingUser]);

  if (loadingUser) {
    return (
      <Layout>
        <h1 style={{ color: 'var(--tertiary-color)' }}>Carregando...</h1>
      </Layout>
    )
  }

  return (
    <Layout>
      <Login />
    </Layout>
  )
}

export default App
