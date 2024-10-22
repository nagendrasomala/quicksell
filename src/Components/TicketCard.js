import React from 'react';

const TicketCard = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        <img src="https://th.bing.com/th/id/OIP.Ii15573m21uyos5SZQTdrAHaHa?w=262&h=197&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="User" className="user-avatar" />
      </div>
      <h3 className="ticket-title">{ticket.title}</h3>
      <div className="ticket-labels">
        <div className="priority-icon">
          <span role="img" aria-label="priority"> ! </span>
        </div>
        <div className="feature-request">
          <span>Feature Request</span>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
