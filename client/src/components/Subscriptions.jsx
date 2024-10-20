// src/components/Subscriptions.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers } from '../redux/memberSlice';
import AllMembers from './AllMembers';
import AddMember from './AddMember';
import './Subscriptions.css'; // Import the CSS file for styling

const Subscriptions = () => {
  const [currentView, setCurrentView] = useState('allMembers');
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.members);

  useEffect(() => {
    // Fetch members when the view is 'allMembers' or when component mounts
    if (currentView === 'allMembers') {
      dispatch(fetchMembers());
    }
  }, [dispatch, currentView]);

  const handleAllMembers = () => {
    setCurrentView('allMembers');
  };

  const handleAddMember = () => {
    setCurrentView('addMember');
  };

  return (
    <div>
      <nav className="nav-buttons"> {/* Add this wrapper class */}
        <button onClick={handleAllMembers}>All Members</button>
        <button onClick={handleAddMember}>Add Member</button>
      </nav>
      {currentView === 'allMembers' && <AllMembers members={members} />}
      {currentView === 'addMember' && <AddMember />}
    </div>
  );
};

export default Subscriptions;
