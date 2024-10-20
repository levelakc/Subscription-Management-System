import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { deleteMember } from '../redux/memberSlice';
import MoviesWatched from './MoviesWatched';
import SubscribeToMovie from './SubscribeToMovie';
import './MemberCard.css'; // Reuse the existing CSS for styling

const SingleMember = () => {
  const { id } = useParams();  // Extract the member ID from the URL
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        // Fetch member details
        const memberResponse = await axios.get(`http://localhost:8000/api/members/${id.toString()}`);
        const fetchedMember = memberResponse.data;
        setMember(fetchedMember);
      } catch (error) {
        console.error('Error fetching member details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberDetails();
  }, [id]);

  const handleEdit = () => {
    navigate(`/main/members/edit/${id}`);
  };

  const handleDelete = () => {
    dispatch(deleteMember(id));
    navigate('/main/members');  // Redirect to the members list after deletion
  };

  const handleSubscribeToggle = () => {
    setShowSubscribe(!showSubscribe);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!member) {
    return <p>Member not found</p>;
  }

  return (
    <div className="single-member-page">
      <div className="member-card">
        <div className="member-details">
          <h2>{member.userId.fullName}</h2> {/* Display the full name of the user */}
          <p>Email: {member.email}</p>
          <p>City: {member.city}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete} style={{ marginLeft: '10px' }}>Delete</button>
          <button onClick={handleSubscribeToggle}>
            {showSubscribe ? 'Cancel' : 'Subscribe to New Movie'}
          </button>
          {showSubscribe && <SubscribeToMovie memberId={id} />}
        </div>
        <div className="movies-watched">
          <MoviesWatched memberId={id} />
        </div>
      </div>
    </div>
  );
};

export default SingleMember;
