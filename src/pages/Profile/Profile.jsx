import React from 'react';
import { useLocation } from 'react-router-dom';

const Profile = () => {
  const location = useLocation();
  const { email } = location.state || { email: 'Usuário não autenticado' };

  return (
    <div>
      <h1>Perfil</h1>
      <p>Email: {email}</p>
    </div>
  );
};

export default Profile;
