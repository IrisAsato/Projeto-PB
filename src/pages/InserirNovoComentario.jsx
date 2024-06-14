import { useState } from "react";

function InserirNovoComentario() {

    const baseUrl =
    "https://forum-18cf7-default-rtdb.asia-southeast1.firebasedatabase.app";

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const [tema, setTema] = useState("");
    const [comment, setComment] = useState("");
    const [user, setUser] = useState("");
    const [date, setDate] = useState("");

    return (
        <>
            <h1>Novo comentário</h1>
            <section>
                {message && <p>{message}</p>}
                {isLoading && <p>Carregando...</p>}
            </section>
            <section>
                <div>
                    <label htmlFor="tema">Tema: </label>
                    <input
                        id="tema"
                        value={tema}
                        onChange={(e) => {
                            setTema(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="comment">Comentário: </label>
                    <input
                        id="comment"
                        value={comment}
                        onChange={(e) => {
                            setComment(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="user">Nome de usuário: </label>
                    <input
                        id="user"
                        value={user}
                        onChange={(e) => {
                            setUser(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="date">Data de publicação: </label>
                    <input
                        id="date"
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value);
                        }}
                    />
                </div>
                <button
                    onClick={() => {
                        setIsLoading(true);
                        const comentario = {
                            tema,
                            comment,
                            user,
                            date,
                        };
                        fetch(`${baseUrl}/posts.json`, {
                            method: 'post',
                            header: { 'Content-Type' : 'application/json', },
                            body: JSON.stringify(comentario),
                        }).then(_ => setMessage("Salvo com sucesso!"))
                        .catch(error => setMessage(error.message))
                        .finally(setIsLoading(false));
                    }}
                >
                    Salvar
                </button>
            </section>
        </>
    );
}

export default InserirNovoComentario;