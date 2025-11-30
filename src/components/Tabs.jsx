function Tabs({ tasks, selectedTab, setSelectedTab }) {
    const tabs = ['Todas', 'Abertas', 'Finalizadas'];

    return (
        <nav className="tab-container">
            {/* Retornando um botão para cada valor de 'tabs' */}
            {tabs.map((tab, tabindex) => {
                // utilizando condicional para definir o número de tarefas, se a aba for 'todas', retorna o length de tasks. se for 'abertas', retorna o length de tasks filtradas por tarefas não-finalizadas. caso nenhum dos dois (finalizadas), retorna o length de tasks finalizadas.
                const numTasks = tab ===  'Todas' ?
                    tasks.length :
                    tab === 'Abertas' ?
                        tasks.filter(task => !task.complete).length :
                        tasks.filter(task => task.complete).length;

                return (
                    <button className={`tab-button ${tab === selectedTab ? 'tab-selected' : ''}`} key={tabindex} onClick={() => {
                            localStorage.setItem('tab', tab);
                            setSelectedTab(tab);
                        }}>
                        <h4>{tab} <span>({numTasks})</span></h4>
                    </button>
                )
            })}
            <hr />
        </nav>
    )
}

export default Tabs;