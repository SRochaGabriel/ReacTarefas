import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import TasksPage from './pages/TasksPage.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

// definindo as rotas do site
const router = createBrowserRouter([
  {
    path: '/auth',
    element: <App />
  },
  {
    path: '/',
    element: <TasksPage />
  },
]);

// provider das rotas encapsulado pelo provider do contexto
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
