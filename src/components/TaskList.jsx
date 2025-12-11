import Task from "./Task"

export default function TaskList({ tasks, selectedTab, fetching, deleteTask, completeTask, editTask }) {
    const filteredTasks = selectedTab === 'Todas' ? tasks :
        selectedTab === 'Finalizadas' ? tasks.filter(task => task.isDone) :
        tasks.filter(task => !task.isDone);

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