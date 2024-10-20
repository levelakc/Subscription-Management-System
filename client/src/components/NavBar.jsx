import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css'; // Import the CSS file for styling

const NavBar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(navigate);
  };

  return (
    <nav className="navbar">
      <button onClick={() => navigate('/main/movies')}>Movies</button>
      <button onClick={() => navigate('/main/subscriptions')}>Subscriptions</button>
      <button onClick={() => navigate('/main/user-management')}>User Management</button>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default NavBar;
