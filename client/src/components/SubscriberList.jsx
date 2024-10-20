import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SubscriberList = ({ movieId }) => {
  const [subscribers, setSubscribers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/subscriptions/movie/${movieId}`);
        const subscriptions = response.data;

        const formattedSubscribers = subscriptions.map(subscription => {
          const member = subscription.memberId;
          return {
            fullName: member.userId?.fullName || 'Unknown',
            date: new Date(subscription.date).toLocaleDateString(),
            memberId: member._id
          };
        });

        setSubscribers(formattedSubscribers);
      } catch (error) {
        setError('No subscriptions to this movie');
        console.error('Error fetching subscribers:', error);
      }
    };

    if (movieId) {
      fetchSubscribers();
    }
  }, [movieId]);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Subscribers:</h2>
      <ul>
        {subscribers.map((subscriber, index) => (
          <li key={index}>
            <Link to={`/main/members/${subscriber.memberId}`}>
              {subscriber.fullName}
            </Link>
            - Date: {subscriber.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriberList;
