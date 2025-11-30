import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";

function TarefaPag() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const titulo = searchParams.get('titulo');
    const desc = searchParams.get('desc');

    return (
        <>
            <div className="details-header">
                <button onClick={() => navigate(-1)}>
                    <i className="fa-solid fa-angle-left"></i>
                </button>
                <h1>Detalhes da tarefa</h1>
            </div>

            <h2>{titulo}</h2>
            <p id="descricao">{desc}</p>
            <Footer/>
        </>
    )
}

export default TarefaPag;