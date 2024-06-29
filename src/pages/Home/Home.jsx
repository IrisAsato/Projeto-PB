import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://forum-18cf7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        if (data) {
          const commentsArray = Object.values(data);
          setComments(commentsArray);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar comentários:', error);
      });
  }, []);

  const handleLike = (id) => {
    const updatedComments = comments.map(comment =>
      comment.id === id ? { ...comment, curtidas: comment.curtidas + 1 } : comment
    );
    setComments(updatedComments);
  };

  const redirectToSinglePageComment = (id) => {
    navigate(`/comment/${id}`);
  }

  return (
    <div className="home-container">
      <h2>Bem-Vindo ao Fórum</h2>

      <div className="comments-list">
        <h3>Comentários Recentes</h3>
        {comments.length === 0 && <p>Nenhum comentário ainda. Seja o primeiro a comentar!</p>}
        {comments.map((comment, index) => (
          <div key={index} className="comment-item">
            <p><strong>Usuário:</strong> {comment.user}</p>
            <p><strong>Tema:</strong> {comment.tema}</p>
            <p><strong>Data de Publicação:</strong> {comment.date}</p>
            <p><strong>Comentário:</strong> {comment.comment}</p>
            <p><strong>Curtidas:</strong> {comment.curtidas}</p>
            <button onClick={() => redirectToSinglePageComment(comment.id)}>Ver mais</button>
            <button onClick={() => handleLike(comment.id)}>Curtir</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
