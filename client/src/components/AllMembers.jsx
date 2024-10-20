import React from 'react';
import MemberCard from './MemberCard';

const AllMembers = ({ members }) => {
  return (
    <div>
      {members.length > 0 ? (
        members.map(member => (
          <MemberCard key={member._id} member={member} />
        ))
      ) : (
        <p>No members found.</p>
      )}
    </div>
  );
};

export default AllMembers;
