export default function Tabs({ tasks, selectedTab, setSelectedTab }) {
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

    return (
        <section id="tabs-container">
            <nav>
                {tabs.map((tab, tabIndex) => {
                    return (
                        <button key={tabIndex} className={`tab-button ${selectedTab === tab.name ? 'tab-selected' : ''}`} onClick={() => {
                            localStorage.setItem('tab', tab.name);
                            setSelectedTab(tab.name);
                        }}>{tab.name} <span>({tab.tasksNo})</span></button>
                    )
                })}
            </nav>
            <hr />
        </section>
    )
}