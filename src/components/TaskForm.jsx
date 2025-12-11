import { useState } from "react"

export default function TaskForm({ tasksNumber, addTask, savingTask }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(false);

    return (
        <section id="task-form-container">
            <h2>Você tem {tasksNumber} tarefas registradas</h2>

            { error && <h4 style={{color: '#9e0e0eff'}}>{error}</h4>}

            <form onSubmit={e => {
                    e.preventDefault();

                    if (!title) {
                        setError('Não é possível adicionar uma tarefa que não tenha título.');
                        return;
                    };

                    setError(false);
                    addTask(title, description);
                    setTitle('');
                    setDescription('');
                }}>
                <input type="text" placeholder="Título da tarefa" value={title} onChange={e => setTitle(e.target.value)}/>

                <textarea placeholder="Detalhes da tarefa" value={description} onChange={e => setDescription(e.target.value)}></textarea>

                <button type="submit" className="main-btn">{savingTask ? 'Salvando tarefa...' : 'Adicionar tarefa'}</button>
            </form>
        </section>
    )
}