import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const MainPage = ({ user, onLogout }) => {
  return (
    <div>
      <h1>Welcome, {user ? user.fullName : 'Guest'}!</h1>
      <h2>Movies - Subscriptions Web Site</h2>
      <NavBar onLogout={onLogout} />
      <Outlet />
    </div>
  );
};

export default MainPage;
