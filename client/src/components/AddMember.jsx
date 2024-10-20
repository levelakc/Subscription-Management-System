import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMember } from '../redux/memberSlice';
import { useNavigate } from 'react-router-dom';

const AddMember = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Then, create a member
      const newMember = {
        email,
        city,
      };

      await dispatch(addMember(newMember)).unwrap();
      alert('Member added successfully!');
      navigate('/main/subscriptions'); // Ensure this route is correct
    } catch (error) {
      console.error('Failed to add member:', error);
      alert('Failed to add member. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <div className="button-group">
        <button className="styled-button" type="submit">Add Member</button>
        <button className="styled-button" type="button" onClick={() => navigate('/main/movies')}>Cancel</button>
      </div>
    </form>
  );
};

export default AddMember;
