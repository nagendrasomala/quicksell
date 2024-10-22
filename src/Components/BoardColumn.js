import React from 'react';
import TicketCard from './TicketCard';

const BoardColumn = ({ title, tickets }) => {
  // Check if the current column is grouped by user by checking the tickets array
  const isUserGroup = tickets.length > 0 && tickets[0].userId !== undefined;

  return (
    <div className="board-column">
      <h2>{title}</h2>
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} isUserGroup={isUserGroup} />
      ))}
    </div>
  );
};

export default BoardColumn;
