// src/components/MembersPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MembersPage = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users');
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

  const handleDeleteMember = async (memberId) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${memberId}`);
      setMembers(members.filter(member => member._id !== memberId));
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  return (
    <div>
      <h2>Members</h2>
      <ul>
        {members.map(member => (
          <li key={member._id}>
            {member.fullName}
            <button onClick={() => handleDeleteMember(member._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MembersPage;
