import { use, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import Layout from "../components/Layout";
import Tabs from "../components/Tabs";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function TasksPage() {
    // Definindo states
    const [tasks, setTasks] = useState([]);
    const [savingTask, setSavingTask] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [selectedTab, setSelectedTab] = useState(localStorage.getItem('tab') || 'Abertas');

    // Buscando valores do contexto e instanciando navigate
    const { user, loadingUser } = useAuth();
    const navigate = useNavigate();

    // Função que edita o state de tarefas e o valor da tarefa no banco de dados por meio da referência do documento
    async function editTask(taskId, title, description) {
        if (!taskId || !title) return;

        try {
            let newTasks = [...tasks];
            newTasks.map(task => {
                if (task.id === taskId) {
                    task.title = title.trim();
                    task.desc = description.trim();
                }
            });
            setTasks(newTasks);
            
            const taskRef = doc(db, 'users', user.uid, 'tasks', taskId);

            await updateDoc(taskRef, {
                title: title.trim(),
                desc: description.trim()
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    // função que adiciona uma tarefa no state de tarefas e a adiciona no banco de dados criando uma referência e setando o documento
    async function addTask(title, description) {
        if (!title) return;

        const newTask = {
            id: uuidv4(),
            title: title.trim(),
            desc: description.trim(),
            isDone: false,
            createdAt: Date.now()
        }

        setTasks([newTask, ...tasks]);

        setSavingTask(true);
        try {
            const taskRef = doc(db, 'users', user.uid, 'tasks', newTask.id);

            await setDoc(taskRef, {
                title: newTask.title,
                desc: newTask.desc,
                isDone: newTask.isDone,
                createdAt: newTask.createdAt
            }, { merge: true });
        } catch (err) {
            console.log(err.message);
        } finally {
            setSavingTask(false);
        }
    }

    // função que deleta o doc de uma tarefa no banco de dados e remove essa tarefa do state 'tasks'
    async function deleteTask(taskId) {
        try {
            const taskRef = doc(db, 'users', user.uid, 'tasks', taskId);

            const newTasks = tasks.filter(task => task.id !== taskId);
            setTasks(newTasks);

            await deleteDoc(taskRef);
        } catch (err) {
            console.log(err.message)
        }
    }

    // função que coloca o valor de 'isDone' de uma tarefa para true, tanto no banco de dados quanto no state 'tasks'
    async function completeTask(taskId) {
        try {
            const taskRef = doc(db, 'users', user.uid, 'tasks', taskId);

            let newTasks = [...tasks];
            newTasks.map(task => {
                if (task.id === taskId) task.isDone = true;
            });
            setTasks(newTasks);

            await updateDoc(taskRef, {
                isDone: true,
            });
        } catch (err) {
            console.log(err.message)
        }
    }

    /*  use effect que:
            1 - verifica se não há um usuário autenticado, caso não haja, leva para a página de login

            2 - caso haja um usuário autenticado: busca a ref da coleção de documentos, faz a query por ordem de data de criação, busca os docs dessa query e, para cada doc da snapshot cria um objeto 'fetchedTask' e adiciona ele ao state 'tasks'
    */
    useEffect(() => {
        if (!loadingUser && !user) {
            navigate('/auth');
        }

        if (!user) return;

        async function fetchTasks() {
            setFetching(true);
            try {
                const tasksRef = collection(db, 'users', user.uid, 'tasks');

                const q = query(tasksRef, orderBy('createdAt', 'desc'));

                const snapshot = await getDocs(q);
                snapshot.forEach(doc => {
                    const fetchedTask = { id: doc.id, ...doc.data() };
                    setTasks((currTask) => [...currTask, fetchedTask]);
                })
            } catch (err) {
                console.log(err.message);
            } finally {
                setFetching(false);
            }
        }

        fetchTasks();
    }, [user, loadingUser]);

    // caso a aplicação esteja verificando se o usuario está autenticado
    if (loadingUser) {
        return (
            <Layout>
                <h1 style={{ color: 'var(--tertiary-color)' }}>Carregando...</h1>
            </Layout>
        )
    }

    // retornando o formulário de input das tarefas, as abas por "status" da tarefa e a lista de tarefas dentro do layout padrão
    return (
        <Layout>
            <TaskForm tasksNumber={tasks.length} addTask={addTask} savingTask={savingTask} />

            <Tabs tasks={tasks} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

            <TaskList tasks={tasks} selectedTab={selectedTab} fetching={fetching} completeTask={completeTask} deleteTask={deleteTask} editTask={editTask}/>
        </Layout>
    )
}