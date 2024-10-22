import React, { useState, useEffect } from 'react';
import './App.css';
import TicketCard from './Components/TicketCard.js';
import BoardColumn from './Components/BoardColumn';
import { groupTickets } from './utils/groupTickets.js';
import { sortTickets } from './utils/sortTickets.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faCaretDown } from '@fortawesome/free-solid-svg-icons';

const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'priority');
  const [showDropdown, setShowDropdown] = useState(false); 

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Data:", data);
        if (data.tickets && Array.isArray(data.tickets)) {
          setTickets(data.tickets);
        } else {
          console.error("Invalid tickets data structure");
        }
        setUsers(data.users);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Save user preferences to localStorage
  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

  const handleGroupByChange = (e) => setGroupBy(e.target.value);
  const handleSortByChange = (e) => setSortBy(e.target.value);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Group and sort tickets based on user preferences
  const groupedTickets = groupTickets(tickets, groupBy, users);
  const sortedTickets = sortTickets(groupedTickets, sortBy);

  return (
    <div className="kanban-board">
      <header className="board-header">
        <div className="controls">
          <button className="dropdown-button" onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faSliders} /> Display <FontAwesomeIcon icon={faCaretDown} />
          </button>
          {showDropdown && (
            <div className="dropdown-content">
              <div className="control-group">
                <label>Grouping</label>
                <select value={groupBy} onChange={handleGroupByChange}>
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div className="control-group">
                <label>Ordering</label>
                <select value={sortBy} onChange={handleSortByChange}>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </header>
      <main className="board-columns">
        {sortedTickets.map((group, index) => (
          <BoardColumn key={index} title={group.title} tickets={group.tickets} />
        ))}
      </main>
    </div>
  );
}

export default App;
