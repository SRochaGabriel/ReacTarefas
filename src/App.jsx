import { useNavigate } from 'react-router';
import Layout from './components/Layout';
import Login from './components/Login';
import { useAuth } from './context/AuthContext';
import { useEffect } from 'react';

function App() {
  // valores do contexto e instância do navigate
  const { user, loadingUser } = useAuth();
  const navigate = useNavigate();

  // caso usuário esteja logado, não deixa ele na página auth
  useEffect(() => {
    if (!loadingUser && user) {
      navigate('/');
    }
  }, [user, loadingUser]);

  // retorno que indica que a aplicação está conferindo se o usuário está autenticado
  if (loadingUser) {
    return (
      <Layout>
        <h1 style={{ color: 'var(--tertiary-color)' }}>Carregando...</h1>
      </Layout>
    )
  }

  // retorna o componente de login dentro do layout padrão
  return (
    <Layout>
      <Login />
    </Layout>
  )
}

export default App
