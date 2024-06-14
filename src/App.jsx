import { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import './App.css';
import Forum from './pages/Forum';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Ranking from './pages/Ranking';
import InserirNovoComentario from './pages/InserirNovoComentario';
import ComentarioDetalhe from './pages/ComentarioDetalhe';
import Comentario from './components/Comentario';

export default function App() {
  const [page, setPage] = useState(0);

  return (
    <BrowserRouter>
      <header>
        <nav className="nav-container">
          <Link className="nav-item" to="/">Fórum</Link>
          <Link className="nav-item" to="/ranking">Ranking</Link>
          <Link className="nav-item" to="/inserir">Novo comentário</Link>
          <span className="nav-space"></span>
          <Link className="nav-item nav-item-shop" to="/perfil">Perfil</Link>
          <Link className="nav-item nav-item-shop" to="/login">Login</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Forum />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/inserir" element={<InserirNovoComentario />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/login" element={<Login />} />
          <Route path="/comentario_detalhe/*" element={<ComentarioDetalhe />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
