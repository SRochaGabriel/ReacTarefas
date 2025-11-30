import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TaskCard({ task, deleteTask, completeTask, editTask }) {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(task.input);
    const [descValue, setDescValue] = useState(task.desc);

    function seeTask(task) {
        const query = new URLSearchParams();
        query.set('titulo', task.input);
        query.set('desc', task.desc);

        navigate(`/tarefa?${query.toString()}`);
    }

    return (
        <div className="card">
            {
                isEditing ? 
                <form className="input-container" onSubmit={e => {
                    e.preventDefault();
                    editTask(inputValue, task.id);
                    setIsEditing(false);
                }}>
                    <input autoFocus type="text" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
                    <textarea value={descValue} onChange={e => setDescValue(e.target.value)}></textarea>
                </form> : 
                <p onClick={() => seeTask(task)}>
                    <i className="fa-solid fa-angle-right"></i>
                    {task.input}
                </p>
            }
            
            <div className="todo-buttons">
                <button disabled={task.complete} onClick={() => {
                    if (isEditing) return alert('Você não pode finalizar uma tarefa que está sendo editada');

                    completeTask(task.id);
                }}>
                    <i className="fa-solid fa-check"></i>
                </button>

                <button onClick={() => deleteTask(task.id)}>
                    <i className="fa-solid fa-trash-can"></i>
                </button>

                <button disabled={task.complete} onClick={() => {
                    if (isEditing) {
                        editTask(inputValue, descValue,task.id);
                        setIsEditing(false);
                    } else {
                        setIsEditing(true);
                    }
                }}>
                    {isEditing ? <i className="fa-solid fa-clipboard-check"></i> : <i className="fa-solid fa-pen"></i>}
                </button>
            </div>
        </div>
    )
}

export default TaskCard;