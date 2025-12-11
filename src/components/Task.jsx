import { useEffect, useState } from "react";
import Modal from "./Modal";

export default function Task({ task, deleteTask, completeTask, editTask }) {
    const creationDate = (new Date(task.createdAt)).toLocaleDateString('pt-BR');
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [editTaskModal, setEditTaskModal] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (!editTaskModal) return;

        setTitle(task.title);
        setDescription(task.desc);
    }, [ editTaskModal ]);

    return (
        <>
            <div className="task-card">
                <div className="task-card-title">
                    <h4 onClick={() => setShowTaskModal(true)}>
                        <i className="fa-solid fa-angle-right" />
                        {task.title}
                    </h4>
                    <p>{creationDate}</p>
                </div>

                <div className="task-card-btns">
                    <button disabled={task.isDone} onClick={() => completeTask(task.id)}>
                        <i className="fa-solid fa-check" />
                    </button>

                    <button onClick={() => deleteTask(task.id)}>
                        <i className="fa-solid fa-trash-can" />
                    </button>

                    <button disabled={task.isDone} onClick={() => setEditTaskModal(true)}>
                        <i className="fa-solid fa-pencil" />
                    </button>
                </div>
            </div>

            {showTaskModal && (
                <Modal setShowTaskModal={setShowTaskModal} modaltype={'task'}>
                    <div className="show-task-modal">
                        <h2>{task.title}</h2>
                        <p><span>Criado em:</span> {creationDate}</p>
                        { task.desc && <p className="description">{task.desc}</p>}
                    </div>
                </Modal>
            )}

            {editTaskModal && (
                <Modal setEditTaskModal={setEditTaskModal} modaltype={'edit'}>
                    <div className="edit-task-modal">
                        <h2>Edite as informações da tarefas</h2>

                        <div className="full-line"></div>

                        <form onSubmit={e => {
                            e.preventDefault();

                            editTask(task.id, title, description);

                            setEditTaskModal(false);
                        }}>
                            <div>
                                <h3>Título da tarefa</h3>
                                <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
                            </div>

                            <div>
                                <h3>Detalhes da tarefa</h3>
                                <textarea type="text" value={description} onChange={e => setDescription(e.target.value)}/>
                            </div>
            
                            <button type="submit" className="main-btn">Atualizar tarefa</button>            
                        </form>
                    </div>
                </Modal>
            )}
        </>
    )
}