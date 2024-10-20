import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMember, editMember } from '../redux/memberSlice';
import { useParams, useNavigate } from 'react-router-dom';
import './EditMember.css'; // Import CSS for styling

const EditMember = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const member = useSelector((state) => state.members.currentMember); // Updated state path
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    dispatch(fetchMember(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (member) {
      setFullName(member.userId ? member.userId.fullName : '');
      setEmail(member.email || '');
      setCity(member.city || '');
    }
  }, [member]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Construct the updatedMember object with the entire userId object
    const updatedMember = {
      userId: {
        ...member.userId,
        fullName, // Update only the fullName inside userId
      },
      email,
      city,
    };
  
    console.log('Submitting member:', updatedMember);
  
    try {
      await dispatch(editMember({ id, updatedMember }));
      navigate(`/main/members/${id}`); // Redirect to the specific member's detail page
    } catch (error) {
      console.error('Failed to update member:', error);
    }
  };
  

  const handleCancel = () => {
    navigate(`/main/members/${id}`); // Redirect to the specific member's detail page
  };

  if (!member) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="edit-member-page">
      <h1>Edit Member</h1>
      <form onSubmit={handleSubmit} className="edit-member-form">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName || ''} // Ensure the value is always a string
          onChange={(e) => setFullName(e.target.value)}
          className="input-field"
        />
        <input
          type="email"
          placeholder="Email"
          value={email || ''} // Ensure the value is always a string
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="City"
          value={city || ''} // Ensure the value is always a string
          onChange={(e) => setCity(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="submit-button">Save Changes</button>
        <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
      </form>
    </div>
  );
};

export default EditMember;
