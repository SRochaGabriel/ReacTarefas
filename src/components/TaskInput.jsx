import { useState } from "react";

function TaskInput({ addTask }) {
    const [inputValue, setInputValue] = useState('');
    const [descValue, setDescValue] = useState('');

    return (
        <form className="input-container" onSubmit={e => {
                e.preventDefault();

                if (!inputValue) return;

                addTask(inputValue.trim(), descValue.trim());
                setInputValue('');
                setDescValue('');
            }}>
            <input type="text" required placeholder="Título da tarefa" value={inputValue} onChange={e => setInputValue(e.target.value)}/>

            <textarea placeholder="Detalhes da tarefa" value={descValue} onChange={e => setDescValue(e.target.value)}></textarea>

            <button>Adicionar tarefa</button>
        </form>
    )
}

export default TaskInput;