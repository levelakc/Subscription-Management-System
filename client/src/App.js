import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { fetchSubscriptions } from './redux/actions/subscriptionActions'; // Adjust path if necessary
import store from './store';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import Movies from './components/Movies';
import Subscriptions from './components/Subscriptions';
import UserManagement from './components/UserManagement';
import Logout from './components/Logout';
import AddMovie from './components/AddMovie';
import EditMovie from './components/EditMovie';
import AddMember from './components/AddMember';
import EditMember from './components/EditMember';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import SingleMember from './components/SingleMember';
import SingleMovie from './components/SingleMovie';

const App = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  const handleLogin = async (username, password, navigate) => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        console.log('Login successful:', data);
        navigate('/main/movies');
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.message);
        throw new Error('Invalid credentials'); // Throw an error for the LoginPage to catch
      }
    } catch (error) {
      console.error('Error:', error.message);
      throw error; // Propagate the error
    }
  };

  const handleLogout = (navigate) => {
    setUser(null);
    navigate('/');
  };

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage setUser={setUser} onLogin={handleLogin} />} />
          <Route 
            path="/main/*" 
            element={
              <PrivateRoute user={user}>
                <MainPage user={user} onLogout={handleLogout} />
              </PrivateRoute>
            }
          >
            <Route path="movies" element={<Movies />} />
            <Route path="movies/:id" element={<SingleMovie />} /> {/* Correctly defined route */}
            <Route path="movies/add" element={<AddMovie />} />
            <Route path="movies/edit/:id" element={<EditMovie />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="subscriptions/members/:memberId" element={<SingleMember />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="logout" element={<Logout setUser={setUser} onLogout={handleLogout} />} />
            <Route path="members/add" element={<AddMember />} />
            <Route path="members/edit/:id" element={<EditMember />} />
            <Route path="members/:id" element={<SingleMember />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
