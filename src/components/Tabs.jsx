export default function Tabs({ tasks, selectedTab, setSelectedTab }) {
    // Array de objetos das abas, com o nome da aba e o número de itens que faz parte dela de acordo com o state 'tasks'
    const tabs = [
        {
            name: 'Todas',
            tasksNo: tasks.length,
        },
        {
            name: 'Abertas',
            tasksNo: (tasks.filter(task => !task.isDone)).length
        },
        {
            name: 'Finalizadas',
            tasksNo: (tasks.filter(task => task.isDone)).length
        }
    ];

    // retorna um nav com botões para cada tab
    return (
        <section id="tabs-container">
            <nav>
                {tabs.map((tab, tabIndex) => {
                    return (
                        <button 
                            key={tabIndex} 
                            className={`tab-button ${selectedTab === tab.name ? 'tab-selected' : ''}`} 
                            onClick={() => {
                                localStorage.setItem('tab', tab.name);
                                setSelectedTab(tab.name);}}
                        >
                            {tab.name} <span>({tab.tasksNo})</span>
                        </button>
                    )
                })}
            </nav>
            <hr />
        </section>
    )
}