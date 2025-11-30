import { v4 } from 'uuid';
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import Footer from './components/Footer';
import { useState, useEffect } from "react";

function App() {
  // definindo state das tarefas
  const [tasks, setTasks] = useState([]);

  // definindo state das abas
  const [selectedTab, setSelectedTab] = useState('Abertas');

  // funções de "crud" da tarefa
  // adicionar
  function addTask(newTask, taskDesc) {
    const newTasksList = [{id: v4(), input: newTask, desc: taskDesc, complete: false}, ...tasks];
    setTasks(newTasksList);
    saveData(newTasksList);
  }

  // completar tarefa
  function completeTask(id) {
    let newTasksList = [...tasks];

    newTasksList.map(task => {
      if (task.id === id) task.complete = true;
    });

    setTasks(newTasksList);
    saveData(newTasksList);
  }

  // editar tarefa
  function editTask(input, desc, id) {
    const newTasksList = [...tasks];

    newTasksList.map(task => {
      if (task.id === id) {
        task.input = input;
        task.desc = desc;
      }
    })

    setTasks(newTasksList);
    saveData(newTasksList);
  }

  // deletar
  function deleteTask(id) {
    const newTasksList = tasks.filter(task => task.id != id);
    setTasks(newTasksList);
    saveData(newTasksList);
  }

  // função que adiciona tasks ao localstorage sempre que uma função que altera tasks é executada
  function saveData(currentTasks) {
    localStorage.setItem('tasks', JSON.stringify(currentTasks));
  }
  
  // definindo effect inicial de busca de tarefas do localStorage e da tab atual
  useEffect(() => {
    // tab
    if (!localStorage.getItem('tab')) return;
    const currentTab = localStorage.getItem('tab');
    setSelectedTab(currentTab);

    // itens de tarefa
    if (!localStorage.getItem('tasks')) return;
    const storageTasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(storageTasks);
  },[]);

  return (
    <>
      <Header tasks={tasks}/>
      <TaskInput addTask={addTask}/>
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} tasks={tasks}/>
      <TaskList selectedTab={selectedTab} deleteTask={deleteTask} completeTask={completeTask} editTask={editTask} tasks={tasks}/>
      <Footer/>
    </>
  )
}

export default App;
