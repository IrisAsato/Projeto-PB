import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Fórum</Link>
      </div>
      <div className="navbar-right">
        <Link to="/new-comment">Novo Comentário</Link>
        <Link to="/ranking">Ranking</Link>
        <Link to="/profile">Perfil</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
