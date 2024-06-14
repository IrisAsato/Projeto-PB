import React, { useEffect, useState } from "react";

function ComentarioDetalhe({ id }) {
  const baseUrl = 
    "https://forum-18cf7-default-rtdb.asia-southeast1.firebasedatabase.app";
  const [comentario, setComentario] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0); 
  useEffect(() => {
    fetch(`${baseUrl}/posts/${id}.json`)
     .then(res => res.json())
     .then(comentario => {
        setComentario(comentario);
        setLikes(comentario.likes || 0); 
        setDislikes(comentario.dislikes || 0); 
      })
     .catch(error => setMessage(error.message))
     .finally(setIsLoading(false));
  }, [id]);

  const handleLike = () => {
    setLikes(prevLikes => prevLikes + 1); 
  };

  const handleDislike = () => {
    setDislikes(prevDislikes => prevDislikes + 1);
  };

  return (
    <>
      {isLoading && <p>Carregando...</p>}
      {message && <p>{message}</p>}
      {comentario && (
        <section>
          <h1>{comentario.tema}</h1>
          <p>{comentario.comment}</p>
          <p><strong>Usuário:</strong> {comentario.user}</p>
          <p><strong>Data:</strong> {comentario.date}</p>
          <button onClick={handleLike}>Curtir</button>
          <button onClick={handleDislike}>Descurtir</button>
          <p>Total de Curtidas: {likes}</p>
          <p>Total de Descurtidas: {dislikes}</p>
        </section>
      )}
    </>
  );
}

export default ComentarioDetalhe;
