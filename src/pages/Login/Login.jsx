import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulação de login
    if (email === 'user@example.com' && password === '123456') {
      // Login bem-sucedido
      setError('');
      navigate('/profile', { state: { email } });
    } else {
      // Senha ou email incorreto
      setError('Email ou senha incorretos. Por favor, tente novamente.');
    }
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    // Simulação de criação de conta
    if (email && password.length >= 6) {
      // Criação de conta bem-sucedida
      setError('');
      setSuccess('Conta criada com sucesso!');
    } else {
      // Falha na criação de conta
      setError('Por favor, insira um email válido e uma senha com pelo menos 6 caracteres.');
      setSuccess('');
    }
  };

  const toggleNewAccount = () => {
    setNewAccount(!newAccount);
    setError('');
    setSuccess('');
  };

  return (
    <div className="login-container">
      <h2>{newAccount ? 'Criar Conta' : 'Login'}</h2>
      <form className="login-form" onSubmit={newAccount ? handleCreateAccount : handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <button type="submit">{newAccount ? 'Criar Conta' : 'Login'}</button>
      </form>

      <div className="toggle-link" onClick={toggleNewAccount}>
        {newAccount ? 'Já tem uma conta? Faça Login' : 'Não tem uma conta? Crie agora'}
      </div>
    </div>
  );
};

export default Login;
