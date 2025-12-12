import Task from "./Task"

export default function TaskList({ tasks, selectedTab, fetching, deleteTask, completeTask, editTask }) {
    // filtra as tarefas a serem exibidas de acordo com a 'tab' selecionada
    const filteredTasks = selectedTab === 'Todas' ? tasks :
        selectedTab === 'Finalizadas' ? tasks.filter(task => task.isDone) :
        tasks.filter(task => !task.isDone);

    // mapeia as tarefas filtradas e exibe um componente Task para cada uma delas
    return (
        <section id="task-list">
            {fetching && <h2>Carregando suas tarefas...</h2>}

            {filteredTasks.map((task, taskIndex) => {
                return (
                    <Task key={taskIndex} task={task} deleteTask={deleteTask} completeTask={completeTask} editTask={editTask}/>
                )
            })}
        </section>
    )
}