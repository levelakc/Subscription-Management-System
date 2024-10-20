import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setUser, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
