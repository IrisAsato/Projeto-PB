import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const Comentario = ({ comentario }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const url = `/comentario/${comentario.id}`;
    navigate(url); 
  };

  return (
    <div style={{ padding: 20, marginBottom: 10, backgroundColor: '#f9f9f9', borderRadius: 5 }}>
      <h3>{comentario.user} - {comentario.date}</h3>
      <h4>{comentario.tema}</h4>
      <p>{comentario.comment}</p>
      <button onClick={handleClick} style={{ marginTop: 10, padding: 10, backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: 5 }}>
        Ver mais
      </button>
    </div>
  );
};

export default Comentario;
