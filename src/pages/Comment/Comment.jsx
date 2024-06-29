import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Comment.css';

const Comment = () => {
  const [comment, setComment] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://forum-18cf7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json`, { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        const commentsArray = Object.values(data);

        const foundComment = commentsArray.find(comment => comment.id === parseInt(id));

        setComment(foundComment); // Define o comentário encontrado
      })
      .catch(error => {
        console.error('Erro ao buscar comentários:', error);
      });
  }, []);

  return (
    <div className="home-container">
      <div className="comments-list">
        <h3>Comentário {comment.id}</h3>
        <div className="comment-item">
            <p><strong>Usuário:</strong> {comment.user}</p>
            <p><strong>Tema:</strong> {comment.tema}</p>
            <p><strong>Data de Publicação:</strong> {comment.date}</p>
            <p><strong>Comentário:</strong> {comment.comment}</p>
            <p><strong>Curtidas:</strong> {comment.curtidas}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
