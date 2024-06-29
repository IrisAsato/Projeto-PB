import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import NewComment from './pages/NewComment/NewComment';
import Login from './pages/Login/Login';
import Comment from './pages/Comment/Comment';
import Profile from './pages/Profile/Profile';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null); // Estado para armazenar o usuário logado

  const handleLogin = (userData) => {
    // Simula um login bem-sucedido
    setUser(userData);
  };

  const handleLogout = () => {
    // Simula o logout
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="container">
        <Routes>
          <Route
            exact
            path="/"
            element={<Home user={user} />}
          />
          <Route
            path="/new-comment"
            element={<NewComment user={user} />}
          />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="/comment/:id" 
            element={<Comment />}
          />
          <Route
            path="/profile"
            element={<Profile user={user} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
