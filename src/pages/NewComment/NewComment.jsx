import React, { useState } from 'react';
import './NewComment.css';

const NewComment = () => {
  const [user, setUser] = useState('');
  const [topic, setTopic] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');

  const handleAddComment = (e) => {
    const newKey = new Date().getTime().toString();

    e.preventDefault();
    const newComment = {
      user,
      tema: topic,
      date,
      comment,
      curtidas: 0,
      id: newKey
    };
  
    fetch(`https://forum-18cf7-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${newKey}.json`, {
      method: 'PUT',
      body: JSON.stringify(newComment),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao atualizar os dados no Firebase');
      }
      setUser('');
      setTopic('');
      setDate('');
      setComment('');
    })
    .catch(error => {
      console.error('Erro ao adicionar comentário:', error);
    });
  };

  return (
    <div className="new-comment-container">
      <h2>Adicionar Comentário</h2>
      <form className="new-comment-form" onSubmit={handleAddComment}>
        <label>Usuário:</label>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />

        <label>Tema:</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />

        <label>Data de Publicação:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>Comentário:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={5}
          required
        />

        <button type="submit">Adicionar Comentário</button>
      </form>
    </div>
  );
};

export default NewComment;
