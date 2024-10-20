import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteMember } from '../redux/memberSlice';
import MoviesWatched from './MoviesWatched';
import SubscribeToMovie from './SubscribeToMovie';
import axios from 'axios';
import './MemberCard.css'; // Import the CSS file for styling

const MemberCard = ({ member }) => {
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [fullName, setFullName] = useState('Loading...');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = member?.userId?.toString(); // Ensure userId is a string
        if (userId) {
          const response = await axios.get(`http://localhost:8000/api/users/${userId}`);
          setFullName(response.data.fullName);
        } else {
          setFullName('Unknown');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setFullName('Unknown');
      }
    };

    if (member) {
      fetchUserDetails();
    }
  }, [member]);

  const handleEdit = () => {
    navigate(`/main/members/edit/${member._id}`);
  };

  const handleDelete = () => {
    dispatch(deleteMember(member._id));
  };

  const handleSubscribeToggle = () => {
    setShowSubscribe(!showSubscribe);
  };

  return (
    <div className="member-card">
      <div className="member-details">
        <h3>{fullName || member.name}</h3>
        <p>Email: {member.email}</p>
        <p>City: {member.city}</p>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete} style={{ marginLeft: '10px' }}>Delete</button>
        <button onClick={handleSubscribeToggle}>
          {showSubscribe ? 'Cancel' : 'Subscribe to New Movie'}
        </button>
        {showSubscribe && <SubscribeToMovie memberId={member._id} />}
      </div>
      <div className="movies-watched">
        <MoviesWatched memberId={member._id} />
      </div>
    </div>
  );
};

export default MemberCard;
