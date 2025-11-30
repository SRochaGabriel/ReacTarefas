import TaskCard from "./TaskCard";

function TaskList({ tasks, selectedTab, deleteTask, completeTask, editTask }) {
    // Lógica condicional para definir o valor do filtro da lista com base no valor de 'tab'
    const filteredTaskList = selectedTab === 'Todas' ? tasks :
        selectedTab === 'Finalizadas' ? tasks.filter(task => task.complete) :
            tasks.filter(task => !task.complete);

    return (
        <>
            {filteredTaskList.map((task) => {
                return (
                    <TaskCard key={task.id} task={task} deleteTask={deleteTask} completeTask={completeTask} editTask={editTask}/>
                )
            })}
        </>
    )
}

export default TaskList;