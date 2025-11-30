function Header({ tasks }) {
    const tasksLength = tasks.length; // quantas tarefas estão registradas
    const tarefasPlural = tasks.length != 1; // verifica se tem mais de 1 tarefa para determinar se o texto estará no plural

    return (
        <header>
            <h1>Você tem {tasksLength} {tarefasPlural ? 'tarefas' : 'tarefa'} {tarefasPlural ? 'registradas' : 'registrada'}</h1>
        </header>
    )
}

export default Header;