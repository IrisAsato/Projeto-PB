import React, { useState } from 'react';

function TelaDeLogin() {
  const [tipoConta, setTipoConta] = useState('login');
  const [nomeNovaConta, setNomeNovaConta] = useState('');
  const [emailNovaConta, setEmailNovaConta] = useState('');
  const [senhaNovaConta, setSenhaNovaConta] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroForm, setErroForm] = useState('');
  const [enviado, setEnviado] = useState(false);

  const alterarTipoConta = (evento) => {
    setTipoConta(evento.target.value);
  };

  const validarCampos = () => {
    let ehValido = true;

    if (tipoConta === 'criar') {
      if (!nomeNovaConta.trim()) {
        setErroForm('O nome da conta deve ser preenchido.');
        ehValido = false;
      }
      if (!emailNovaConta.trim().endsWith('@gmail.com')) {
        setErroForm('O email é inválido.');
        ehValido = false;
      }
      if (!senhaNovaConta.trim().length >= 6) {
        setErroForm('A senha deve ter no mínimo 6 caracteres.');
        ehValido = false;
      }
    } else {
      if (!nome.trim().length >= 3) {
        setErroForm('O nome deve ter no mínimo 3 caracteres.');
        ehValido = false;
      }
      if (!email.trim().endsWith('@gmail.com')) {
        setErroForm('O email é inválido.');
        ehValido = false;
      }
      if (!senha.trim().length >= 6) {
        setErroForm('A senha deve ter no mínimo 6 caracteres.');
        ehValido = false;
      }
    }

    setErroForm('');
    return ehValido;
  };

  const enviarDados = (evento) => {
    evento.preventDefault();

    const valido = validarCampos();

    if (!valido) {
      return;
    }

    evento.preventDefault();
    setEnviado(true);

  };

  return (
    <div>
      <form onSubmit={enviarDados}>
        <div>
          <label>Tipo de Conta:</label>
          <select value={tipoConta} onChange={alterarTipoConta}>
            <option value="login">Logar</option>
            <option value="criar">Criar Nova Conta</option>
          </select>
        </div>

        {tipoConta === 'criar'? (
          <>
            <div>
              <label>Nome da Conta:</label>
              <input
                required
                type="text"
                value={nomeNovaConta}
                onChange={(evento) => setNomeNovaConta(evento.target.value)}
              />
            </div>
            
            <div>
              <label>Email:</label>
              <input
                required
                type="email"
                value={emailNovaConta}
                onChange={(evento) => setEmailNovaConta(evento.target.value)}
              />
            </div>
            
            <div>
              <label>Senha:</label>
              <input
                required
                type="password"
                value={senhaNovaConta}
                onChange={(evento) => setSenhaNovaConta(evento.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label>Nome:</label>
              <input
                required
                type="text"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
              />
            </div>
            
            <div>
              <label>Email:</label>
              <input
                required
                type="email"
                value={email}
                onChange={(evento) => setEmail(evento.target.value)}
              />
            </div>
            
            <div>
              <label>Senha:</label>
              <input
                required
                type="password"
                value={senha}
                onChange={(evento) => setSenha(evento.target.value)}
              />
            </div>
          </>
        )}

        <button type="submit">Enviar</button>
      </form>
      
      {erroForm && (
        <p>{erroForm}</p>
      )}
      
      {enviado && (
        <div>
          Enviado com sucesso!
        </div>
      )}
    </div>
  );
}

export default TelaDeLogin;
